import { ThemeColors } from "src/shared/themes";
import styled from "styled-components";

export const ContentContainer = styled.div`
  height: 100%;
`;

export const ContentHeader = styled.div`
  position: absolute;
  width: 100%;
  :hover {
    background-color: ${ThemeColors.bgDark};
  }
`;

export const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: scroll;
`;

export const MediaWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const MediaDescription = styled.div`
  min-height: 100px;
  margin-top: 16px;
  padding: 16px;
  width: 50%;
  > h6,
  p {
    color: ${ThemeColors.textLight};
    margin-top: 4px;
  }

  > h6 {
    margin-bottom: 16px;
  }
`;

export const MediaActions = styled.div`
  width: 100%;
  border-top: 1px dashed ${ThemeColors.border};
  margin-top: 16px;
  padding: 16px;
  display: flex;
  gap: 16px;
`;

export const MediaContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
`;

export const AxonImage = styled.img`
  background-color: ${ThemeColors.textBlack};
  width: 100%;
  height: 50%;
  object-fit: ${(props: { zoomFit: "cover" | "contain" }) =>
    props.zoomFit ?? "cover"};
`;
