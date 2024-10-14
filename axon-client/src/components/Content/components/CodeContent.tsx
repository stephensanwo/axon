import { BaseContentProps } from "../index.types";
import { CodeData } from "src/domain/content/content.entity";
import { UpdateContentDto } from "src/domain/content/content.dto";
import { useContent } from "src/context/content/hooks/useContent";
import { Code } from "src/components/Code";

function CodeContent({ content }: BaseContentProps) {
  const { updateContent } = useContent();
  const code = content.data?.content as CodeData;

  function updateCode(value: CodeData) {
    const dto: UpdateContentDto = {
      ...content.data!!,
      content: {
        ...content.data?.content,
        ...value,
      },
    };
    updateContent.mutate(dto);
  }

  function refetchCode() {
    content.refetch();
  }

  return (
    <Code
      code={code}
      updateCode={updateCode}
      refetchCode={refetchCode}
      updated={content.data?.updated!!}
      showHeader
    />
  );
}

export default CodeContent;
