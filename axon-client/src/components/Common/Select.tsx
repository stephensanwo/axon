import { ActionList, ActionMenu, IconButton, useTheme } from "@primer/react";
import { VariantType } from "@primer/react/lib/Button/types";
import { CSSProperties, useState } from "react";
import { PiDotsThreeBold } from "react-icons/pi";
import { Text } from "./Text";

export type SelectMenuItem = {
  id: string;
  name: string;
  description?: string;
  onClick: (data: any) => void;
  variant?: "danger" | "default" | undefined;
  leadingVisual?: React.ReactNode;
  trailingVisual?: React.ReactNode;
  subSelectMenu?: SelectMenuItem[];
};

export type SelectProps<T> = {
  title: string | React.ReactNode;
  menuItems: SelectMenuItem[];
  anchor?: "icon" | "text";
  iconProps?: {
    style: CSSProperties;
  };
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
  portalContainerName?: string;
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
    portalContainerName,
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
              sx={{
                ...props.iconProps?.style,
                flexShrink: 0,
              }}
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
            borderRadius: 6,
          }}
          portalContainerName={portalContainerName}
        >
          <ActionList>
            {menuItems.map((item, index) =>
              item.subSelectMenu ? (
                <ActionMenu key={index}>
                  <ActionMenu.Anchor>
                    <ActionList.Item
                      variant={item.variant}
                      aria-label={item.name}
                      id={item.id}
                      sx={{
                        borderRadius: 4,
                        fontSize: 1,
                      }}
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
                  </ActionMenu.Anchor>
                  <ActionMenu.Overlay
                    sx={{
                      border: `1px solid ${theme?.colors.border.default}`,
                      offset: 40,
                    }}
                  >
                    <ActionList>
                      {item.subSelectMenu.map((subItem, subIndex) => (
                        <ActionList.Item
                          key={subIndex}
                          onClick={() => {
                            subItem.onClick(data);
                            setMenuOpen(false);
                          }}
                          variant={subItem.variant}
                          aria-label={subItem.name}
                          id={subItem.id}
                          sx={{
                            borderRadius: 4,
                            fontSize: 1,
                          }}
                        >
                          {subItem.name}
                          {subItem.description && (
                            <ActionList.Description>
                              {subItem.description}
                            </ActionList.Description>
                          )}
                          {subItem.leadingVisual && (
                            <ActionList.LeadingVisual>
                              {subItem.leadingVisual}
                            </ActionList.LeadingVisual>
                          )}
                          {subItem.trailingVisual && (
                            <ActionList.TrailingVisual>
                              {subItem.trailingVisual}
                            </ActionList.TrailingVisual>
                          )}
                        </ActionList.Item>
                      ))}
                    </ActionList>
                  </ActionMenu.Overlay>
                </ActionMenu>
              ) : (
                <ActionList.Item
                  key={index}
                  onClick={() => {
                    item.onClick(data);
                    setMenuOpen(false);
                  }}
                  variant={item.variant}
                  aria-label={item.name}
                  id={item.id}
                  sx={{
                    borderRadius: 4,
                    fontSize: 1,
                    color: theme?.colors.text.gray,
                  }}
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
              )
            )}
          </ActionList>
        </ActionMenu.Overlay>
      </ActionMenu>
    </>
  );
}

export default Select;
