import styled from "styled-components";
import { ThemeColors } from "src/shared/themes";

const TagButtonWrapper = styled.div`
  cursor: ${(props: { disabled: boolean }) =>
    props.disabled ? "not-allowed" : "pointer"};

  min-width: 10px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  padding-left: 8px;
  padding-right: 8px;
  font-size: 10px;
  border-radius: 25px;
  color: ${(props: { disabled: boolean }) =>
    props.disabled ? ThemeColors.textDark : ThemeColors.textLight};
  background-color: ${ThemeColors.bgDark2};

  :hover {
    color: ${(props: { kind: "danger"; disabled: boolean }) =>
      props.kind === "danger"
        ? ThemeColors.dangerAction
        : props.disabled
        ? ThemeColors.textDark
        : ThemeColors.primary};
  }
`;

export const TagButton: React.FC<{
  id: string;
  onClick?: (e: React.MouseEvent) => void;
  label: string;
  style?: React.CSSProperties;
  selected?: boolean;
  disabled?: boolean;
}> = (props) => {
  const { label, disabled, id, style, onClick } = props;

  return (
    <TagButtonWrapper
      id={id}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled ?? false}
      style={style}
    >
      {label}
    </TagButtonWrapper>
  );
};
