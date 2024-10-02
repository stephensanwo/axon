import { Box } from "@primer/react";
import { BaseContentProps } from "../index.types";
import { ContentRouterComponent } from "../ContentRouter";
import { useEffect, useState } from "react";

function ContentView(props: BaseContentProps) {
  const [routerProps, setRouterProps] = useState<BaseContentProps>(props);

  useEffect(() => {
    console.log(
      "contentName",
      props.contentState.content.contentQuery.data?.id
    );
    console.log("New Content View", props.contentState.content.data?.name);
    setRouterProps(props);
  }, [props.contentState.content]);

  return (
    <Box
      sx={{
        height: "90%",
        maxWidth: "1024px",
        margin: "auto",
        marginTop: "16px",
      }}
    >
      <ContentRouterComponent {...routerProps} />
    </Box>
  );
}

export default ContentView;
