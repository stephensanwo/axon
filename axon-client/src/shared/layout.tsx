import styled from "styled-components";
import { device } from "./media";

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


export const DataPageLayout = styled.div`
  padding-top: 88px;
  padding-bottom: 88px;
  display: flex;
  justify-content: center;
  background-color: ${(props: any) => (props.dark ? "#161616" : "#f4f4f4")};
  @media (max-width: 1080px) {
    display: none;
  }
`;

export const InfoPageContainer = styled.div`
  max-width: 800px;

  > div {
    margin-bottom: 2rem;
  }
  > div > h4 {
    margin-bottom: 1rem;
  }
  > div > ul {
    list-style-position: outside;
    padding-left: 16px;
    margin-top: 0.5rem;
  }
`;