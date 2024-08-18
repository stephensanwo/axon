import { projectsDb } from "./project.db";

interface IProjectRepository {}

export class ProjectRepository implements IProjectRepository {
  projectsDb = projectsDb;

  constructor() {
    this.projectsDb.client.createIndex({
      index: { fields: ["name"] },
    });
  }

  async findProjectMatchByName(
    name: string
  ): Promise<PouchDB.Find.FindResponse<{}>> {
    const doc = await this.projectsDb.client.find({
      selector: {
        name: { $regex: `^${name}` },
      },
      sort: ["name"],
    });
    return doc;
  }

  async findProjectIdByName(name: string): Promise<string> {
    const doc = await this.projectsDb.client.find({
      selector: {
        name: { $eq: name },
      },
      sort: ["name"],
      limit: 1,
    });
    return doc.docs[0]?._id || "";
  }
}

const projectRepository = new ProjectRepository();
export default projectRepository;
