import Table from "../../Table";
import { Token, Truncate } from "@primer/react";
import { Column } from "@primer/react/lib-esm/DataTable";
import { formatDateToRelativeTime } from "src/common/date";
import Select, { SelectMenuItem } from "../../Common/Select";
import { TableState } from "../../Table/index.types";
import { DocumentFileEntity } from "src/domain/document/document.entity";
import { convertFileSize, getContentType } from "src/common/file";
import RowSelector from "src/components/Table/components/RowSelector";
import {
  PagePanelActions,
  PagePanelDirections,
} from "src/components/Page/index.types";
import { useDocument } from "src/context/document/hooks/useDocument";
import { CheckCircleIcon, TrashIcon } from "@primer/octicons-react";
import { useDocumentStore } from "src/context/document/document.store";

function DocumentFileList({
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
}) {
  const { documentFiles, deleteDocumentFile } = useDocument();
  const {
    setSelectedDocumentFilePreview,
    selectedDocumentFiles,
    setSelectedDocumentFiles,
  } = useDocumentStore();
  const options: SelectMenuItem[] = [
    {
      id: "preview",
      name: "Preview",
      onClick: (data: DocumentFileEntity) => {
        setSelectedDocumentFilePreview(data);
        togglePanel("right");
      },
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
                setSelectedDocumentFiles([...selectedDocumentFiles, row]);
              } else {
                setSelectedDocumentFiles(
                  selectedDocumentFiles.filter((file) => file.id !== row.id)
                );
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
        return <>{<Token text={getContentType(row.content_type)} />}</>;
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
    !isLoading && documentFiles.data?.files.length!! === 0
      ? "empty"
      : !isLoading && documentFiles.data?.files.length!! > 0
        ? "data"
        : "loading";

  return (
    <Table
      id="documents"
      state={tableState}
      data={documentFiles.data?.files!!}
      columns={columns}
      emptyStateMessage={emptyDocumentMessage}
      initialSortColumn={initialSortColumn}
      initialSortDirection={initialSortDirection}
      cellPadding={"normal"}
    />
  );
}

export default DocumentFileList;
