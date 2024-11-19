import { SyncIcon } from "@primer/octicons-react";
import { ExclamationTriangleIcon, FileIcon } from "@radix-ui/react-icons";
import { PiSidebarSimple, PiX } from "react-icons/pi";
import { TbFolderUp, TbFolderX } from "react-icons/tb";
import { Button } from "src/components/Common/Button";
import { useContent } from "src/context/content/hooks/useContent";
// import { useContentRoute } from "src/context/content/hooks/useContentRoute";
import { useContentStore } from "src/context/content/hooks/useContentStore";
import {
  ContentListQuery,
  ContentRouteParams,
} from "src/context/content/index.types";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "src/components/Common/Tooltip";
import { Loader2 } from "lucide-react";
import { Skeleton } from "src/components/Common/Skeleton";

function ContentListFooter({ contentList }: { contentList: ContentListQuery }) {
  const contentListCount = contentList.data?.content.length ?? "-";
  const { selectedContent, setSelectedContent, leftPanel, setLeftPanel } =
    useContentStore();
  const { clearContentRouteSearchParams } = useContentStore();
  const { contentTypeData } = useContent();
  const selectedContentCount = selectedContent.length;

  if (contentList.isLoading) {
    return <Skeleton className="h-[20px] m-1" />;
  }

  if (contentList.isError) {
    return (
      <div
        className="h-[100%] flex items-center overflow-x-scroll"
        style={{
          scrollbarWidth: "none",
        }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="text-[10px] font-normal [&_svg]:w-[10px] [&_svg]:h-[10px] bg-destructive text-destructive-foreground [&_svg]:text-destructive-foreground"
                title="Refresh"
                onClick={() => {
                  contentTypeData.refetch();
                }}
              >
                {contentTypeData.isFetching ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <ExclamationTriangleIcon />
                )}
                Retry
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Something went wrong, Click to sync content list
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div
      className="h-[100%] flex items-center overflow-x-scroll"
      style={{
        scrollbarWidth: "none",
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="text-[10px] text-accent-foreground font-normal [&_svg]:w-[10px] [&_svg]:h-[10px]"
              title="Refresh"
              onClick={() => {
                contentTypeData.refetch();
              }}
            >
              {contentTypeData.isFetching ? (
                <Loader2 className="animate-spin" />
              ) : (
                <SyncIcon />
              )}
              Sync
            </Button>
          </TooltipTrigger>
          <TooltipContent>Sync content list</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button
        size="sm"
        variant="ghost"
        className="text-[10px] text-accent-foreground font-normal [&_svg]:w-[10px] [&_svg]:h-[10px]"
      >
        <FileIcon />
        <span className="text-accent-foreground text-[10px]">
          {contentListCount} Files
        </span>
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="text-[10px] text-accent-foreground font-normal [&_svg]:w-[12px] [&_svg]:h-[12px]"
        onClick={() => {
          setLeftPanel(!leftPanel);
        }}
      >
        {leftPanel ? <TbFolderX /> : <TbFolderUp />}
        {`${leftPanel ? "Close" : "Open"} Content Folders`}
      </Button>
      {selectedContentCount > 0 && (
        <Button
          size="sm"
          variant="ghost"
          className="text-[10px] text-accent-foreground font-normal [&_svg]:w-[10px] [&_svg]:h-[10px]"
        >
          <FileIcon />
          Selected {selectedContentCount} Files
          <span
            onClick={(e) => {
              e.preventDefault();
              setSelectedContent([]);
            }}
            className="cursor-pointer hover:bg-border rounded-sm p-0.5"
          >
            <PiX />
          </span>
        </Button>
      )}
      {contentTypeData.data && (
        <Button
          size="sm"
          variant="ghost"
          className="text-[10px] text-accent-foreground font-normal [&_svg]:w-[12px] [&_svg]:h-[12px]"
        >
          <PiSidebarSimple />
          Previewing {contentTypeData.data?.parent_content.name ?? "-"}
          <span
            onClick={(e) => {
              e.preventDefault();
              clearContentRouteSearchParams(ContentRouteParams.CONTENT_PREVIEW);
            }}
            className="cursor-pointer hover:bg-border rounded-sm p-0.5"
          >
            <PiX />
          </span>
        </Button>
      )}
    </div>
  );
}

export default ContentListFooter;
