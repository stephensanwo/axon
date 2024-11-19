import { Box } from "@primer/react";
import ContentListHeader from "../Header/ContentListHeader";
import ContentList from "../List/ContentList";
import { ContentListQuery } from "src/context/content/index.types";
import ContentEmpty from "../ContentEmpty";
import { FolderIcon } from "lucide-react";
import Blank from "src/components/Blank";
import { Skeleton } from "../../Common/Skeleton";
import { FileIcon, FileTextIcon } from "@radix-ui/react-icons";
import { PiFile } from "react-icons/pi";

export function ContentFolderMain({
  contentList,
  contentFolderName,
}: {
  contentList: ContentListQuery;
  contentFolderName: string;
}) {
  if (contentList.isLoading) {
    return (
      <Box className="h-full w-full p-2 flex flex-col">
        <Skeleton className="h-[48px] mb-2" />
        <Skeleton className="h-[32px] mb-2" />
        <Skeleton className="flex-grow" />
      </Box>
    );
  }

  if (contentList.isError) {
    return (
      <Box className="h-full w-full">
        <Blank
          heading="Something went wrong"
          description={`We couldn't load the content you are looking for \n please try again later.`}
          type="error"
          action={{
            label: "Try Again",
            href: `${window.location.pathname}`,
          }}
        />
      </Box>
    );
  }

  if (!contentList.data) {
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
    <Box className="h-full w-full">
      <ContentListHeader
        title={contentFolderName}
        contentListFolder={contentList.data?.folder}
      />
      <ContentList
        contentList={contentList}
        initialSortColumn={
          contentList.data?.content.length > 0 ? "updated" : ""
        }
        initialSortDirection={
          contentList.data?.content.length > 0 ? "DESC" : undefined
        }
        emptyDocumentMessage={
          <Blank
            heading="No content"
            description={`You have no content \n Create a new content to get started`}
            type="info"
            action={{
              label: "Go Home",
              href: "/",
            }}
          />
        }
      />
    </Box>
  );
}
