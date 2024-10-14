import { Box } from "@primer/react";
import { BaseContentProps } from "../index.types";
import { ContentRouterComponent } from "../ContentRouter";

function ContentPreview(props: BaseContentProps) {
  console.log("content preview", props);
  return (
    <Box
      sx={{
        height: "80%",
      }}
    >
      <ContentRouterComponent {...props} />
    </Box>
  );
}

export default ContentPreview;
