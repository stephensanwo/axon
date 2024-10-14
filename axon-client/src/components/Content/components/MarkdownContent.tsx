import { BaseContentProps } from "../index.types";
import { MarkdownData } from "src/domain/content/content.entity";
import { UpdateContentDto } from "src/domain/content/content.dto";
import { Markdown } from "src/components/Markdown";
import { useContent } from "src/context/content/hooks/useContent";

function MarkdownContent({ content }: BaseContentProps) {
  const { updateContent } = useContent();
  const markdown = content.data?.content as MarkdownData;

  function updateMarkdown(value: MarkdownData) {
    const dto: UpdateContentDto = {
      ...content.data!!,
      content: {
        ...content.data?.content,
        ...value,
      },
    };
    updateContent.mutate(dto);
  }

  function refetchMarkdown() {
    content.refetch();
  }

  return (
    <Markdown
      markdown={markdown}
      updateMarkdown={updateMarkdown}
      title={content.data?.name!!}
      updated={content.data?.updated!!}
      refetchMarkdown={refetchMarkdown}
      showHeader
    />
  );
}

export default MarkdownContent;
