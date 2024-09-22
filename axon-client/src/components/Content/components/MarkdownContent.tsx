import { BaseContentProps } from "../index.types";
import { MarkdownData } from "src/domain/content/content.entity";
import { UpdateContentDto } from "src/domain/content/content.dto";
import { Markdown } from "src/components/Markdown";
import { useContent } from "src/context/content/hooks/useContent";

function MarkdownContent({ contentState }: BaseContentProps) {
  const { updateContent } = useContent();
  const markdown =
    contentState.content.data?.content.content_type === "markdown"
      ? contentState.content.data?.content
      : ({} as MarkdownData);

  function updateMarkdown(value: MarkdownData) {
    const dto: UpdateContentDto = {
      ...contentState.content.data!!,
      content: {
        ...contentState.content.data?.content,
        ...value,
      },
    };
    updateContent.mutate(dto);
  }

  function refetchMarkdown() {
    contentState.content.contentQuery.refetch();
  }

  return (
    <Markdown
      markdown={markdown}
      updateMarkdown={updateMarkdown}
      title={contentState.content.data?.name!!}
      updated={contentState.content.data?.updated!!}
      refetchMarkdown={refetchMarkdown}
      showHeader
    />
  );
}

export default MarkdownContent;
