import { BaseContentProps } from "../index.types";
import { CodeData } from "src/domain/content/content.entity";
import { UpdateContentTypeDataDto } from "src/domain/content/content.dto";
import { useContent } from "src/context/content/hooks/useContent";
import { Code } from "src/components/Code";

function CodeContent({ contentTypeData }: BaseContentProps) {
  const { updateContentTypeData } = useContent();
  const code = contentTypeData.data?.content as CodeData;

  function updateCode(value: CodeData) {
    const dto: UpdateContentTypeDataDto = {
      ...contentTypeData.data!!,
      content: {
        ...contentTypeData.data?.content,
        ...value,
      },
    };
    updateContentTypeData.mutate(dto);
  }

  function refetchCode() {
    contentTypeData.refetch();
  }

  return (
    <Code
      key={contentTypeData.data?.id}
      code={code}
      updateCode={updateCode}
      refetchCode={refetchCode}
      updated={contentTypeData.data?.parent_content.updated!!}
      showHeader
    />
  );
}

export default CodeContent;
