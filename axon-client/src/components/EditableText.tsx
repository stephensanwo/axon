import styled from "styled-components";
import { ThemeColors } from "src/shared/themes";
import ContentEditable from "react-contenteditable";
import { CSSProperties } from "react";

interface IEditableTextProps {
  innerRef: React.RefObject<any>;
  disabled?: boolean;
  html: string;
  onClick: any;
  onBlur: any;
  onChange: any;
  autoCapitalize?: string;
  autoComplete?: string;
  autoCorrect?: string;
  spellCheck?: boolean;
  autoSave?: string;
  autoFocus?: boolean;
  textalign?: string;
  onMouseEnter?: any;
  onMouseDown?: any;
  onDoubleClick?: any;
  onPaste?: any;
  style?: CSSProperties;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  padding?: number;
  background?: string;
  fontColor?: string;
  border?: string;
  borderradius?: string;
  selected?: boolean;
  minWidth?: number;
  minheight?: number;
}

const getFocusHoverPositions = (borderradius: string) => `
  top: ${borderradius && `calc(${borderradius}/2 * -1)`};
  left: ${borderradius && `calc(${borderradius}/2 * -1)`};
  right: ${borderradius && `calc(${borderradius}/2 * -1)`};
  bottom: ${borderradius && `calc(${borderradius}/2 * -1)`};
`;

export const EditableText = styled(ContentEditable).attrs(
  (props: IEditableTextProps) => props
)`
  font-size: ${({ fontSize = 16 }) => `${fontSize}px`};
  font-weight: ${({ fontWeight = 400 }) => fontWeight};
  font-family: "IBM Plex Sans", sans-serif;
  text-align: ${({ textalign = "left" }) => textalign};
  color: ${({ color = ThemeColors.white }) => color};
  outline: none;
  min-width: ${({ minWidth = 280 }) => `${minWidth}px`};
  min-height: ${({ minheight = 16 }) => `${minheight}px`};
  line-height: 1.4;
  cursor: text;
  padding: ${({ padding = 8 }) => `${padding}px`};
  background-color: ${({ background = "" }) => background && background};
  outline: ${({ border = "" }) => border && `2px solid ${border}`};
  border-radius: ${({ borderradius = "0px" }) =>
    borderradius && `${borderradius}`};

  &::before {
    content: "";
    position: absolute;
    ${({ borderradius = "0px" }) => getFocusHoverPositions(borderradius)};
    border-radius: ${({ borderradius = "0px" }) =>
      borderradius && `calc(${borderradius} / 2 + ${borderradius})`};
    border: ${(props: { active: boolean }) =>
      props.active && `1px dashed ${ThemeColors.borderLight}`};
    z-index: -1;
  }

  ${({ selected = true, borderradius = "0px" }) => {
    const borderFocusHoverPositions = getFocusHoverPositions(borderradius);
    return (
      selected && {
        "&::before": {
          content: "",
          position: "absolute",
          borderFocusHoverPositions,
          border: `1px dashed ${ThemeColors.borderLight}`,
          zIndex: "-1",
        },
      }
    );
  }}

  :hover {
    &::before {
      content: "";
      position: absolute;
      ${({ borderradius = "0px" }) => getFocusHoverPositions(borderradius)};
      border-radius: ${({ borderradius = "0px" }) =>
        borderradius && `calc(${borderradius} / 2 + ${borderradius})`};
      border: 1px dashed ${ThemeColors.borderLight};
      z-index: -1;
    }
  }

  &:focus {
    &::before {
      content: "";
      position: absolute;
      ${({ borderradius = "0px" }) => getFocusHoverPositions(borderradius)};
      border-radius: ${({ borderradius = "0px" }) =>
        borderradius && `calc(${borderradius} / 2 + ${borderradius})`};
      border: 1px dashed ${ThemeColors.borderLight};
      z-index: -1;
    }
  }
`;
