import { create } from "zustand";
import { ContentEntity } from "src/domain/content/content.entity";

export type ContentStore = {
  selectedContent: ContentEntity[];
  setSelectedContent: (selectedContent: ContentEntity[]) => void;
};

export const useContentStore = create<ContentStore>((set) => ({
  selectedContent: [],
  setSelectedContent: (selectedContent: ContentEntity[]) =>
    set({ selectedContent }),
}));
