import { ActionList, ActionMenu, IconButton, useTheme } from "@primer/react";
import { VariantType } from "@primer/react/lib/Button/types";
import { useState } from "react";
import { PiDotsThreeBold } from "react-icons/pi";
import { TbEyeDiscount } from "react-icons/tb";
import { Text } from "./Text";

export type SelectMenuItem = {
  id: string;
  name: string;
  description?: string;
  onClick: (data: any) => void;
  variant?: "danger" | "default" | undefined;
  leadingVisual?: React.ReactNode;
  trailingVisual?: React.ReactNode;
};

export type SelectProps<T> = {
  title: string | React.ReactNode;
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
  data: T;
  textProps?: {
    variant?: VariantType;
    leadingVisual?: React.ElementType;
    trailingVisual?: React.ElementType;
    trailingAction?: React.ElementType;
  };
};

function Select<T>(props: SelectProps<T>) {
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    title,
    menuItems,
    anchor = "text",
    width = "auto",
    data,
    textProps = {
      variant: "invisible",
      leadingVisual: undefined,
      trailingVisual: undefined,
      trailingAction: undefined,
    },
  } = props;
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
            leadingVisual={textProps?.leadingVisual}
            trailingAction={textProps?.trailingAction}
            trailingVisual={textProps?.trailingVisual}
            variant={textProps?.variant}
            size="small"
            sx={{
              width: "100%",
            }}
          >
            {typeof title === "string" ? (
              <Text.SmallSecondary>{title}</Text.SmallSecondary>
            ) : (
              title
            )}
          </ActionMenu.Button>
        )}
        <ActionMenu.Overlay
          width={width}
          align="center"
          sx={{
            border: `1px solid ${theme?.colors.border.default}`,
            zIndex: 10050,
          }}
        >
          <ActionList>
            {menuItems.map((item, index) => (
              <ActionList.Item
                key={index}
                onClick={() => {
                  item.onClick(data);
                  setMenuOpen(false);
                }}
                variant={item.variant}
                aria-label={item.name}
                id={item.id}
              >
                {item.name}
                {item.description && (
                  <ActionList.Description>
                    {item.description}
                  </ActionList.Description>
                )}
                {item.leadingVisual && (
                  <ActionList.LeadingVisual>
                    {item.leadingVisual}
                  </ActionList.LeadingVisual>
                )}
                {item.trailingVisual && (
                  <ActionList.TrailingVisual>
                    {item.trailingVisual}
                  </ActionList.TrailingVisual>
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
