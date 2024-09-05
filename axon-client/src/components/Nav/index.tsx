import { Divider } from "../Common/Divider";
import ProjectTree from "../Project/ProjectTree";
import { ActionList, TreeView, useTheme } from "@primer/react";
import DocumentTree from "../Document/DocumentTree";
import { useProjectContext } from "src/context/project/hooks/useProjectContext";
import { useDocumentContext } from "src/context/document/hooks/useDocumentContext";
import { CiSettings } from "react-icons/ci";
import { Text } from "../Common/Text";
import { PiUserCircleLight } from "react-icons/pi";
import Settings from "../Settings";
import User from "../User";
import Search from "../Search";

function Nav() {
  const { projectState, projectStateDispatch } = useProjectContext();
  const { documentState, documentStateDispatch } = useDocumentContext();
  const { theme } = useTheme();
  return (
    <nav
      style={{
        padding: "16px",
        maxHeight: "calc(100vh)",
        overflowY: "auto",
      }}
    >
      <ActionList
        sx={{
          padding: 0,
          margin: 0,
          width: "100%",
        }}
      >
        <Search.Button type="action-list" />
        <User.Button type="action-list" />
        <Settings.Button type="action-list" />
      </ActionList>
      <Divider margin={36} />
      <TreeView aria-label="Navigation Tree">
        <ProjectTree
          projectState={projectState}
          projectStateDispatch={projectStateDispatch}
        />
        <DocumentTree
          documentState={documentState}
          documentStateDispatch={documentStateDispatch}
        />
      </TreeView>
    </nav>
  );
}

export default Nav;
