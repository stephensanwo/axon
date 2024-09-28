import Table from "../../Table";
import { Truncate } from "@primer/react";
import { Column } from "@primer/react/lib-esm/DataTable";
import { formatDateToRelativeTime } from "src/common/date";
import Select, { SelectMenuItem } from "../../Common/Select";
import { TableState } from "../../Table/index.types";
import { DocumentFileEntity } from "src/domain/document/document.entity";
import { convertFileSize, getContentType } from "src/common/file";
import RowSelector from "src/components/Table/components/RowSelector";
import { BaseDocumentProps } from "../index.types";
import {
  PagePanelActions,
  PagePanelDirections,
} from "src/components/Page/index.types";
import { useDocument } from "src/context/document/hooks/useDocument";
import { CheckCircleIcon, TrashIcon } from "@primer/octicons-react";

function DocumentFileList({
  documentState,
  documentStateDispatch,
  isLoading,
  initialSortColumn,
  initialSortDirection,
  emptyDocumentMessage,
  togglePanel,
}: {
  isLoading: boolean;
  initialSortColumn: string | undefined;
  initialSortDirection: "ASC" | "DESC" | undefined;
  emptyDocumentMessage: React.ReactNode;
  togglePanel: (
    direction: PagePanelDirections,
    action?: PagePanelActions
  ) => void;
} & BaseDocumentProps) {
  const { deleteDocumentFile } = useDocument();
  const options: SelectMenuItem[] = [
    {
      id: "preview",
      name: "Preview",
      onClick: (data: DocumentFileEntity) => {
        documentStateDispatch({
          type: "SET_SELECTED_DOCUMENT_FILE_PREVIEW",
          payload: data,
        });
        togglePanel("right");
      },
    },
    {
      id: "open",
      name: "Open",
      onClick: (itemId: string) => {},
    },
    {
      id: "delete",
      name: "Delete File",
      onClick: () => {},
      variant: "danger",
      subSelectMenu: [
        {
          id: "confirm-delete",
          name: "Confirm Delete",
          onClick: (data: DocumentFileEntity) => {
            deleteDocumentFile.mutate([data.id]);
          },
          trailingVisual: <CheckCircleIcon />,
          variant: "danger",
        },
      ],
      leadingVisual: <TrashIcon />,
    },
  ];

  const columns: Column<DocumentFileEntity>[] = [
    {
      id: "row-selector",
      header: () => null,
      width: "52px",
      renderCell: (row) => {
        return (
          <RowSelector
            rowId={row.id}
            onChangeCallback={(selected: boolean) => {
              console.log("selected", selected);
              if (selected) {
                documentStateDispatch({
                  type: "SELECT_DOCUMENT_FILE",
                  payload: row,
                });
              } else {
                documentStateDispatch({
                  type: "REMOVE_SELECTED_DOCUMENT_FILE",
                  payload: row.id,
                });
              }
            }}
          />
        );
      },
    },
    {
      header: "File Name",
      field: "name",
      rowHeader: true,
      width: "grow",
      maxWidth: "800px",
      sortBy: "alphanumeric",
      renderCell: (row) => {
        return (
          <Truncate title={row.name} maxWidth={800}>
            {row.name}
          </Truncate>
        );
      },
    },
    {
      header: "Extension",
      field: "content_type",
      sortBy: "alphanumeric",
      renderCell: (row) => {
        return <>{getContentType(row.content_type)}</>;
      },
    },
    {
      header: "Size",
      field: "file_size",
      sortBy: "alphanumeric",
      renderCell: (row) => {
        return (
          <>
            {convertFileSize({
              size: row.file_size,
            })}
          </>
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
      id: "actions",
      header: () => null,
      width: "64px",
      renderCell: (row) => {
        return (
          <Select<DocumentFileEntity>
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
    !isLoading && documentState.documentFolderFiles.files!!.length === 0
      ? "empty"
      : !isLoading && documentState.documentFolderFiles.files!!.length > 0
        ? "data"
        : "loading";

  return (
    <Table
      id="documents"
      state={tableState}
      data={documentState.documentFolderFiles.files!!}
      columns={columns}
      emptyStateMessage={emptyDocumentMessage}
      initialSortColumn={initialSortColumn}
      initialSortDirection={initialSortDirection}
      cellPadding={"normal"}
    />
  );
}

export default DocumentFileList;
