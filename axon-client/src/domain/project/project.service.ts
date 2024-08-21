import { flowsRepository } from "../flow/flow.repository";
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
    console.log("projectName", projectName);
    try {
      const projectId =
        await projectRepository.findProjectIdByName(projectName);
      console.log("projectId", projectId);
      if (!projectId) {
        return {
          projectId: null,
          flows: [],
        } as GetProjectResponseDto;
      }

      const flows = await flowsRepository.findFlowsByProjectId(projectId);

      return {
        projectId,
        flows: flows || [],
      } as GetProjectResponseDto;
    } catch (err) {
      console.error(err);
      throw new Error(`Error fetching project files`);
    }
  }
}

const projectService = new ProjectService();
export default projectService;
