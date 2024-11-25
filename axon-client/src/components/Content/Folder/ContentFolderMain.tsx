import { Box } from "@primer/react";
import ContentFolderListHeader from "./ContentFolderListHeader";
import ContentFolderList from "./ContentFolderList";
import {
  ContentFoldersQuery,
  ContentListQuery,
} from "src/context/content/index.types";
import { Skeleton } from "src/components/Common/Skeleton";
import Blank from "src/components/Blank";

function ContentFolderMain({
  contentFolders,
  contentList,
}: {
  contentFolders: ContentFoldersQuery;
  contentList: ContentListQuery;
}) {
  if (contentFolders.isLoading) {
    return (
      <Box className="h-full w-full p-2 flex flex-col">
        <Skeleton className="h-[48px] mb-2" />
        <Skeleton className="flex-grow" />
      </Box>
    );
  }

  if (contentFolders.isError) {
    return (
      <Box className="h-full w-full p-2">
        <Blank
          heading="Something went wrong"
          description={`We couldn't load the content you are looking for \n please try again later.`}
          type="error"
          action={{
            label: "Go Home",
            href: "/",
          }}
        />
      </Box>
    );
  }

  if (!contentFolders.data) {
    return (
      <Box className="h-full w-full">
        <Blank
          heading="Content not found"
          description={`The content you are looking for does not exist\n or has been deleted.`}
          type="error"
          action={{
            label: "Go Home",
            href: "/",
          }}
        />
      </Box>
    );
  }

  return (
    <Box className="pt-2 pl-3 pr-3">
      <ContentFolderListHeader
        title="Content"
        contentFolders={contentFolders.data}
      />
      <ContentFolderList
        contentFolders={contentFolders.data}
        activeFolderId={contentList.data?.folder?.id ?? ""}
      />
    </Box>
  );
}

export default ContentFolderMain;
