import {
  TableCellData,
  TableData,
  TableHeadData,
} from "src/domain/content/content.entity";
import { useContent } from "../../../context/content/hooks/useContent";
import { BaseContentProps } from "../index.types";
import { UpdateContentDto } from "src/domain/content/content.dto";
import DataTable from "src/components/DataTable";
import DataSheet, { TableCellTypes } from "src/components/DataSheet";
import { ColumnDef } from "@tanstack/react-table";

function TableContent({ contentState }: BaseContentProps) {
  const { updateContent } = useContent();
  const table =
    contentState.content.data?.content.content_type === "table"
      ? contentState.content.data?.content
      : ({} as TableData);

  console.log("table===>", table);
  function updateTable(value: TableData) {
    const dto: UpdateContentDto = {
      ...contentState.content.data!!,
      content: {
        ...contentState.content.data?.content,
        ...value,
      },
    };
    updateContent.mutate(dto);
  }

  function updateTableCallback(header: TableHeadData[], body: TableCellData[]) {
    // const dto: UpdateContentDto = {
    //   ...contentState.content.data!!,
    //   content: {
    //     ...table,
    //     data: {
    //       ...table.data,
    //       header,
    //       body,
    //     },
    //   },
    // };
    // console.log("dto", dto);
    // updateContent.mutate(dto);
  }

  function refetchTable() {
    contentState.content.contentQuery.refetch();
  }

  const columns: ColumnDef<any>[] = Object.values(table.data.header).map(
    (header) => ({
      accessorKey: header.key,
      header: header.value,
      cell: TableCellTypes[header.type],
      minSize: 250,
    })
  );

  return (
    // <DataTable
    //   data={table}
    //   updateTable={updateTable}
    //   refetchTable={refetchTable}
    //   title={contentState.content.data?.name!!}
    //   updated={contentState.content.data?.updated!!}
    //   showHeader
    // />
    <DataSheet
      view={"edit"}
      title={contentState.content.data?.name!!}
      updated={contentState.content.data?.updated!!}
      updateTableCallback={updateTableCallback}
      table={table}
      columns={columns}
      data={table.data.body}
      refetchTable={refetchTable}
      showHeader
    />
  );
}

export default TableContent;
