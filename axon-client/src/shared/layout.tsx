import styled from "styled-components";
import { device } from "./media";
import { ThemeColors } from "./themes";

// export const PageContainer = styled.div`
//   height: 92vh;
//   /* overflow: auto; */
//   width: 100%;
//   padding-right: 3.5%;
//   padding-left: 3.5%;
//   padding-top: 1vh;
//   background-color: ${(props: any) =>
//     props.dark ? ThemeColors.bgDark : ThemeColors.bgLight};
//   /* @media (max-width: 1080px) {
//     display: none;
//   } */
// `;

export const PageContainer = styled.div`
  padding-top: 88px;
  overflow-y: scroll;
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  background-color: ${(props: any) => (props.dark ? "#161616" : "#f4f4f4")};
  @media (max-width: 1080px) {
    display: none;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const PageHeaderContainer = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1px solid #393939; */
  padding-bottom: 10px;
  padding-top: 10px;
`;

export const HeaderAction = styled.div`
  display: flex;
`;

export const MobileWarningDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  text-align: center;
  background-color: ${(props: any) => (props.dark ? "#161616" : "#f4f4f4")};
`;

export const MobileContainerDiv = styled.div`
  width: 90%;
  margin: auto;
  padding-top: 40px;
  margin-bottom: 40px;
  background-color: ${(props: any) => (props.dark ? "#f3d2d2" : "#f4f4f4")};
  min-height: 100vh;
  @media ${device.laptop} {
    display: none;
  }
`;

export const Heading5 = styled.h5`
  color: ${(props: { theme: string }) =>
    props.theme === "dark" ? "#fff" : ""};
`;
