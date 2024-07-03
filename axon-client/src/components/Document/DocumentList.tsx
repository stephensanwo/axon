import Table from "../Table";
import {
  DocumentEntity,
  DocumentTypes,
} from "src/domain/document/document.entity";
import { IconButton, Label, Text, Truncate, useTheme } from "@primer/react";
import { Column } from "@primer/react/lib-esm/DataTable";
import { formatDateToRelativeTime } from "src/common/date";
import documentService from "src/domain/document/document.service";
import React from "react";
import { PiFile } from "react-icons/pi";
import Select, { SelectMenuItem } from "../Common/Select";
import { useDocumentContext } from "src/hooks/document/useDocumentContext";
import { DocumentIcon } from "./Components/DocumentIcon";

function DocumentList({ documents }: { documents: DocumentEntity[] }) {
  const { documentStateDispatch } = useDocumentContext();
  const { theme } = useTheme();
  const options: SelectMenuItem[] = [
    {
      id: "preview",
      name: "Preview",
      onClick: (itemId: string) => {
        documentStateDispatch({
          type: "SELECT_DOCUMENT",
          payload: itemId,
        });
        documentStateDispatch({
          type: "OPEN_DOCUMENT_PAGE_PANEL",
          payload: "right",
        });
      },
    },
    {
      id: "open",
      name: "Open",
      onClick: (itemId: string) => {},
    },
    {
      id: "download",
      name: "Download",
      onClick: (itemId: string) => {},
    },
    {
      id: "delete",
      name: "Delete",
      onClick: (itemId: string) => {
        console.log("Delete", itemId);
      },
    },
  ];

  const columns: Column<DocumentEntity>[] = [
    {
      id: "icons",
      header: () => null,
      width: "64px",
      renderCell: (row) => {
        return (
          <>
            <IconButton
              aria-label={`Icon ${row.name}`}
              title={`Icon ${row.name}`}
              icon={() =>
                DocumentIcon({
                  content_type: row.content_type,
                  color: theme?.colors.text.white,
                })
              }
              variant="invisible"
              onClick={() => {}}
            />
          </>
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
      header: "File Type",
      field: "content_type",
      sortBy: "alphanumeric",
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
          <Select
            title={`Actions ${row.name}`}
            menuItems={options}
            itemId={row.id}
            anchor="icon"
            width={"auto"}
          />
        );
      },
    },
  ];

  return (
    <Table
      id="documents"
      data={documents}
      columns={columns}
      emptyStateMessage={"No documents available"}
      initialSortColumn="updated"
      initialSortDirection={"DESC"}
    />
  );
}

export default DocumentList;
