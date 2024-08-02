import Table from "../../Table";
import { DocumentFolderEntity } from "src/domain/document/document.entity";
import { Column } from "@primer/react/lib-esm/DataTable";
import { formatDateToRelativeTime } from "src/common/date";
import Select, { SelectMenuItem } from "../../Common/Select";
import { TableState } from "../../Table/index.types";
import RowSelector from "src/components/Table/components/RowSelector";
import Link from "src/components/Common/Link";
import { useNavigate } from "react-router-dom";
import { BaseDocumentProps } from "../index.types";

function DocumentFolderList({
  documentState,
  documentStateDispatch,
  isLoading,
  initialSortColumn,
  initialSortDirection,
  emptyDocumentMessage,
}: {
  isLoading: boolean | undefined;
  initialSortColumn: string | undefined;
  initialSortDirection: "ASC" | "DESC" | undefined;
  emptyDocumentMessage: React.ReactNode;
} & BaseDocumentProps) {
  const navigate = useNavigate();
  const options: SelectMenuItem[] = [
    {
      id: "open",
      name: "Open",
      onClick: (data: DocumentFolderEntity) => {
        navigate(`${data.name}`);
      },
    },
  ];

  const columns: Column<DocumentFolderEntity>[] = [
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
                  type: "SELECT_DOCUMENT_FOLDER",
                  payload: row,
                });
              } else {
                documentStateDispatch({
                  type: "REMOVE_SELECTED_DOCUMENT_FOLDER",
                  payload: row.id,
                });
              }
            }}
          />
        );
      },
    },
    {
      header: "Folder Name",
      field: "name",
      rowHeader: true,
      width: "grow",
      maxWidth: "400px",
      id: "name",
      sortBy: "alphanumeric",
      renderCell: (row) => {
        return (
          <Link
            to={`/documents/${row.name}/`}
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
          <Select<DocumentFolderEntity>
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
    !isLoading && documentState.documentFolders.data.length === 0
      ? "empty"
      : !isLoading && documentState.documentFolders.data.length > 0
        ? "data"
        : "loading";

  return (
    <Table
      id="documents"
      state={tableState}
      data={documentState.documentFolders.data}
      columns={columns}
      emptyStateMessage={emptyDocumentMessage}
      initialSortColumn={initialSortColumn}
      initialSortDirection={initialSortDirection}
      cellPadding={"spacious"}
    />
  );
}

export default DocumentFolderList;
