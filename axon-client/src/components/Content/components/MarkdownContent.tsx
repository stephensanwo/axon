import { MarkdownData } from "src/domain/content/content.entity";
import { UpdateContentTypeDataDto } from "src/domain/content/content.dto";
import { Markdown } from "src/components/Markdown";
import { useContent } from "src/context/content/hooks/useContent";
import ContentSkeleton from "../ContentSkeleton";
import { ContentTypeDataQuery } from "src/context/content/index.types";

function MarkdownContent({
  contentTypeData,
}: {
  contentTypeData: ContentTypeDataQuery;
}) {
  const markdown = contentTypeData.data?.content as MarkdownData;
  const { updateContentTypeData } = useContent();

  function updateMarkdown(value: MarkdownData) {
    const dto: UpdateContentTypeDataDto = {
      ...contentTypeData.data!!,
      content: {
        ...contentTypeData.data?.content,
        ...value,
      },
    };
    updateContentTypeData.mutate(dto);
  }

  function refetchMarkdown() {
    contentTypeData.refetch();
  }

  return (
    <Markdown
      key={contentTypeData.data?.id}
      markdown={markdown}
      updateMarkdown={updateMarkdown}
      title={contentTypeData.data?.parent_content.name!!}
      updated={contentTypeData.data?.parent_content.updated!!}
      refetchMarkdown={refetchMarkdown}
      showHeader
      loadingComponent={<ContentSkeleton />}
    />
  );
}

export default MarkdownContent;
