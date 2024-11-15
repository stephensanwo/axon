import { Fragment, Suspense, lazy, useContext, useMemo } from "react";
import { PageContainer } from "src/shared/layout";
import FolderContext from "src/context/folder";
import styled from "styled-components";
import FlowTree from "src/components/FlowTree";
// import Folders from "../Folders";
import NodePanel from "src/components/NodePanel";
import { NoteRenderState } from "./NoteRenderState";
import NoteContext from "src/context/notes";
import EdgeMenu from "src/components/Edge/EdgeMenu";
import EdgeContext from "src/context/edge";
import Page from "src/components/Page";
import { Text, useTheme } from "@primer/react";
import { useFolderContext } from "src/hooks/folders/useFolderContext";
import Note from "src/components/Note";
import { useNoteContext } from "src/hooks/notes/useNoteContext";
import Blank from "src/components/Blank";
import AxonLoader from "src/components/Loader/Loader";
import Header from "src/components/Header";
import AppIcon from "src/components/AppIcon";
import { useAppContext } from "src/hooks/app";
import FolderMenu from "src/components/Header/FolderMenu";
import FolderDropdown from "src/components/Folder/FolderDropdown";
import NoteMenu from "src/components/Note/NoteMenu";
import Content from "src/components/Content_";
import Skeleton from "src/components/Skeleton";
import Folders from "src/components/Folders";

const FlowItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100vw;
`;

export const NoteDiv = styled.div`
  width: 100%;
  height: 100%;
`;

// function PrivateApp() {
//   const { folders, folderQuery, selectedNote, folderMenu } = useFolderContext();
//   const { noteQuery, note } = useContext(NoteContext);
//   const {
//     togglePanel,
//     panelButtonRef,
//     openPanel,
//     closePanel,
//     panel,
//     panelAnchorRef,
//     panelConfirmButtonRef,
//   } = useAppContext();

//   const selectedFolder = useMemo(() => {
//     return folders?.find(
//       (folder) => folder.folder_id === selectedNote?.folder_id
//     );
//   }, [selectedNote]);

//   const { theme } = useTheme();

//   const AppContent = {
//     empty: (
//       <Blank
//         heading="Select note"
//         description="Select a note or create a new project"
//         type="info"
//       />
//     ),
//     loading: <AxonLoader />,
//     error: (
//       <Blank
//         heading="Unable to load note"
//         description=" There was an error loading the note, please try again later"
//         type="error"
//         action={{
//           label: "Retry",
//           href: "/notes",
//         }}
//       />
//     ),
//     success: <Note {...note} />,
//   };

//   const App = {
//     left: <Folders folders={folders} theme={theme} />,
//     right: <Content />,
//     content: (
//       <>
//         {noteQuery?.status === "loading" && AppContent.loading}
//         {noteQuery?.status === "error" && AppContent.error}
//         {noteQuery?.status === "success" &&
//           (selectedNote?.note_id ? AppContent.success : AppContent.empty)}
//       </>
//     ),
//   };

//   return (
//     <>
//       {/* <PageContainer dark>
//         <Folders />
//         {noteQuery?.status === "success" && selectedNote?.note_id && (
//           <NodePanel />
//         )}
//         <FlowItemContainer>
//           {noteQuery?.status === "success" &&
//             (selectedNote?.note_id ? (
//               <NoteDiv>{note && <FlowTree />}</NoteDiv>
//             ) : (
//               <NoteRenderState state="empty" />
//             ))}
//           {noteQuery?.status === "loading" && (
//             <>
//               <NoteRenderState state="loading" />
//             </>
//           )}
//           {noteQuery?.status === "error" && (
//             <>
//               <NoteRenderState state="error" />
//               <Alert
//                 title={"Error Loading Notes"}
//                 subtitle="There was an error loading your notes. Please try again later."
//                 kind={"error"}
//                 hideCloseButton={false}
//                 lowContrast={true}
//               />
//             </>
//           )}
//           {folderQuery?.status === "error" && (
//             <Alert
//               title={"Error Loading Folders"}
//               subtitle="There was an error loading your folders. Please try again later."
//               kind={"error"}
//               hideCloseButton={false}
//               lowContrast={true}
//             />
//           )}
//         </FlowItemContainer>
//         {noteQuery?.status === "success" && <NoteMenu />}
//         {edgeMenu === "edge-options" && <EdgeMenu />}
//       </PageContainer> */}
//       <Header
//         togglePanel={togglePanel}
//         panelButtonRef={panelButtonRef}
//         headerIcon={<AppIcon />}
//         breadcrumbs={
//           <Header.Breadcrumb>
//             <FolderDropdown folder={selectedFolder} /> /
//             <FolderMenu />
//           </Header.Breadcrumb>
//         }
//         menus={<NoteMenu />}
//         theme={theme}
//       ></Header>
//       <Page
//         openPanel={openPanel}
//         closePanel={closePanel}
//         panel={panel}
//         panelButtonRef={panelButtonRef}
//         panelAnchorRef={panelAnchorRef}
//         togglePanel={togglePanel}
//         panelConfirmButtonRef={panelConfirmButtonRef}
//         theme={theme}
//         leftPanel={<Page.Left>{App.left}</Page.Left>}
//         rightPanel={<Page.Right>{App.right}</Page.Right>}
//         main={<Page.Main>{App.content}</Page.Main>}
//       />
//     </>
//   );
// }

// export default PrivateApp;
