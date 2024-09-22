import { Box } from "@primer/react";
import { BaseContentProps } from "../index.types";
import { ContentRouterComponent } from "../ContentRouter";

function ContentView(props: BaseContentProps) {
  return (
    <Box
      sx={{
        height: "90%",
        maxWidth: "1024px",
        margin: "auto",
        marginTop: "16px",
      }}
    >
      <ContentRouterComponent {...props} />
    </Box>
  );
}

export default ContentView;
