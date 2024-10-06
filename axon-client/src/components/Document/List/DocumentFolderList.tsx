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
import { useDocument } from "src/context/document/hooks/useDocument";
import { CheckCircleIcon } from "@primer/octicons-react";
import { useDocumentStore } from "src/context/document/document.store";

function DocumentFolderList({
  initialSortColumn,
  initialSortDirection,
  emptyDocumentMessage,
}: {
  initialSortColumn: string | undefined;
  initialSortDirection: "ASC" | "DESC" | undefined;
  emptyDocumentMessage: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { documentFolders, deleteDocumentFolder } = useDocument();
  const { selectedDocumentFolders, setSelectedDocumentFolders } =
    useDocumentStore();
  const options: SelectMenuItem[] = [
    {
      id: "open",
      name: "Open Folder",
      onClick: (data: DocumentFolderEntity) => {
        navigate(`${data.name}`);
      },
    },
    {
      id: "delete",
      name: "Delete Folder",
      onClick: () => {},
      variant: "danger",
      subSelectMenu: [
        {
          id: "confirm-delete",
          name: "Confirm Delete",
          onClick: (data: DocumentFolderEntity) => {
            deleteDocumentFolder.mutate([data.id]);
          },
          trailingVisual: <CheckCircleIcon />,
          variant: "danger",
        },
      ],
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
              if (selected) {
                setSelectedDocumentFolders([...selectedDocumentFolders, row]);
              } else {
                setSelectedDocumentFolders(
                  selectedDocumentFolders.filter(
                    (folder) => folder.id !== row.id
                  )
                );
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
      maxWidth: "800px",
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
    !documentFolders.isLoading && documentFolders.data?.folders.length === 0
      ? "empty"
      : !documentFolders.isLoading && documentFolders.data?.folders.length!! > 0
        ? "data"
        : "loading";

  return (
    <Table
      id="documents"
      state={tableState}
      data={documentFolders.data?.folders!!}
      columns={columns}
      emptyStateMessage={emptyDocumentMessage}
      initialSortColumn={initialSortColumn}
      initialSortDirection={initialSortDirection}
      cellPadding={"normal"}
    />
  );
}

export default DocumentFolderList;
