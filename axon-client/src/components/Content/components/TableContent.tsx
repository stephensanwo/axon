import { TableData } from "src/domain/content/content.entity";
import { useContent } from "../../../context/content/hooks/useContent";
import { BaseContentProps } from "../index.types";
import { UpdateContentTypeDataDto } from "src/domain/content/content.dto";
import DataSheet from "src/components/DataSheet";
import { TableCellTypes } from "src/components/DataSheet/index.types";

function TableContent({ contentTypeData }: BaseContentProps) {
  const { updateContentTypeData } = useContent();
  const table = contentTypeData.data?.content as TableData;
  console.log("table", table);

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
    const newTableData: TableData = {
      ...table,
      data: {
        ...table.data,
        data,
        columnOrder,
        header,
      },
    };

    const dto: UpdateContentTypeDataDto = {
      ...contentTypeData.data!!,
      content: {
        ...contentTypeData.data?.content,
        ...newTableData,
      },
    };
    console.log("dto", dto);
    updateContentTypeData.mutate(dto);
  }

  function refetchTable() {
    contentTypeData.refetch();
  }

  return (
    <DataSheet
      view={"edit"}
      title={contentTypeData.data?.parent_content.name!!}
      updated={contentTypeData.data?.parent_content.updated!!}
      updateTableCallback={updateTableCallback}
      table={table}
      refetchTable={refetchTable}
      showHeader
      editableHeaders={true}
    />
  );
}

export default TableContent;
