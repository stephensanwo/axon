import Table from "../../Table";
import { Column } from "@primer/react/lib-esm/DataTable";
import { formatDateToRelativeTime } from "src/common/date";
import Select, { SelectMenuItem } from "../../Common/Select";
import { TableState } from "../../Table/index.types";
import RowSelector from "src/components/Table/components/RowSelector";
import Link from "src/components/Common/Link";
import { useNavigate } from "react-router-dom";
import { BaseContentProps } from "../index.types";
import { useContent } from "src/context/content/hooks/useContent";
import { ContentEntity } from "src/domain/content/content.entity";
import startCase from "lodash/startCase";
import { Token } from "@primer/react";
import { UpdateContentDto } from "src/domain/content/content.dto";
import ContentRecents from "../ContentRecents";
import { PagePanelDirections } from "src/components/Page/index.types";
import { CheckCircleIcon, TrashIcon } from "@primer/octicons-react";
import ContentPreviewButton from "../Preview/ContentPreviewButton";

function ContentList({
  contentState,
  contentStateDispatch,
  isLoading,
  initialSortColumn,
  initialSortDirection,
  emptyDocumentMessage,
  togglePanel,
}: {
  isLoading: boolean | undefined;
  initialSortColumn: string | undefined;
  initialSortDirection: "ASC" | "DESC" | undefined;
  emptyDocumentMessage: React.ReactNode;
  togglePanel: (direction: PagePanelDirections) => void;
} & BaseContentProps) {
  const { updateContent, deleteContent } = useContent();
  const navigate = useNavigate();

  const options: SelectMenuItem[] = [
    {
      id: "preview",
      name: "Preview",
      onClick: (data: ContentEntity) => {
        togglePanel("right");
      },
    },
    {
      id: "open",
      name: "Open",
      onClick: (data: ContentEntity) => {
        navigate(`/content/${data.id}`);
      },
    },
    {
      id: "pin",
      name: "Pin Content",
      onClick: (data: ContentEntity) => {
        const dto: UpdateContentDto = {
          ...data,
          pinned: true,
        };
        updateContent.mutate(dto);
      },
    },
    {
      id: "delete",
      name: "Delete Content",
      onClick: () => {},
      variant: "danger",
      subSelectMenu: [
        {
          id: "confirm-delete",
          name: "Confirm Delete",
          onClick: (data: ContentEntity) => {
            deleteContent.mutate([data.id]);
          },
          trailingVisual: <CheckCircleIcon />,
          variant: "danger",
        },
      ],
      leadingVisual: <TrashIcon />,
    },
  ];

  const columns: Column<ContentEntity>[] = [
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
                contentStateDispatch({
                  type: "SELECT_CONTENT",
                  payload: row,
                });
              } else {
                contentStateDispatch({
                  type: "REMOVE_SELECTED_CONTENT",
                  payload: row.id,
                });
              }
            }}
          />
        );
      },
    },
    {
      header: "Content",
      field: "name",
      rowHeader: true,
      width: "grow",
      maxWidth: "600px",
      id: "name",
      sortBy: "alphanumeric",
      renderCell: (row) => {
        return (
          <Link
            to={`/content/${row.name}`}
            text={row.name}
            truncateText={800}
          />
        );
      },
    },
    {
      header: "Type",
      maxWidth: "200px",
      field: "content_type",
      sortBy: "alphanumeric",
      renderCell: (row) => {
        return <Token text={startCase(row.content_type)} />;
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
      id: "preview",
      header: () => null,
      width: "64px",
      renderCell: (row) => {
        return (
          <ContentPreviewButton
            type="icon"
            togglePanel={togglePanel}
            disableTooltip
            onClick={() =>
              contentStateDispatch({
                type: "PREVIEW_CONTENT",
                payload: row,
              })
            }
          />
        );
      },
    },
    {
      id: "actions",
      header: () => null,
      width: "64px",
      renderCell: (row) => {
        return (
          <Select<ContentEntity>
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
    !isLoading && contentState.contentList.data!!.length === 0
      ? "empty"
      : !isLoading && contentState.contentList.data!!.length > 0
        ? "data"
        : "loading";

  return (
    <>
      <ContentRecents
        contentState={contentState}
        contentStateDispatch={contentStateDispatch}
      />
      <Table
        id="content"
        state={tableState}
        data={contentState.contentList.data!!}
        columns={columns}
        emptyStateMessage={emptyDocumentMessage}
        initialSortColumn={initialSortColumn}
        initialSortDirection={initialSortDirection}
        cellPadding={"normal"}
      />
    </>
  );
}

export default ContentList;
