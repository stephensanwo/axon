import styled from "styled-components";

export const PageContainer = styled.div`
  margin-top: 35px;
  overflow-y: scroll;
  height: calc(100vh - 48px);
  width: 100%;
  background-color: ${(props: { background: string }) => props.background};

  @media (max-width: 1080px) {
    display: none;
  }

  //   Hide scrollbar for Chrome, Safari and Opera
  ::-webkit-scrollbar {
    display: none;
  }
  // Hide scrollbar for IE, Edge and Firefox
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
`;
