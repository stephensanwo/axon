import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { remarkExtendedTable } from "remark-extended-table";
import styled from "styled-components";
import "./style.scss";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Tag } from "carbon-components-react";
import { Heading5 } from "../../shared/layout";

const MarkdownContainer = styled.div`
  display: flex;
  gap: 4%;
  min-height: 1040px;
`;
const MarkdownInput = styled.div`
  width: 48%;
  background-color: #262626;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const MarkdownPreview = styled.div`
  width: 48%;
`;

const MarkdownNotes = () => {
  const [markdown, setMarkdown] = useState<string>(
    `## Start typing your markdown here`
  );

  console.log(markdown);
  return (
    <MarkdownContainer>
      <MarkdownInput>
        <div>
          <small>Markdown Support</small>
          <Heading5 theme="dark">Notes Editor</Heading5>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginTop: "20px",
              marginBottom: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
              borderTop: "1px solid #525252",
              borderBottom: "1px solid #525252",
            }}
          >
            <div>
              <Tag
                style={{
                  minWidth: "60px",
                  height: "20px",
                  backgroundColor: "#66d19e",
                }}
              >
                <small style={{ color: "#000" }}>Status: Not Published</small>
              </Tag>
              )
            </div>
          </div>
        </div>

        <div className="markdown-text">
          <textarea
            id="markdown-text"
            placeholder={""}
            name={"title"}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </div>
      </MarkdownInput>
      <MarkdownPreview>
        <ReactMarkdown
          children={markdown}
          remarkPlugins={[remarkGfm, remarkToc, remarkExtendedTable]}
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
    </MarkdownContainer>
  );
};

export default MarkdownNotes;
