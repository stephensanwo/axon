import { BaseContentProps } from "../index.types";
import { CodeData } from "src/domain/content/content.entity";
import { UpdateContentDto } from "src/domain/content/content.dto";
import { useContent } from "src/context/content/hooks/useContent";
import { Code } from "src/components/Code";

function CodeContent({ contentState, contentStateDispatch }: BaseContentProps) {
  const { updateContent } = useContent();
  const code =
    contentState.content.data?.content.content_type === "code"
      ? contentState.content.data?.content
      : ({} as CodeData);

  function updateCode(value: CodeData) {
    const dto: UpdateContentDto = {
      ...contentState.content.data!!,
      content: {
        ...contentState.content.data?.content,
        ...value,
      },
    };
    updateContent.mutate(dto);
  }

  function refetchCode() {
    contentState.content.contentQuery.refetch();
  }

  return (
    <Code
      code={code}
      updateCode={updateCode}
      refetchCode={refetchCode}
      updated={contentState.content.data?.updated!!}
      showHeader
    />
  );
}

export default CodeContent;
