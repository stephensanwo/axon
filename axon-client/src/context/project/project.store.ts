import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CreateProjectDto } from "src/domain/project/project.dto";
import { ProjectEntity } from "src/domain/project/project.entity";

export type ProjectStore = {
  createProjectForm: CreateProjectDto | null;
  setCreateProjectForm: (createProjectForm: CreateProjectDto | null) => void;
  selectedProjects: ProjectEntity[];
  setSelectedProjects: (selectedProjects: ProjectEntity[]) => void;
};

export const useProjectStore = create(
  persist<ProjectStore>(
    (set) => ({
      createProjectForm: null as CreateProjectDto | null,
      setCreateProjectForm: (createProjectForm: CreateProjectDto | null) =>
        set({ createProjectForm }),
      selectedProjects: [] as ProjectEntity[],
      setSelectedProjects: (selectedProjects: ProjectEntity[]) =>
        set({ selectedProjects }),
    }),
    {
      name: "project",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
