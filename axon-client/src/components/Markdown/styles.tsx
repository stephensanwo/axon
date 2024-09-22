import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { css } from "styled-components";
import { themeGet } from "@primer/react";
import { Table } from "@primer/react/drafts";

// export const AxonMarkdown = styled(ReactMarkdown)`
//   white-space: pre-wrap;
//   line-height: 2;
//   overflow: auto;
// `;

export const AxonSyntaxHighlighter = styled(SyntaxHighlighter)`
  background-color: ${themeGet("colors.bg.default")} !important;
  border: 1px solid ${themeGet("colors.border.default")} !important;
  line-height: 1.4;
  font-size: 13px !important;
  font-family: ${themeGet("fonts.mono")} !important;
  border-radius: 4px !important;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const MarkdownBaseText = css`
  line-height: 1.4;
`;

export const MarkdownHeading1 = styled.h1`
  ${MarkdownBaseText}
`;

export const MarkdownHeading2 = styled.h2`
  ${MarkdownBaseText}
`;

export const MarkdownHeading3 = styled.h3`
  ${MarkdownBaseText}
`;

export const MarkdownHeading4 = styled.h4`
  ${MarkdownBaseText}
  line-height: 2;
`;

export const MarkdownHeading5 = styled.h5`
  ${MarkdownBaseText}
  line-height: 2;
`;

export const MarkdownHeading6 = styled.h6`
  ${MarkdownBaseText}
  line-height: 2;
`;

export const MarkdownParagraph = styled.p`
  ${MarkdownBaseText}
  line-height: 2;
`;

export const MarkdownBlockquote = styled.blockquote`
  ${MarkdownBaseText}
  line-height: 2;
`;

export const MarkdownImage = styled.div`
  img {
    width: 100%;
    height: auto;
    margin: 16px 0px 16px 0px;
  }

  figcaption {
    font-style: italic;
    text-align: center;
    font-size: 12px;
    color: ${themeGet("colors.text.grayLight")};
  }
`;

export const MarkdownList = styled.li`
  ${MarkdownBaseText}
  line-height: 2;
  font-size: 14px;
  color: ${themeGet("colors.text.white")};
`;

export const MarkdownOrderedList = styled.ol`
  padding-left: 16px;
  list-style: decimal;
`;

export const MarkdownUnorderedList = styled.ol`
  padding-left: 16px;
  list-style: disc;
`;

export const MarkdownLink = styled.a`
  color: ${themeGet("colors.text.primary")};
`;

export const MarkdownBlockQuote = styled.blockquote`
  border-left: 4px solid ${themeGet("colors.text.primary")};
  padding: 8px 8px 8px 16px;
  margin: 16px 0px 16px 8px;
  background-color: ${themeGet("colors.bg.variant1")};
  font-style: italic;
`;

export const MarkdownTable = styled(Table)`
  margin-bottom: 16px;
  margin-top: 16px;
  display: grid;
  background-color: transparent;
  overflow-y: scroll;
  //   Hide scrollbar for Chrome, Safari and Opera
  ::-webkit-scrollbar {
    display: none;
  }
  // Hide scrollbar for IE, Edge and Firefox
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
`;

export const MarkdownTableHead = styled(Table.Head)``;
export const MarkdownTableHeadRow = styled(Table.Header)``;
export const MarkdownTableBody = styled(Table.Body)``;

export const MarkdownTableRow = styled(Table.Row)``;
export const MarkdownTableCell = styled(Table.Cell)`
  min-width: 150px;
`;

export const MarkdownHorizontalRule = styled.hr`
  border-bottom: 1px solid ${themeGet("colors.border.default")};
  margin: 16px 0px 16px 0px;
`;

export const MarkdownLineBreak = styled.br`
  margin: 0px;
`;

export const MakrkdownLink = styled.a`
  color: ${themeGet("colors.text.primary")};
`;

// a, blockquote, br, code, em, h1, h2, h3, h4, h5, h6, hr, img, li, ol, p, pre, strong, and ul
