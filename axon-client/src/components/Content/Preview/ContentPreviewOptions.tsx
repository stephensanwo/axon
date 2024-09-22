import Select, { SelectMenuItem } from "src/components/Common/Select";
import { BaseContentProps } from "../index.types";
import { Box, ButtonGroup, Truncate, useTheme } from "@primer/react";
import { ContentEntity } from "src/domain/content/content.entity";
import Close from "src/components/Common/Close";
import { PagePanelDirections } from "src/components/Page/index.types";

function ContentPreviewOptions({
  contentState,
  togglePanel,
}: BaseContentProps & {
  togglePanel: (
    direction: PagePanelDirections,
    action?: "open" | "close"
  ) => void;
}) {
  const {
    contentList: { previewContent },
  } = contentState;
  console.log("previewContent", previewContent);
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
          togglePanel("right", "close");
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
            title={previewContent?.name || "..."}
            sx={{
              color: theme?.colors.text.gray,
            }}
          >
            {previewContent?.name || "..."}
          </Truncate>
        }
        menuItems={options}
        data={previewContent!!}
        anchor="text"
        width={"small"}
      />
    </Box>
  );
}

export default ContentPreviewOptions;
