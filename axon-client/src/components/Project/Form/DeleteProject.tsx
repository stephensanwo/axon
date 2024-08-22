import { Box, Button, IconButton } from "@primer/react";
import { PiTrashBold } from "react-icons/pi";
import OverlayMenu from "../../Common/OverlayMenu";
import { Text } from "../../Common/Text";
import { useForm } from "@tanstack/react-form";
import { InlineSpinner } from "../../Common/Spinner";
import map from "lodash/map";
import { useMemo } from "react";
import { BaseProjectProps } from "../index.types";
import { useProject } from "src/context/project/hooks/useProject";

function DeleteProject({ projectState }: BaseProjectProps) {
  const { deleteProject } = useProject();
  const {
    projectFolders: { selectedProjects },
  } = projectState;
  const isMultipleProjectsSelected = selectedProjects.length > 1;

  const selectedProjectIds = useMemo(
    () => map(selectedProjects, "id"),
    [selectedProjects]
  );

  const Form = useForm({
    onSubmit: async ({ value }) => {
      deleteProject.mutate(selectedProjectIds);
    },
  });

  return (
    <OverlayMenu
      width={300}
      minHeight={150}
      side="outside-top"
      anchorOffset={10}
      alignmentOffset={0}
      align="center"
      anchorComponent={
        isMultipleProjectsSelected ? (
          <Button
            variant="danger"
            leadingVisual={PiTrashBold}
            trailingVisual={() => (
              <Text.Heading6>{selectedProjects.length}</Text.Heading6>
            )}
            disabled={false}
            aria-label="Delete Selected Projects"
            sx={{
              flexShrink: 0,
            }}
          >
            Delete Projects
          </Button>
        ) : (
          <IconButton
            variant="danger"
            icon={PiTrashBold}
            disabled={false}
            aria-label="Delete Selected Project"
            sx={{
              flexShrink: 0,
            }}
          />
        )
      }
      heading={<Text.Heading5>Delete Selected Project(s)</Text.Heading5>}
      onCloseCallback={() => {}}
    >
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
        as="form"
      >
        <Text.ParagraphSecondary
          sx={{
            textAlign: "center",
            marginBottom: 1,
          }}
        >
          {`Are you sure you want to delete ${isMultipleProjectsSelected ? "these projects and all their contents" : "this project and all its contents"}? This action cannot be undone.`}
        </Text.ParagraphSecondary>
        <Form.Subscribe
          selector={({ isSubmitting }) => [isSubmitting]}
          children={([isSubmitting]) => (
            <Button
              variant="danger"
              leadingVisual={isSubmitting ? InlineSpinner : PiTrashBold}
              disabled={isSubmitting}
              onClick={Form.handleSubmit}
              size="medium"
            >
              {isSubmitting
                ? `Deleting ${isMultipleProjectsSelected ? "Projects" : "Project"}...`
                : `Delete ${isMultipleProjectsSelected ? "Projects" : "Project"}`}
            </Button>
          )}
        />
      </Box>
    </OverlayMenu>
  );
}

export default DeleteProject;
