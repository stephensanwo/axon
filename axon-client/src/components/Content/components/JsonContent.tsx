import { JsonData } from "src/domain/content/content.entity";
import { UpdateContentTypeDataDto } from "src/domain/content/content.dto";
import { useContent } from "src/context/content/hooks/useContent";
import { Json } from "src/components/Json";
import { ContentTypeDataQuery } from "src/context/content/index.types";
import ComponentSkeleton from "./ComponentSkeleton";

function JsonContent({
  contentTypeData,
}: {
  contentTypeData: ContentTypeDataQuery;
}) {
  const { updateContentTypeData } = useContent();
  const json = contentTypeData.data?.content as JsonData;

  function updateJson(value: JsonData) {
    const dto: UpdateContentTypeDataDto = {
      ...contentTypeData.data!!,
      content: {
        ...contentTypeData.data?.content,
        ...value,
      },
    };
    updateContentTypeData.mutate(dto);
  }

  function refetchJson() {
    contentTypeData.refetch();
  }

  return (
    <Json
      key={contentTypeData.data?.id}
      json={json}
      updateJson={updateJson}
      refetchJson={refetchJson}
      updated={contentTypeData.data?.parent_content.updated!!}
      showHeader
      loadingComponent={<ComponentSkeleton />}
    />
  );
}

export default JsonContent;
