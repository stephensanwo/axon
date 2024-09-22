import { Box } from "@primer/react";
import { BaseContentProps } from "../index.types";
import { MarkdownData } from "src/domain/content/content.entity";
import { UpdateContentDto } from "src/domain/content/content.dto";
import contentService from "src/domain/content/content.service";
import { Markdown } from "src/components/Markdown";

function ContentPreview({ contentState }: BaseContentProps) {
  const markdown =
    contentState.content.data?.content.content_type === "markdown"
      ? contentState.content.data?.content
      : ({} as MarkdownData);

  function updateMarkdown(value: MarkdownData) {
    const dto: UpdateContentDto = {
      ...contentState.content.data!!,
      content: value,
    };
    contentService.updateContent(dto);
  }

  function refetchMarkdown() {
    contentState.content.contentQuery.refetch();
  }

  return (
    <Box
      sx={{
        height: "80%",
      }}
    >
      <Markdown
        markdown={markdown}
        updateMarkdown={updateMarkdown}
        refetchMarkdown={refetchMarkdown}
        title={contentState.content.data?.name!!}
        updated={contentState.content.data?.updated!!}
        showHeader
      />
    </Box>
  );
}

export default ContentPreview;
