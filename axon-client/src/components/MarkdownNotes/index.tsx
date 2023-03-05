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
import { Heading5 } from "../../shared/layout";
import { NoteContext } from "../../context/notes";
import { ViewFilled, Edit, Close } from "@carbon/icons-react";
import { INode } from "types/notes";

const MarkdownContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-bottom: 10px;
`;

const HeaderIcons = styled.div`
  display: flex;
  width: 64px;
  justify-content: space-between;
`;
const MarkdownPreview = styled.div`
  width: 100%;
`;

interface MarkdownProps {
  header: string;
  selectedNodeId?: string;
  content: INode;
}

const MarkdownNotes: React.FC<MarkdownProps> = (props) => {
  const [markdown, setMarkdown] = useState<any>();
  const [showPreview, setShowPreview] = useState(false);
  // const { openTextPanel, setOpenTextPanel } = useContext(NoteContext);

  const handlePreviewToggle = () => {
    if (showPreview === false) {
      setShowPreview(true);
    } else {
      setShowPreview(false);
      // Update global selectedNode State
    }
  };

  const handleTextPanelClose = () => {
    // if (openTextPanel === true) {
    //   setOpenTextPanel(false);
    // }
  };

  // useEffect(() => {
  //   setMarkdown(props.content.content_data);
  // }, [props.content.content_data]);

  console.log(markdown);
  return (
    <MarkdownContainer>
      <MarkdownHeader>
        <Heading5 theme="dark">{props.header}</Heading5>
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
          <Close
            size="24"
            style={{ cursor: "pointer" }}
            onClick={handleTextPanelClose}
          />
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
