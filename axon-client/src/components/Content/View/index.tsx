import { Box } from "@primer/react";
import { BaseContentProps } from "../index.types";
import { ContentRouter } from "../ContentRouter";
import { useEffect, useState } from "react";
import { ContentTypeKeys } from "src/domain/content/content.entity";

function ContentView(props: BaseContentProps) {
  // useEffect(() => {
  //   console.log(
  //     "contentName",
  //     props.contentState.content.contentQuery.data?.id
  //   );
  //   console.log("New Content View", props.contentState.content.data?.name);
  //   setRouterProps(props);
  // }, [props.contentState.content]);
  if (props.contentTypeData.isLoading) {
    return <h1>Loading...</h1>;
  }
  console.log("contentView", props);
  const Content =
    ContentRouter[
      props.contentTypeData.data?.content.content_type as ContentTypeKeys
    ];

  return (
    <Box
      sx={{
        height: "90%",
        maxWidth: "1024px",
        margin: "auto",
        marginTop: "16px",
      }}
    >
      <Content {...props} />
    </Box>
  );
}

export default ContentView;
