import Table from "../../Table";
import { IconButton, Token, Truncate } from "@primer/react";
import { Column } from "@primer/react/lib-esm/DataTable";
import { formatDateToRelativeTime } from "src/common/date";
import Select, { SelectMenuItem } from "../../Common/Select";
import { TableState } from "../../Table/index.types";
import { DocumentFileEntity } from "src/domain/document/document.entity";
import { convertFileSize, getContentType } from "src/common/file";
import RowSelector from "src/components/Table/components/RowSelector";
import { useDocument } from "src/context/document/hooks/useDocument";
import { useDocumentStore } from "src/context/document/document.store";
import { useEffect } from "react";
import { useDocumentFileRoute } from "src/context/document/hooks/useDocumentRoute";
import { DocumentFolderRouteParams } from "src/context/document/document.types";
import { PiSidebarSimple } from "react-icons/pi";

function DocumentFileList({
  isLoading,
  initialSortColumn,
  initialSortDirection,
  emptyDocumentMessage,
}: {
  isLoading: boolean;
  initialSortColumn: string | undefined;
  initialSortDirection: "ASC" | "DESC" | undefined;
  emptyDocumentMessage: React.ReactNode;
}) {
  const { documentFiles, deleteDocumentFile } = useDocument();
  const { selectedDocumentFiles, setSelectedDocumentFiles, clearFileStatus } =
    useDocumentStore();
  const {
    updateDocumentFileRouteSearchParams,
    documentPreviewFileId,
    clearDocumentFileRouteSearchParams,
  } = useDocumentFileRoute();

  useEffect(() => {
    clearFileStatus();
  }, []);

  const options: SelectMenuItem[] = [
    {
      id: "preview",
      name: "Preview",
      onClick: (data: DocumentFileEntity) => {
        updateDocumentFileRouteSearchParams(
          DocumentFolderRouteParams.DOCUMENT_FILE_PREVIEW,
          data.id
        );
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
          variant: "danger",
        },
      ],
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
                setSelectedDocumentFiles([...selectedDocumentFiles, row.id]);
              } else {
                setSelectedDocumentFiles(
                  selectedDocumentFiles.filter((id) => id !== row.id)
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
      id: "preview",
      header: () => null,
      width: "64px",
      renderCell: (row) => {
        return (
          <IconButton
            variant={documentPreviewFileId === row.id ? "default" : "invisible"}
            size="medium"
            icon={() => <PiSidebarSimple size={18} />}
            disabled={false}
            aria-label="Preview"
            sx={{
              flexShrink: 0,
            }}
            onClick={() => {
              documentPreviewFileId === row.id
                ? clearDocumentFileRouteSearchParams(
                    DocumentFolderRouteParams.DOCUMENT_FILE_PREVIEW
                  )
                : updateDocumentFileRouteSearchParams(
                    DocumentFolderRouteParams.DOCUMENT_FILE_PREVIEW,
                    row.id
                  );
            }}
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
