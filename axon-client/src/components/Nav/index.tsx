import { Divider } from "../Common/Divider";
import ProjectTree from "../Project/ProjectTree";
import { ActionList, TreeView, useTheme } from "@primer/react";
import DocumentTree from "../Document/DocumentTree";
import Settings from "../Settings";
import User from "../User";
import Search from "../Search";
import { useDocument } from "src/context/document/hooks/useDocument";
import { useProject } from "src/context/project/hooks/useProject";

function Nav() {
  const { documentFolders, documentFiles } = useDocument();
  const { projectFolders, projectFiles } = useProject();
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
          projectFolders={projectFolders}
          projectFiles={projectFiles}
        />
        <DocumentTree
          documentFolders={documentFolders}
          documentFiles={documentFiles}
        />
      </TreeView>
    </nav>
  );
}

export default Nav;
