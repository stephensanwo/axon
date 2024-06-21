import { Box, Tooltip } from "@primer/react";
import { IconButton } from "@primer/react";
import { NoteMenuTypes } from "src/types/notes";
import { NoteMenuButtons } from "./NoteMenuButtons";
import { useAppContext } from "src/hooks/app";
import { useNoteContext } from "src/hooks/notes/useNoteContext";
import { NoteMenuActions } from "./NoteMenuActions";

function NoteMenu() {
  const { setNoteMenu } = useNoteContext();
  const { togglePanel } = useAppContext();

  const handleNoteMenuButtonClick = (menuType: NoteMenuTypes) => {
    const actionType = NoteMenuActions[menuType];
    if (actionType === "panel") {
      togglePanel("right");
    } else if (actionType === "modal") {
      setNoteMenu(menuType);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        {NoteMenuButtons.map((menu, index) => {
          return (
            <Tooltip aria-label={menu.name} direction="s" key={index}>
              <IconButton
                id={menu.id}
                key={index}
                name={menu.name}
                size="small"
                icon={() => menu.icon}
                variant="invisible"
                aria-label={menu.description}
                onClick={() => handleNoteMenuButtonClick(menu.menuType)}
              />
            </Tooltip>
          );
        })}
      </Box>
    </>
  );
}

export default NoteMenu;
