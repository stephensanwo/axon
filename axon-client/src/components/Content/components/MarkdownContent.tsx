import { BaseContentProps, ContentRouterProps } from "../index.types";
import { MarkdownData } from "src/domain/content/content.entity";
import { UpdateContentDto } from "src/domain/content/content.dto";
import { Markdown } from "src/components/Markdown";
import { useContent } from "src/context/content/hooks/useContent";

function MarkdownContent({
  contentState,
  previewContent,
}: BaseContentProps & ContentRouterProps) {
  const { updateContent } = useContent();
  const markdown =
    previewContent.content.content_type === "markdown"
      ? previewContent.content
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
      title={previewContent.name!!}
      updated={previewContent.updated!!}
      refetchMarkdown={refetchMarkdown}
      showHeader
    />
  );
}

export default MarkdownContent;
