import React from "react";
import { ThemeColors } from "src/shared/themes";
import { applyOpacity } from "src/utils/styles";
import styled from "styled-components";

const IconButtonWrapper = styled.button`
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
`;

const IconButton: React.FC<{
  id: string;
  onClick: (e: React.MouseEvent) => void;
  name: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  background?: string;
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
    selected,
    style,
    borderradius,
    children,
    className,
  } = props;
  const [isInteractive, setIsInteractive] = React.useState<boolean>(false);

  return (
    <IconButtonWrapper
      id={id}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled ?? false}
      kind="secondary"
      width={width ?? "45px"}
      height={height ?? "45px"}
      fill={fill}
      borderradius={borderradius ?? "15%"}
      background={background ?? ThemeColors.bgDark2}
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
                : ThemeColors.primary
              : disabled
              ? ThemeColors.textDark
              : fill ?? ThemeColors.white,

          fill:
            selected || isInteractive
              ? hoverfill
                ? hoverfill
                : fill
                ? applyOpacity(fill, 0.5)
                : ThemeColors.primary
              : disabled
              ? ThemeColors.textDark
              : fill ?? ThemeColors.white,
        },
        null
      )}
    </IconButtonWrapper>
  );
};

export default IconButton;
