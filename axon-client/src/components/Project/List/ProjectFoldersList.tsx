import Table from "../../Table";
import { Column } from "@primer/react/lib-esm/DataTable";
import { formatDateToRelativeTime } from "src/common/date";
import Select, { SelectMenuItem } from "../../Common/Select";
import { TableState } from "../../Table/index.types";
import RowSelector from "src/components/Table/components/RowSelector";
import Link from "src/components/Common/Link";
import { useNavigate } from "react-router-dom";
import { BaseProjectProps } from "../index.types";
import { ProjectEntity } from "src/domain/project/project.entity";
import ProjectRecents from "../components/ProjectRecents";
import { useProject } from "src/context/project/hooks/useProject";
import { UpdateProjectDto } from "src/domain/project/project.dto";

function ProjectFoldersList({
  projectState,
  projectStateDispatch,
  isLoading,
  initialSortColumn,
  initialSortDirection,
  emptyDocumentMessage,
}: {
  isLoading: boolean | undefined;
  initialSortColumn: string | undefined;
  initialSortDirection: "ASC" | "DESC" | undefined;
  emptyDocumentMessage: React.ReactNode;
} & BaseProjectProps) {
  const navigate = useNavigate();
  const { updateProject } = useProject();
  const options: SelectMenuItem[] = [
    {
      id: "open",
      name: "Open",
      onClick: (data: ProjectEntity) => {
        navigate(`${data.name}`);
      },
    },
    {
      id: "pin",
      name: "Pin Project",
      onClick: (data: ProjectEntity) => {
        const projectUpdateDto: UpdateProjectDto = {
          ...data,
          pinned: true,
        };
        updateProject.mutate(projectUpdateDto);
      },
    },
  ];

  const columns: Column<ProjectEntity>[] = [
    {
      id: "row-selector",
      header: () => null,
      width: "52px",
      renderCell: (row) => {
        return (
          <RowSelector
            rowId={row.id}
            onChangeCallback={(selected: boolean) => {
              if (selected) {
                projectStateDispatch({
                  type: "SELECT_PROJECT",
                  payload: row,
                });
              } else {
                projectStateDispatch({
                  type: "REMOVE_SELECTED_PROJECT",
                  payload: row.id,
                });
              }
            }}
          />
        );
      },
    },
    {
      header: "Project",
      field: "name",
      rowHeader: true,
      width: "grow",
      maxWidth: "400px",
      id: "name",
      sortBy: "alphanumeric",
      renderCell: (row) => {
        return (
          <Link
            to={`/projects/${row.name}/`}
            text={row.name}
            truncateText={800}
          />
        );
      },
    },
    {
      header: "Description",
      maxWidth: "600px",
      field: "description",
      sortBy: "alphanumeric",
      renderCell: (row) => {
        return <>{row.description}</>;
      },
    },
    {
      header: "Created",
      field: "created",
      sortBy: "datetime",
      renderCell: (row) => {
        return <>{formatDateToRelativeTime(row.created)}</>;
      },
    },
    {
      header: "Updated",
      field: "updated",
      sortBy: "datetime",
      renderCell: (row) => {
        return <>{formatDateToRelativeTime(row.updated)}</>;
      },
    },
    {
      id: "actions",
      header: () => null,
      width: "64px",
      renderCell: (row) => {
        return (
          <Select<ProjectEntity>
            title={`Actions ${row.name}`}
            menuItems={options}
            data={row}
            anchor="icon"
            width={"auto"}
          />
        );
      },
    },
  ];

  const tableState: TableState =
    !isLoading && projectState.projectFolders.projects.length === 0
      ? "empty"
      : !isLoading && projectState.projectFolders.projects.length > 0
        ? "data"
        : "loading";

  return (
    <>
      {projectState.projectFolders.pinnedProjects?.length > 0 && (
        <ProjectRecents
          projectState={projectState}
          projectStateDispatch={projectStateDispatch}
        />
      )}
      <Table
        id="documents"
        state={tableState}
        data={projectState.projectFolders.projects}
        columns={columns}
        emptyStateMessage={emptyDocumentMessage}
        initialSortColumn={initialSortColumn}
        initialSortDirection={initialSortDirection}
        cellPadding={"spacious"}
      />
    </>
  );
}

export default ProjectFoldersList;
