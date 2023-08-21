import React, { useContext, useEffect, useState } from "react";
import MarkdownEditor, { ICommand } from "@uiw/react-markdown-editor";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { remarkExtendedTable } from "remark-extended-table";
import styled from "styled-components";
import "./style.scss";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Tag } from "@carbon/react";
import { Heading5 } from "src/shared/layout";
import { NoteContext } from "src/context/notes";
import {
  ViewFilled,
  Edit,
  SidePanelOpen,
  SidePanelClose,
} from "@carbon/icons-react";
import { INode } from "src/types/notes";
import { OverflowMenu, OverflowMenuItem } from "@carbon/react";

const MarkdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
const MarkdownInput = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  height: 90vh;
  max-height: 1080px;
`;

const MarkdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #393939;
  height: 30px;
  padding-left: 10px;
  padding-right: 10px;
`;

const HeaderIcons = styled.div`
  display: flex;
  width: 64px;
  justify-content: space-between;
  align-items: center;
`;
const MarkdownPreview = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
`;

interface MarkdownProps {
  header: string;
  selectedNodeId?: string;
  content: INode;
  toggleOpen: () => void;
  toggleClose: () => void;
}

const MarkdownNotes: React.FC<MarkdownProps> = (props) => {
  const [markdown, setMarkdown] = useState<any>();
  const [showPreview, setShowPreview] = useState(false);

  const handlePreviewToggle = () => {
    if (showPreview === false) {
      setShowPreview(true);
    } else {
      setShowPreview(false);
      // Update global selectedNode State
    }
  };

  console.log(markdown);
  return (
    <MarkdownContainer>
      <MarkdownHeader>
        <HeaderIcons>
          <OverflowMenu
            data-floating-menu-container
            size="md"
            renderIcon={() => (
              <SidePanelClose size="16" style={{ cursor: "pointer" }} />
            )}
            id="overflow-menu"
            focusTrap={false}
            iconDescription={"Close"}
            key={3}
            ariaLabel="Close"
            onClick={props.toggleOpen}
            disabled={false}
            style={{
              width: "24px",
              height: "24px",
            }}
          ></OverflowMenu>
        </HeaderIcons>
        <small>{props.header}</small>
        <HeaderIcons>
          {showPreview ? (
            <Edit
              size="16"
              style={{ cursor: "pointer" }}
              onClick={handlePreviewToggle}
            />
          ) : (
            <ViewFilled
              size="16"
              style={{ cursor: "pointer" }}
              onClick={handlePreviewToggle}
            />
          )}
          <OverflowMenu
            data-floating-menu-container
            size="md"
            renderIcon={() => (
              <SidePanelOpen size="16" style={{ cursor: "pointer" }} />
            )}
            id="overflow-menu"
            focusTrap={false}
            iconDescription={"Close"}
            key={3}
            ariaLabel="Close"
            onClick={props.toggleClose}
            disabled={false}
            style={{
              width: "24px",
              height: "24px",
            }}
          ></OverflowMenu>
        </HeaderIcons>
      </MarkdownHeader>
      {showPreview ? (
        <MarkdownPreview>
          <ReactMarkdown
            children={markdown}
            remarkPlugins={[remarkGfm, remarkToc]}
            className="react-markdown-overrides"
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    style={atomOneDark}
                    className="code-editor"
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </MarkdownPreview>
      ) : (
        <MarkdownInput>
          <div className="markdown-text">
            <textarea
              id="markdown-text"
              placeholder={""}
              name={"title"}
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              autoSave="off"
            />
          </div>
        </MarkdownInput>
      )}
    </MarkdownContainer>
  );
};

export default MarkdownNotes;
