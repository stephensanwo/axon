import Select, { SelectMenuItem } from "src/components/Common/Select";
import { Box, ButtonGroup, Truncate, useTheme } from "@primer/react";
import { ContentEntity } from "src/domain/content/content.entity";
import Close from "src/components/Common/Close";
import { PagePanelDirections } from "src/components/Page/index.types";
import { useContent } from "src/context/content/hooks/useContent";
// import { useContentRoute } from "src/context/content/hooks/useContentRoute";
import { ContentRouteParams } from "src/context/content/index.types";
import { useContentStore } from "src/context/content/hooks/useContentStore";

function ContentPreviewOptions() {
  const { contentTypeData } = useContent();
  const { clearContentRouteSearchParams } = useContentStore();

  const { theme } = useTheme();
  const options: SelectMenuItem[] = [
    {
      id: "markdown-preview",
      name: "Markdown Preview",
      onClick: (data: ContentEntity) => {},
    },
    {
      id: "close-markdown-preview",
      name: "Close Preview",
      onClick: (data: ContentEntity) => {},
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        marginRight: "64px",
      }}
    >
      <Close
        onClick={() => {
          clearContentRouteSearchParams(ContentRouteParams.CONTENT_PREVIEW);
        }}
        sx={{
          flexShrink: 0,
        }}
      />
      <Select<ContentEntity>
        title={
          <Truncate
            maxWidth={200}
            expandable={false}
            title={contentTypeData?.data?.parent_content.name || "..."}
            sx={{
              color: theme?.colors.text.gray,
            }}
          >
            {contentTypeData?.data?.parent_content.name || "..."}
          </Truncate>
        }
        menuItems={options}
        data={contentTypeData?.data?.parent_content!!}
        anchor="text"
        width={"small"}
      />
    </Box>
  );
}

export default ContentPreviewOptions;
