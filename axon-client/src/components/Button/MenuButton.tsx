import { useTheme } from "@primer/react";
import React from "react";
import { applyOpacity } from "src/utils/styles";
import styled from "styled-components";

const MenuButtonWrapper = styled.button`
  cursor: ${(props: { disabled: boolean }) =>
    props.disabled ? "not-allowed" : "pointer"};
  width: ${(props: { width: string }) => props.width};
  height: ${(props: { height: string }) => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: none;
  border-radius: ${(props: { borderradius: string }) => props.borderradius};
  background-color: ${(props: { background: string }) => props.background};

  :hover {
    background-color: ${(props: { backgroundHoverFill: string }) =>
      props.backgroundHoverFill};
  }
`;

const MenuButton: React.FC<{
  id: string;
  onClick: (e: React.MouseEvent) => void;
  name: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  background?: string;
  backgroundHoverFill?: string;
  borderradius?: string;
  width?: string;
  height?: string;
  selected?: boolean;
  fill?: string;
  hoverfill?: string;
  disabled?: boolean;
  tooltipPosition?: "bottom" | "top" | "left" | "right";
  hideTooltip?: boolean;
  className?: string;
}> = (props) => {
  const {
    width,
    height,
    fill,
    hoverfill,
    disabled,
    id,
    onClick,
    background,
    backgroundHoverFill,
    selected,
    style,
    borderradius,
    children,
    className,
  } = props;
  const [isInteractive, setIsInteractive] = React.useState<boolean>(false);
  const { theme } = useTheme();
  return (
    <MenuButtonWrapper
      id={id}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled ?? false}
      kind="secondary"
      width={width ?? "45px"}
      height={height ?? "45px"}
      fill={fill}
      borderradius={borderradius ?? "15%"}
      background={background ?? theme?.colors.bg.variant1}
      backgroundHoverFill={backgroundHoverFill ?? theme?.colors.bg.variant2b}
      onMouseEnter={() => !disabled && setIsInteractive(true)}
      onMouseLeave={() => !disabled && setIsInteractive(false)}
      style={style}
      className={className}
    >
      {React.cloneElement(
        children as React.ReactElement,
        {
          color:
            selected || isInteractive
              ? hoverfill
                ? hoverfill
                : fill
                ? applyOpacity(fill, 0.5)
                : theme?.colors.primary.default
              : disabled
              ? theme?.colors.bg.variant2
              : fill ?? theme?.colors.fg.default,

          fill:
            selected || isInteractive
              ? hoverfill
                ? hoverfill
                : fill
                ? applyOpacity(fill, 0.5)
                : theme?.colors.primary.default
              : disabled
              ? theme?.colors.bg.variant1
              : fill ?? theme?.colors.fg.default,
        },
        null
      )}
    </MenuButtonWrapper>
  );
};

export default MenuButton;
