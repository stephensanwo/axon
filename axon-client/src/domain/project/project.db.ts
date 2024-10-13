import { DBClient } from "src/db/client";
import { ProjectEntityKeys } from "./project.entity";

export const projectsDb = new DBClient("axon", ProjectEntityKeys.PROJECT);
