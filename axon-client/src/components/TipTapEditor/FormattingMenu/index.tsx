import { BubbleMenu } from "@tiptap/react";
import { BubbleMenuProps } from "./index.types";
import {
  ActionList,
  ActionMenu,
  Box,
  ButtonGroup,
  Heading,
  IconButton,
  Text,
  useTheme,
} from "@primer/react";
import { FormattingMenuButtons } from "./buttons";
import { useFormattingMenu } from "./useFormattingMenu";
import { upperFirst } from "lodash";
import { InlineHeader } from "src/components/Common";

function FormattingMenu(props: BubbleMenuProps) {
  const { editor } = props;
  const { theme } = useTheme();
  const {
    formattingMenuActions,
    formattingMenuButtonIsActive,
    formattingSubmenus,
  } = useFormattingMenu();
  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{
        placement: "bottom",
      }}
    >
      <Box
        sx={{
          display: "flex",
          backgroundColor: theme?.colors.bg.variant1,
          borderRadius: 8,
        }}
      >
        <ButtonGroup>
          {FormattingMenuButtons.map((button, index) => {
            const subMenus = formattingSubmenus(button.id);
            return subMenus !== null ? (
              <ActionMenu>
                <ActionMenu.Button
                  size="small"
                  leadingVisual={() => button.name}
                >
                  <></>
                </ActionMenu.Button>
                <ActionMenu.Overlay
                  width="small"
                  maxHeight="large"
                  overflow="scroll"
                >
                  <ActionList selectionVariant="single">
                    <InlineHeader
                      title={button.name}
                      subtitle={button.longText}
                      styles={{
                        paddingLeft: 3,
                        marginBottom: 0,
                        position: "sticky",
                      }}
                    ></InlineHeader>
                    {/* <ActionList.Divider /> */}
                    {subMenus &&
                      Object.entries(subMenus).map(
                        ([parentKey, parentValue]) => (
                          <ActionList.Group
                            title={
                              Object.keys(subMenus).length > 1
                                ? upperFirst(parentKey.replace(/-/g, " "))
                                : null
                            }
                          >
                            {parentValue.map((submenu, index) => (
                              <ActionList.Item
                                key={index}
                                onSelect={() =>
                                  formattingMenuActions(
                                    editor,
                                    submenu.id,
                                    submenu.value
                                  )
                                }
                                selected={formattingMenuButtonIsActive(
                                  editor,
                                  submenu.id,
                                  submenu.value
                                )}
                              >
                                {submenu.name}
                                <ActionList.TrailingVisual>
                                  {submenu.icon}
                                </ActionList.TrailingVisual>
                              </ActionList.Item>
                            ))}
                          </ActionList.Group>
                        )
                      )}
                  </ActionList>
                </ActionMenu.Overlay>
              </ActionMenu>
            ) : (
              <IconButton
                key={index}
                icon={() => button.icon}
                aria-label={button.id}
                onClick={() => {
                  formattingMenuActions(editor, button.id, button.value);
                }}
                size="small"
              />
            );
          })}
        </ButtonGroup>
      </Box>
    </BubbleMenu>
  );
}

export default FormattingMenu;
