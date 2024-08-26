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
import BoardRecents from "../components/BoardRecents";

function BoardList({
  projectState,
  projectStateDispatch,
  isLoading,
  initialSortColumn,
  initialSortDirection,
  emptyDocumentMessage,
}: {
  isLoading: boolean | undefined;
  initialSortColumn: string | undefined;
  initialSortDirection: "ASC" | "DESC" | undefined;
  emptyDocumentMessage: React.ReactNode;
} & BaseProjectProps) {
  const navigate = useNavigate();
  const { updateBoard } = useBoard();
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
                projectStateDispatch({
                  type: "SELECT_BOARD",
                  payload: row,
                });
              } else {
                projectStateDispatch({
                  type: "REMOVE_SELECTED_BOARD",
                  payload: row.id,
                });
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
            to={`/projects/${projectState.projectFiles.project?.name}/${row.name}/`}
            text={row.name}
            truncateText={800}
          />
        );
      },
    },
    {
      header: "Description",
      maxWidth: "600px",
      field: "description",
      sortBy: "alphanumeric",
      renderCell: (row) => {
        return <>{row.description}</>;
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
    !isLoading && projectState.projectFiles.boards!!.length === 0
      ? "empty"
      : !isLoading && projectState.projectFiles.boards!!.length > 0
        ? "data"
        : "loading";

  return (
    <>
      {projectState.projectFiles.pinnedBoards?.length > 0 && (
        <BoardRecents
          projectState={projectState}
          projectStateDispatch={projectStateDispatch}
        />
      )}
      <Table
        id="documents"
        state={tableState}
        data={projectState.projectFiles.boards!!}
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

// import React from "react";
// import Card from "src/components/Common/Card";
// import { PiFile } from "react-icons/pi";
// import { Box, useTheme } from "@primer/react";

// function BoardList() {
//   const { theme } = useTheme();
//   return (
//     <Box
//       sx={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
//         height: "100%",
//         // alignItems: "center",
//         gap: 4,
//         overflowY: "scroll",
//         scrollbarWidth: "none",
//       }}
//     >
//       {/* {Array.from({ length: 100 }).map((flow, index) => (
//         <Card.Button
//           key={index}
//           icon={<PiFile size={64} color={theme?.colors.primary.default} />}
//           title={"Project A"}
//           subtitle={"Last updated 2 days ago"}
//           border
//           onClick={() => console.log("click")}
//         ></Card.Button>
//       ))} */}
//     </Box>
//   );
// }

// export default BoardList;
