import { ContentTypeDataQuery } from "src/context/content/index.types";
import ContentPreview from "../Preview";
import { Box } from "@primer/react";
import { Skeleton } from "src/components/Common/Skeleton";
import Blank from "src/components/Blank";

function ContentListPreview({
  contentTypeData,
}: {
  contentTypeData: ContentTypeDataQuery;
}) {
  if (contentTypeData.isLoading) {
    return (
      <Box className="h-full w-full p-2 flex flex-col">
        <Skeleton className="flex-grow" />
      </Box>
    );
  }

  if (contentTypeData.isError || !contentTypeData.data) {
    return (
      <Box className="h-full w-full p-2">
        <Blank
          heading="Something went wrong"
          description={`We couldn't load the content you are looking for \n please try again later.`}
          type="error"
          action={{
            label: "Reload Page",
            href: `${window.location.href}`,
          }}
        />
      </Box>
    );
  }

  return <ContentPreview contentTypeData={contentTypeData} />;
}

export default ContentListPreview;
