import { ThemeColors } from "src/shared/themes";
import styled from "styled-components";

export const NoteMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
`;

export const NoteMenuContent = styled.div`
  flex: 1;
  padding: 16px;
  height: 100%;
`;

export const NoteMenuContentHeader = styled.h6`
  margin-bottom: ${(props: { marginBottom?: string }) =>
    props.marginBottom ?? "16px"};
  color: ${ThemeColors.textDark};
`;

export const NoteMenuContentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
`;
