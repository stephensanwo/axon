import { TableData } from "src/domain/content/content.entity";

export const mockTable: TableData = {
  content_type: "table",
  data: {
    header: {
      "1": { key: "1", value: "Database", type: "cell" },
      "2": { key: "2", value: "Description", type: "cell" },
    },
    data: [
      {
        "1": "MySQL",
        "2": "MySQL is an open-source relational database management system.",
      },
      {
        "1": "PostgreSQL",
        "2": "PostgreSQL is a powerful, open-source object-relational database system.",
      },
    ],
    columnOrder: ["1", "2"],
  },
};
