import { ContentTypeDataQuery } from "src/context/content/index.types";
import Blank from "src/components/Blank";
import { Skeleton } from "../../Common/Skeleton";
import ContentRender from "../Render";

export function ContentViewMain({
  contentTypeData,
}: {
  contentTypeData: ContentTypeDataQuery;
}) {
  if (contentTypeData.isLoading) {
    return (
      <div className="h-full w-full p-2 flex flex-col">
        <Skeleton className="h-[32px] mb-2" />
        <Skeleton className="flex-grow" />
      </div>
    );
  }

  if (contentTypeData.isError) {
    return (
      <div className="h-full w-full">
        <Blank
          heading="Something went wrong"
          description={`We couldn't load the content you are looking for \n please try again later.`}
          type="error"
          action={{
            label: "Try Again",
            href: `${window.location.pathname}`,
          }}
        />
      </div>
    );
  }

  if (!contentTypeData.data) {
    return (
      <div className="h-full w-full">
        <Blank
          heading="Content not found"
          description={`The content you are looking for does not exist\n or has been deleted.`}
          type="error"
          action={{
            label: "Find Content",
            href: "/content",
          }}
        />
      </div>
    );
  }

  return <ContentRender contentTypeData={contentTypeData} />;
}
