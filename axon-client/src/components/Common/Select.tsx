import { ActionList, ActionMenu, IconButton, useTheme } from "@primer/react";
import { useState } from "react";
import { PiDotsThreeBold } from "react-icons/pi";
import { TbEyeDiscount } from "react-icons/tb";

export type SelectMenuItem = {
  id: string;
  name: string;
  description?: string;
  onClick: (itemId: string) => void;
};

export type SelectProps = {
  title: string;
  menuItems: SelectMenuItem[];
  anchor?: "icon" | "text";
  width?:
    | "small"
    | "auto"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge"
    | undefined;
  itemId: string;
};

function Select(props: SelectProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { title, menuItems, anchor = "text", width = "auto", itemId } = props;
  const { theme } = useTheme();
  return (
    <>
      <ActionMenu open={menuOpen} onOpenChange={(value) => setMenuOpen(value)}>
        {anchor === "icon" ? (
          <ActionMenu.Anchor>
            <IconButton
              variant="invisible"
              icon={PiDotsThreeBold}
              aria-label="Open menu"
            />
          </ActionMenu.Anchor>
        ) : (
          <ActionMenu.Button
            leadingVisual={TbEyeDiscount}
            sx={{
              width: "100%",
            }}
          >
            {title}
          </ActionMenu.Button>
        )}
        <ActionMenu.Overlay
          width={width}
          align="center"
          sx={{ border: `1px solid ${theme?.colors.border.default}` }}
        >
          <ActionList>
            {menuItems.map((item) => (
              <ActionList.Item
                key={item.name}
                onClick={() => {
                  item.onClick(itemId);
                  setMenuOpen(false);
                }}
                variant={item.id === "delete" ? "danger" : "default"}
              >
                {item.name}
                {item.description && (
                  <ActionList.Description>
                    {item.description}
                  </ActionList.Description>
                )}
              </ActionList.Item>
            ))}
          </ActionList>
        </ActionMenu.Overlay>
      </ActionMenu>
    </>
  );
}

export default Select;
