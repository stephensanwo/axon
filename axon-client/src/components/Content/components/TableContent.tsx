import { TableData } from "src/domain/content/content.entity";
import { useContent } from "../../../context/content/hooks/useContent";
import { BaseContentProps } from "../index.types";
import { UpdateContentDto } from "src/domain/content/content.dto";
import DataSheet from "src/components/DataSheet";
import { ColumnDef } from "@tanstack/react-table";
import { TableCellTypes } from "src/components/DataSheet/index.types";

function TableContent({ contentState }: BaseContentProps) {
  const { updateContent } = useContent();
  const table =
    contentState.content.data?.content.content_type === "table"
      ? contentState.content.data?.content
      : ({} as TableData);

  // function updateTable(value: TableData) {
  //   const dto: UpdateContentDto = {
  //     ...contentState.content.data!!,
  //     content: {
  //       ...contentState.content.data?.content,
  //       ...value,
  //     },
  //   };
  //   updateContent.mutate(dto);
  // }

  function updateTableCallback(
    header: Record<
      string,
      {
        key: string;
        value: string;
        type: keyof typeof TableCellTypes;
      }
    >,
    data: Record<string, string>[],
    columnOrder: string[]
  ) {
    const dto: UpdateContentDto = {
      ...contentState.content.data!!,
      content: {
        ...table,
        data: {
          ...table.data,
          header,
          data,
          columnOrder,
        },
      },
    };
    console.log("dto", dto);
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
      refetchTable={refetchTable}
      showHeader
      editableHeaders={true}
    />
  );
}

export default TableContent;
