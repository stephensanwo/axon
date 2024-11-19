import { create } from "zustand";
import {
  persist,
  createJSONStorage,
  subscribeWithSelector,
} from "zustand/middleware";
import { ContentEntity } from "src/domain/content/content.entity";
import {
  ContentSortVariants,
  ContentStore,
  STORAGE_KEYS,
} from "../index.types";
import { useParams, useSearchParams } from "react-router-dom";
import { ContentRouteParams } from "../index.types";
import { useEffect } from "react";

const baseContentStore = create<ContentStore>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        selectedContent: [],
        setSelectedContent: (selectedContent: ContentEntity[]) =>
          set({ selectedContent }),

        contentTableFilter: "",
        setContentTableFilter: (contentTableFilter: string) =>
          set({ contentTableFilter }),

        showFavoriteFolders: true,
        setShowFavoriteFolders: (showFavoriteFolders: boolean) =>
          set({ showFavoriteFolders }),

        sortContentFoldersBy: "created" as ContentSortVariants,
        setSortContentFoldersBy: (sortContentFoldersBy: ContentSortVariants) =>
          set({ sortContentFoldersBy }),

        leftPanel: false,
        setLeftPanel: (leftPanel: boolean) => set({ leftPanel }),

        contentId: "",
        contentFolderName: "",
        setContentRoute: (contentId: string, contentFolderName: string) =>
          set({ contentId, contentFolderName }),

        updateContentRouteSearchParams: (key: string, value: string) =>
          set((state) => {
            if (key === ContentRouteParams.CONTENT_PREVIEW) {
              return { ...state, contentId: value };
            }
            return state;
          }),

        clearContentRouteSearchParams: (key: string) =>
          set((state) => {
            if (key === ContentRouteParams.CONTENT_PREVIEW) {
              return { ...state, contentId: "" };
            }
            return state;
          }),
      }),
      {
        name: "content-store",
        storage: createJSONStorage(() => localStorage),
        partialize: (state: ContentStore) => ({
          showFavoriteFolders: state.showFavoriteFolders,
          sortContentFoldersBy: state.sortContentFoldersBy,
          leftPanel: state.leftPanel,
        }),
      }
    )
  )
);

// Custom hook to sync route params with store
export function useContentStore() {
  const store = baseContentStore();
  const { contentIdFromPath, contentFolderName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const contentIdFromSearchParams =
    searchParams.get(ContentRouteParams.CONTENT_PREVIEW) ?? "";

  // Sync route params with store
  useEffect(() => {
    const newContentId = contentIdFromPath ?? contentIdFromSearchParams ?? "";
    const newContentFolderName = contentFolderName ?? "";

    if (
      newContentId !== store.contentId ||
      newContentFolderName !== store.contentFolderName
    ) {
      store.setContentRoute(newContentId, newContentFolderName);
    }
  }, [contentIdFromPath, contentIdFromSearchParams, contentFolderName]);

  // Sync URL params with store for leftPanel
  useEffect(() => {
    const showFoldersParam = searchParams.get(
      STORAGE_KEYS.LEFT_PANEL_CONTENT_FOLDERS
    );
    if (showFoldersParam !== null) {
      const leftPanelValue = showFoldersParam === "true";
      if (leftPanelValue !== store.leftPanel) {
        store.setLeftPanel(leftPanelValue);
      }
    }
  }, [searchParams]);

  // Enhanced setLeftPanel that updates both store and URL
  const setLeftPanel = (leftPanel: boolean) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(
      STORAGE_KEYS.LEFT_PANEL_CONTENT_FOLDERS,
      String(leftPanel)
    );
    setSearchParams(updatedParams);
    store.setLeftPanel(leftPanel);
  };

  // Enhanced setContentTableFilter that updates both store and URL
  const setContentTableFilter = (filter: string) => {
    const updatedParams = new URLSearchParams(searchParams);
    if (filter) {
      updatedParams.set(STORAGE_KEYS.CONTENT_TABLE_FILTER, filter);
    } else {
      updatedParams.delete(STORAGE_KEYS.CONTENT_TABLE_FILTER);
    }
    setSearchParams(updatedParams);
    store.setContentTableFilter(filter);
  };

  // Wrap the store's updateContentRouteSearchParams to also update URL
  const updateContentRouteSearchParams = (key: string, value: string) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(key, value);
    setSearchParams(updatedParams);
    store.updateContentRouteSearchParams(key, value);
  };

  // Wrap the store's clearContentRouteSearchParams to also update URL
  const clearContentRouteSearchParams = (key: string) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete(key);
    setSearchParams(updatedParams);
    store.clearContentRouteSearchParams(key);
  };

  return {
    ...store,
    setLeftPanel,
    setContentTableFilter,
    updateContentRouteSearchParams,
    clearContentRouteSearchParams,
  };
}
