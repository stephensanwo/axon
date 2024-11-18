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

/**
 * Helper function to parse boolean string
 * @param value - The value to parse
 * @returns The parsed boolean value
 */
const parseBooleanString = (value: string | null): boolean => {
  if (value === null) return false;
  return value.toLowerCase() === "true";
};

/**
 * Get initial leftPanel value from URL
 * @returns The initial leftPanel value
 */
const getInitialLeftPanel = (): boolean => {
  const searchParams = new URLSearchParams(window.location.search);
  const showFoldersParam = searchParams.get(
    STORAGE_KEYS.LEFT_PANEL_CONTENT_FOLDERS
  );
  return parseBooleanString(showFoldersParam);
};

/**
 * Create the base store with persistence
 * @returns The content store
 */
export const useContentStore = create<ContentStore>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        selectedContent: [],
        setSelectedContent: (selectedContent: ContentEntity[]) =>
          set({ selectedContent }),

        contentTableFilter: "",
        setContentTableFilter: (contentTableFilter: string) =>
          set((state) => {
            const searchParams = new URLSearchParams(window.location.search);
            if (contentTableFilter) {
              searchParams.set(
                STORAGE_KEYS.CONTENT_TABLE_FILTER,
                contentTableFilter
              );
            } else {
              searchParams.delete(STORAGE_KEYS.CONTENT_TABLE_FILTER);
            }
            const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
            window.history.pushState({}, "", newUrl);
            return { ...state, contentTableFilter };
          }),

        showFavoriteFolders: true,
        setShowFavoriteFolders: (showFavoriteFolders: boolean) =>
          set({ showFavoriteFolders }),

        sortContentFoldersBy: "created" as ContentSortVariants,
        setSortContentFoldersBy: (sortContentFoldersBy: ContentSortVariants) =>
          set({ sortContentFoldersBy }),

        leftPanel: getInitialLeftPanel(),
        setLeftPanel: (leftPanel: boolean) =>
          set((state) => {
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set(
              STORAGE_KEYS.LEFT_PANEL_CONTENT_FOLDERS,
              leftPanel.toString()
            );
            const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
            window.history.pushState({}, "", newUrl);
            return { ...state, leftPanel };
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
        onRehydrateStorage: () => (state) => {
          // After rehydration, check URL params
          const urlLeftPanel = getInitialLeftPanel();
          if (state && urlLeftPanel !== state.leftPanel) {
            state.setLeftPanel(urlLeftPanel);
          }
        },
      }
    )
  )
);
