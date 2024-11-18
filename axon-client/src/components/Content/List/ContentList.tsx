import Table from "../../Table";
import { Column } from "@primer/react/lib-esm/DataTable";
import { formatDateToRelativeTime } from "src/common/date";
import Select, { SelectMenuItem } from "../../Common/Select";
import RowSelector from "src/components/Table/components/RowSelector";
import Link from "src/components/Common/Link";
import { useNavigate } from "react-router-dom";
import { useContent } from "src/context/content/hooks/useContent";
import { ContentEntity } from "src/domain/content/content.entity";
import startCase from "lodash/startCase";
import { UpdateContentDto } from "src/domain/content/content.dto";
import ContentRecents from "../ContentRecents";
import { CheckCircleIcon, TrashIcon } from "@primer/octicons-react";
import ContentPreviewButton from "../Preview/ContentPreviewButton";
import { useMemo } from "react";
import { useContentStore } from "src/context/content/hooks/useContentStore";
import { useContentRoute } from "src/context/content/hooks/useContentRoute";
import {
  ContentListQuery,
  ContentRouteParams,
} from "src/context/content/index.types";
import { Badge } from "src/components/Layout/Badge";

type ContentListProps = {
  initialSortColumn: string | undefined;
  initialSortDirection: "ASC" | "DESC" | undefined;
  emptyDocumentMessage: React.ReactNode;
  contentList: ContentListQuery;
};

function ContentList({
  initialSortColumn,
  initialSortDirection,
  emptyDocumentMessage,
  contentList,
}: ContentListProps) {
  const { updateContent, deleteContent } = useContent();
  const { setSelectedContent, selectedContent, contentTableFilter } =
    useContentStore();
  const {
    updateContentRouteSearchParams,
    clearContentRouteSearchParams,
    contentId,
  } = useContentRoute();
  const navigate = useNavigate();

  const options: SelectMenuItem[] = [
    {
      id: "preview",
      name: "Preview",
      onClick: (data: ContentEntity) => {
        updateContentRouteSearchParams(
          ContentRouteParams.CONTENT_PREVIEW,
          data.id
        );
      },
    },
    {
      id: "open",
      name: "Open",
      onClick: (data: ContentEntity) => {
        navigate(`/content/${contentList.data?.folder.name}/${data.id}`);
      },
    },
    {
      id: "pin",
      name: "Pin Content",
      onClick: (data: ContentEntity) => {
        const dto: UpdateContentDto = {
          ...data,
          pinned: true,
        };
        updateContent.mutate(dto);
      },
    },
    {
      id: "delete",
      name: "Delete Content",
      onClick: () => {},
      variant: "danger",
      subSelectMenu: [
        {
          id: "confirm-delete",
          name: "Confirm Delete",
          onClick: (data: ContentEntity) => {
            deleteContent.mutate([data.id]);
          },
          trailingVisual: <CheckCircleIcon />,
          variant: "danger",
        },
      ],
      leadingVisual: <TrashIcon />,
    },
  ];

  const columns: Column<ContentEntity>[] = [
    {
      id: "row-selector",
      header: () => null,
      width: "52px",
      renderCell: (row) => {
        return (
          <RowSelector
            rowId={row.id}
            checked={selectedContent.includes(row)}
            onChangeCallback={(selected: boolean) => {
              if (selected) {
                setSelectedContent([...selectedContent, row]);
              } else {
                setSelectedContent(
                  selectedContent.filter((content) => content.id !== row.id)
                );
              }
            }}
          />
        );
      },
    },
    {
      id: "preview",
      header: () => null,
      width: "64px",
      renderCell: (row) => {
        return (
          <ContentPreviewButton
            variant={contentId === row.id ? "outline" : "ghost"}
            type="icon"
            onClick={() =>
              contentId === row.id
                ? clearContentRouteSearchParams(
                    ContentRouteParams.CONTENT_PREVIEW
                  )
                : updateContentRouteSearchParams(
                    ContentRouteParams.CONTENT_PREVIEW,
                    row.id
                  )
            }
          />
        );
      },
    },
    {
      header: "Name",
      field: "name",
      rowHeader: true,
      width: "grow",
      maxWidth: "600px",
      id: "name",
      sortBy: "alphanumeric",
      renderCell: (row) => {
        return (
          <Link
            to={`/content/${contentList.data?.folder.name}/${row.id}`}
            text={row.name}
            truncateText={800}
          />
        );
      },
    },
    {
      header: "Type",
      maxWidth: "200px",
      field: "content_type",
      sortBy: "alphanumeric",
      renderCell: (row) => {
        return (
          <Badge className="min-w-[20px] pl-2 pr-2" variant={"outline"}>
            {startCase(row.content_type)}
          </Badge>
        );
      },
    },
    {
      header: "Last Updated",
      field: "updated",
      sortBy: "datetime",
      renderCell: (row) => {
        return <>{formatDateToRelativeTime(row.updated)}</>;
      },
    },
    {
      id: "actions",
      header: () => null,
      width: "64px",
      renderCell: (row) => {
        return (
          <Select<ContentEntity>
            title={`Actions ${row.name}`}
            menuItems={options}
            data={row}
            anchor="icon"
            width={"auto"}
          />
        );
      },
    },
  ];

  const contentRecents = useMemo(() => {
    return contentList.data?.content.filter((content) => content.pinned) ?? [];
  }, [contentList.data]);

  const contentData = useMemo(() => {
    if (contentTableFilter.length > 0) {
      return (
        contentList.data?.content.filter((content) =>
          content.name.toLowerCase().includes(contentTableFilter.toLowerCase())
        ) ?? []
      );
    }
    return contentList.data?.content ?? [];
  }, [contentTableFilter, contentList.data]);

  return (
    <>
      {contentRecents.length > 0 && (
        <ContentRecents
          contentRecents={contentRecents}
          contentFolder={contentList.data?.folder!}
        />
      )}
      <Table
        id="content"
        data={contentData}
        columns={columns}
        emptyStateMessage={emptyDocumentMessage}
        initialSortColumn={initialSortColumn}
        initialSortDirection={initialSortDirection}
        cellPadding={"normal"}
      />
    </>
  );
}

export default ContentList;



