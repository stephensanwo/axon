import Table from "../../Table";
import { Column } from "@primer/react/lib-esm/DataTable";
import { formatDateToRelativeTime } from "src/common/date";
import Select, { SelectMenuItem } from "../../Common/Select";
import { TableState } from "../../Table/index.types";
import RowSelector from "src/components/Table/components/RowSelector";
import Link from "src/components/Common/Link";
import { useNavigate } from "react-router-dom";
import { BaseProjectProps } from "src/components/Project/index.types";
import { BoardEntity } from "src/domain/board/board.entity";
import { useBoard } from "src/context/board/hooks/useBoard";
import { UpdateBoardDto } from "src/domain/board/board.dto";
import BoardRecents from "../BoardRecents";
import { useMemo } from "react";
import { useBoardStore } from "src/context/board/board.store";

function BoardList({
  projectFiles,
  initialSortColumn,
  initialSortDirection,
  emptyDocumentMessage,
}: {
  initialSortColumn: string | undefined;
  initialSortDirection: "ASC" | "DESC" | undefined;
  emptyDocumentMessage: React.ReactNode;
} & BaseProjectProps) {
  const navigate = useNavigate();
  const { updateBoard } = useBoard();
  const { selectedBoards, setSelectedBoards } = useBoardStore();
  const options: SelectMenuItem[] = [
    {
      id: "open",
      name: "Open",
      onClick: (data: BoardEntity) => {
        navigate(`${data.name}`);
      },
    },
    {
      id: "pin",
      name: "Pin Board",
      onClick: (data: BoardEntity) => {
        const boardUpdateDto: UpdateBoardDto = {
          ...data,
          pinned: true,
        };
        updateBoard.mutate(boardUpdateDto);
      },
    },
  ];

  const columns: Column<BoardEntity>[] = [
    {
      id: "row-selector",
      header: () => null,
      width: "52px",
      renderCell: (row) => {
        return (
          <RowSelector
            rowId={row.id}
            onChangeCallback={(selected: boolean) => {
              if (selected) {
                setSelectedBoards([...selectedBoards, row]);
              } else {
                setSelectedBoards(
                  selectedBoards.filter((b) => b.id !== row.id)
                );
              }
            }}
          />
        );
      },
    },
    {
      header: "Project",
      field: "name",
      rowHeader: true,
      width: "grow",
      maxWidth: "400px",
      id: "name",
      sortBy: "alphanumeric",
      renderCell: (row) => {
        return (
          <Link
            to={`/projects/${projectFiles.data?.project?.name}/${row.name}/`}
            text={row.name}
            truncateText={800}
          />
        );
      },
    },
    {
      header: "Created",
      field: "created",
      sortBy: "datetime",
      renderCell: (row) => {
        return <>{formatDateToRelativeTime(row.created)}</>;
      },
    },
    {
      header: "Updated",
      field: "updated",
      sortBy: "datetime",
      renderCell: (row) => {
        return <>{formatDateToRelativeTime(row.updated)}</>;
      },
    },
    {
      id: "actions",
      header: () => null,
      width: "64px",
      renderCell: (row) => {
        return (
          <Select<BoardEntity>
            title={`Actions ${row.name}`}
            menuItems={options}
            data={row}
            anchor="icon"
            width={"auto"}
          />
        );
      },
    },
  ];

  const tableState: TableState =
    !projectFiles.isLoading && projectFiles.data?.boards!!.length === 0
      ? "empty"
      : !projectFiles.isLoading && projectFiles.data?.boards?.length!! > 0
        ? "data"
        : "loading";

  const boardRecents = useMemo(() => {
    return projectFiles.data?.boards?.filter((board) => board.pinned) ?? [];
  }, [projectFiles.data?.boards]);

  return (
    <>
      {boardRecents.length > 0 && <BoardRecents boardRecents={boardRecents} />}
      <Table
        id="project-files"
        state={tableState}
        data={projectFiles.data?.boards!!}
        columns={columns}
        emptyStateMessage={emptyDocumentMessage}
        initialSortColumn={initialSortColumn}
        initialSortDirection={initialSortDirection}
        cellPadding={"spacious"}
      />
    </>
  );
}

export default BoardList;