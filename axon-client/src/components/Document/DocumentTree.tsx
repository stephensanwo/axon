import { BaseDocumentProps } from "./index.types";
import { TreeView, useTheme } from "@primer/react";
import Icon from "src/components/Common/Icon";
import { Text } from "src/components/Common/Text";
import { PiPlus } from "react-icons/pi";

function DocumentTree({ documentFolders }: BaseDocumentProps) {
  const { theme } = useTheme();
  return (
    <>
      <TreeView.Item id="documents">
        <Text.Heading6Secondary>Documents</Text.Heading6Secondary>
        <TreeView.SubTree>
          <TreeView.Item id={`documents/new-document`}>
            <TreeView.LeadingVisual>
              <PiPlus fill={theme?.colors.primary.default} />
            </TreeView.LeadingVisual>
            <Text.SmallSecondary
              sx={{
                color: theme?.colors.primary.default,
              }}
            >
              New Folder
            </Text.SmallSecondary>
          </TreeView.Item>
          {documentFolders.data?.folderTree &&
            Object.values(documentFolders.data?.folderTree!!).map(
              (folder, index) => (
                <TreeView.Item key={index} id={`folders/${folder.name}`}>
                  <TreeView.LeadingVisual>
                    <Icon.DocumentFolder />
                  </TreeView.LeadingVisual>
                  <Text.SmallSecondary>{folder.name}</Text.SmallSecondary>
                  <TreeView.SubTree>
                    <TreeView.Item id={`folders/new-folder`}>
                      <TreeView.LeadingVisual>
                        <PiPlus fill={theme?.colors.primary.default} />
                      </TreeView.LeadingVisual>
                      <Text.SmallSecondary
                        sx={{
                          color: theme?.colors.primary.default,
                        }}
                      >
                        New File
                      </Text.SmallSecondary>
                    </TreeView.Item>
                    {Object.values(folder.files).map((file, index) => (
                      <TreeView.Item
                        key={index}
                        id={`folders/${folder.name}/${file.name}`}
                      >
                        <TreeView.LeadingVisual>
                          <Icon.DocumentFile />
                        </TreeView.LeadingVisual>
                        <Text.SmallSecondary>{file.name}</Text.SmallSecondary>
                      </TreeView.Item>
                    ))}
                  </TreeView.SubTree>
                </TreeView.Item>
              )
            )}
        </TreeView.SubTree>
      </TreeView.Item>
    </>
  );
}

export default DocumentTree;
