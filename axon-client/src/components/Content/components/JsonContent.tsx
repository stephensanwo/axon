import { BaseContentProps } from "../index.types";
import { JsonData } from "src/domain/content/content.entity";
import { UpdateContentDto } from "src/domain/content/content.dto";
import { useContent } from "src/context/content/hooks/useContent";
import { Code } from "src/components/Code";
import { Json } from "src/components/Json";

function JsonContent({ contentState, contentStateDispatch }: BaseContentProps) {
  const { updateContent } = useContent();
  const json =
    contentState.content.data?.content.content_type === "json"
      ? contentState.content.data?.content
      : ({} as JsonData);

  function updateJson(value: JsonData) {
    const dto: UpdateContentDto = {
      ...contentState.content.data!!,
      content: {
        ...contentState.content.data?.content,
        ...value,
      },
    };
    updateContent.mutate(dto);
  }

  function refetchJson() {
    contentState.content.contentQuery.refetch();
  }

  return (
    <Json
      json={json}
      updateJson={updateJson}
      refetchJson={refetchJson}
      updated={contentState.content.data?.updated!!}
      showHeader
    />
  );
}

export default JsonContent;
