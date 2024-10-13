import { boardRepository } from "../board/board.repository";
import boardService from "../board/board.service";
import { projectsDb } from "./project.db";
import {
  CreateProjectDto,
  GetProjectResponseDto,
  GetProjectsResponseDto,
  UpdateProjectDto,
} from "./project.dto";
import { ProjectEntity, ProjectEntityKeys } from "./project.entity";
import projectRepository from "./project.repository";
import groupBy from "lodash/groupBy";
import mapValues from "lodash/mapValues";
import keyBy from "lodash/keyBy";

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

  public async getAllProjects(): Promise<ProjectEntity[]> {
    const projects = await this.projectsDb.getAllRecords<ProjectEntity>({
      descending: true,
      endkey: `${ProjectEntityKeys.PROJECT}_`,
      startkey: `${ProjectEntityKeys.PROJECT}_\ufff0`,
    });
    return projects;
  }

  public async getProjects(): Promise<GetProjectsResponseDto | null> {
    try {
      const projects = await this.getAllProjects();

      if (!projects) {
        return null;
      }

      const boards = await boardService.getAllBoards();
      const groupedBoards = mapValues(
        groupBy(boards, "projectId"),
        (boardGroup) =>
          keyBy(
            boardGroup.map((board) => ({
              id: board.id,
              name: board.name,
            })),
            "id"
          )
      );

      const groupedProjects = projects.reduce(
        (acc, project) => {
          acc[project.id] = {
            id: project.id,
            name: project.name,
            boards: groupedBoards[project.id] || {},
          };
          return acc;
        },
        {} as Record<
          string,
          {
            id: string;
            name: string;
            boards: Record<string, { id: string; name: string }>;
          }
        >
      );

      return {
        projects,
        projectTree: groupedProjects,
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public async getProjectFiles(
    projectName: string
  ): Promise<GetProjectResponseDto | null> {
    try {
      const projectId =
        await projectRepository.findProjectIdByName(projectName);

      if (!projectId) {
        return null;
      }

      const project = await this.getProject(projectId);

      const boards = await boardRepository.findBoardByProjectId(projectId);

      return {
        project,
        boards: boards || [],
      };
    } catch (err) {
      console.error(err);
      return null;
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
