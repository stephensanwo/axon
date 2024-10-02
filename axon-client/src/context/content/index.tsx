import React, { Reducer, createContext, useEffect, useReducer } from "react";
import { useDataQuery } from "src/hooks/api/useDataQuery";
import { useContentRoute } from "./hooks/useContentRoute";
import { ContentAction, ContentState } from "./index.types";
import {
  ContentEntity,
  ContentQueryKeys,
} from "src/domain/content/content.entity";
import contentService from "src/domain/content/content.service";
import { contentReducer } from "./index.reducer";

interface ContentProviderProps {
  children: React.ReactNode;
}

interface ContentContextProps {
  contentState: ContentState;
  contentStateDispatch: React.Dispatch<ContentAction>;
}

const ContentContext = createContext({} as ContentContextProps);

const ContentProvider = ({ children }: ContentProviderProps) => {
  const { contentName } = useContentRoute();

  console.log("contentName", contentName);

  const contentListQuery = useDataQuery<ContentEntity[]>({
    queryKey: [...ContentQueryKeys.CONTENT],
    queryFn: async () => contentService.getAllContent(),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const contentQuery = useDataQuery<ContentEntity | null>({
    queryKey: [...ContentQueryKeys.CONTENT, contentName || "notfound"],
    queryFn: async () => contentService.getContent(contentName || ""),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const [contentState, contentStateDispatch] = useReducer<
    Reducer<ContentState, ContentAction>
  >(contentReducer, {
    contentList: {
      data: [],
      contentListQuery: contentListQuery,
      pinnedContent: [],
      selectedContent: [],
      previewContent: null,
    },
    content: {
      data: null,
      contentQuery: contentQuery,
    },
  });

  // useEffect(() => {
  //   contentStateDispatch({
  //     type: "RESET_CONTENT",
  //   });
  // }, []);

  useEffect(() => {
    if (contentListQuery.data && contentListQuery.isFetched) {
      contentStateDispatch({
        type: "INIT_CONTENT_LIST",
        payload: {
          contentList: contentListQuery.data,
          contentListQuery: contentListQuery,
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentListQuery.data]);

  useEffect(() => {
    contentQuery.data?.content.content_type === "table" &&
      console.log("contentName", contentQuery.data?.content.data.header);
    if (contentQuery.data && contentQuery.isFetched) {
      contentStateDispatch({
        type: "INIT_CONTENT",
        payload: {
          content: contentQuery.data,
          contentQuery: contentQuery,
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentQuery.data, contentName]);

  console.log("contentState", contentState);

  return (
    <ContentContext.Provider
      value={{
        contentState,
        contentStateDispatch,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export { ContentProvider, ContentContext };
