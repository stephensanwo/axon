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
import ProjectRecents from "../ProjectRecents";
import { useProject } from "src/context/project/hooks/useProject";
import { UpdateProjectDto } from "src/domain/project/project.dto";
import { CheckCircleIcon, TrashIcon } from "@primer/octicons-react";
import { useProjectStore } from "src/context/project/project.store";
import { useMemo } from "react";

function ProjectFoldersList({
  initialSortColumn,
  initialSortDirection,
  emptyDocumentMessage,
}: {
  initialSortColumn: string | undefined;
  initialSortDirection: "ASC" | "DESC" | undefined;
  emptyDocumentMessage: React.ReactNode;
} & BaseProjectProps) {
  const navigate = useNavigate();
  const { projectFolders, updateProject, deleteProject } = useProject();
  const { selectedProjects, setSelectedProjects } = useProjectStore();
  const options: SelectMenuItem[] = [
    {
      id: "open",
      name: "Open Project",
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
    {
      id: "delete",
      name: "Delete Project",
      onClick: () => {},
      variant: "danger",
      subSelectMenu: [
        {
          id: "confirm-delete",
          name: "Confirm Delete",
          onClick: (data: ProjectEntity) => {
            deleteProject.mutate([data.id]);
          },
          trailingVisual: <CheckCircleIcon />,
          variant: "danger",
        },
      ],
      leadingVisual: <TrashIcon />,
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
                setSelectedProjects([...selectedProjects, row]);
              } else {
                setSelectedProjects(
                  selectedProjects.filter((project) => project.id !== row.id)
                );
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
    !projectFolders.isLoading && projectFolders.data?.projects.length === 0
      ? "empty"
      : !projectFolders.isLoading && projectFolders.data?.projects.length!! > 0
        ? "data"
        : "loading";

  const projectRecents = useMemo(() => {
    return (
      projectFolders.data?.projects.filter((project) => project.pinned) ?? []
    );
  }, [projectFolders.data?.projects]);

  return (
    <>
      {projectRecents.length > 0 && (
        <ProjectRecents projectRecents={projectRecents} />
      )}
      <Table
        id="documents"
        state={tableState}
        data={projectFolders.data?.projects!!}
        columns={columns}
        emptyStateMessage={emptyDocumentMessage}
        initialSortColumn={initialSortColumn}
        initialSortDirection={initialSortDirection}
        cellPadding={"normal"}
      />
    </>
  );
}

export default ProjectFoldersList;
