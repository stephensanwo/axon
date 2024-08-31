import { boardRepository } from "../board/board.repository";
import { projectsDb } from "./project.db";
import {
  CreateProjectDto,
  GetProjectResponseDto,
  UpdateProjectDto,
} from "./project.dto";
import { ProjectEntity } from "./project.entity";
import projectRepository from "./project.repository";

export class ProjectService {
  projectsDb = projectsDb;

  constructor() {}

  public async createProject(entity: CreateProjectDto): Promise<ProjectEntity> {
    try {
      const existingRecords = await projectRepository.findProjectMatchByName(
        entity.name
      );
      if (existingRecords.docs.length > 0) {
        const num = existingRecords.docs.length;
        entity.name = `${entity.name} ${num}`;
      }
      const res = await this.projectsDb.createRecord<CreateProjectDto>(entity);
      return res;
    } catch (error) {
      throw new Error(`Error creating project folder - ${error}`);
    }
  }

  public async updateProject(entity: UpdateProjectDto): Promise<boolean> {
    try {
      await this.projectsDb.updateRecord<UpdateProjectDto>(entity);
      return true;
    } catch (error) {
      throw new Error(`Error updating project folder - ${error}`);
    }
  }

  public async deleteProject(ids: string[]): Promise<boolean> {
    try {
      const ok = await this.projectsDb.deleteRecords(ids);
      return ok;
    } catch (error) {
      throw new Error(`Error deleting project folder - ${error}`);
    }
  }

  public async getProjects(): Promise<ProjectEntity[]> {
    try {
      const projects = await this.projectsDb.getAllRecords<ProjectEntity>({
        descending: true,
        endkey: "project_",
        startkey: "project_\ufff0",
      });
      if (projects) {
        return projects;
      } else {
        return [];
      }
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  public async getProjectFiles(
    projectName: string
  ): Promise<null | GetProjectResponseDto> {
    try {
      const projectId =
        await projectRepository.findProjectIdByName(projectName);
      if (!projectId) {
        return {
          projectId: null,
          boards: [],
        } as GetProjectResponseDto;
      }

      const boards = await boardRepository.findBoardByProjectId(projectId);

      return {
        projectId,
        boards: boards || [],
      } as GetProjectResponseDto;
    } catch (err) {
      console.error(err);
      throw new Error(`Error fetching project files`);
    }
  }

  public async getProject(projectId: string): Promise<ProjectEntity | null> {
    try {
      const project = await this.projectsDb.getRecord<ProjectEntity>(projectId);
      return project;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

const projectService = new ProjectService();
export default projectService;
