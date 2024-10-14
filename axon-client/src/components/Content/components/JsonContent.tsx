import { BaseContentProps } from "../index.types";
import { JsonData } from "src/domain/content/content.entity";
import { UpdateContentDto } from "src/domain/content/content.dto";
import { useContent } from "src/context/content/hooks/useContent";
import { Code } from "src/components/Code";
import { Json } from "src/components/Json";

function JsonContent({ content }: BaseContentProps) {
  const { updateContent } = useContent();
  const json = content.data?.content as JsonData;

  function updateJson(value: JsonData) {
    const dto: UpdateContentDto = {
      ...content.data!!,
      content: {
        ...content.data?.content,
        ...value,
      },
    };
    updateContent.mutate(dto);
  }

  function refetchJson() {
    content.refetch();
  }

  return (
    <Json
      json={json}
      updateJson={updateJson}
      refetchJson={refetchJson}
      updated={content.data?.updated!!}
      showHeader
    />
  );
}

export default JsonContent;
