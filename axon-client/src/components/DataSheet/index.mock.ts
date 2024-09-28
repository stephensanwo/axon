import { TableData } from "src/domain/content/content.entity";

export const mockTable: TableData = {
  content_type: "table",
  data: {
    header: {
      "0": { key: "0", value: "Database", type: "text" },
      "1": { key: "1", value: "Description", type: "text" },
    },
    body: [
      {
        "0": "MySQL",
        "1": "MySQL is an open-source relational database management system.",
      },
      {
        "0": "PostgreSQL",
        "1": "PostgreSQL is a powerful, open-source object-relational database system.",
      },
    ],
  },
};
