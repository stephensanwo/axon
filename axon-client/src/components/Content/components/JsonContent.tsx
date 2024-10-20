import { BaseContentProps } from "../index.types";
import { JsonData } from "src/domain/content/content.entity";
import { UpdateContentTypeDataDto } from "src/domain/content/content.dto";
import { useContent } from "src/context/content/hooks/useContent";
import { Json } from "src/components/Json";
import ContentSkeleton from "../ContentSkeleton";

function JsonContent({ contentTypeData }: BaseContentProps) {
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
      loadingComponent={<ContentSkeleton />}
    />
  );
}

export default JsonContent;
