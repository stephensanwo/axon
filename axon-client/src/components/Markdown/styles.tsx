import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { ThemeColors } from "src/shared/themes";
import { css } from "styled-components";
import { Fragment } from "react";
import { Table } from "@carbon/react";
import { TableHead } from "@carbon/react";
import { TableBody } from "@carbon/react";
import { TableRow } from "@carbon/react";
import { TableHeader } from "@carbon/react";
import { c } from "vitest/dist/reporters-5f784f42";
import { TableCell } from "@carbon/react";
import { Accordion } from "@carbon/react";

export const AxonMarkdown = styled(ReactMarkdown)`
  white-space: pre-wrap;
  line-height: 2;
  overflow: auto;
`;

export const AxonSyntaxHighlighter = styled(SyntaxHighlighter)`
  background-color: #161616bd !important;
  border: ${`1px solid ${ThemeColors.border}`};
  line-height: 1.4;
  font-size: 13px !important;
  font-family: "IBM Plex Mono";
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const MarkdownPreview = styled.div`
  padding: 14px 14px 14px 14px;
  width: 100%;
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
    color: ${ThemeColors.textLight};
  }
`;

export const MarkdownList = styled.li`
  ${MarkdownBaseText}
  line-height: 2;
  font-size: 14px;
  color: ${ThemeColors.white};
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
  color: ${ThemeColors.primary};
`;

export const MarkdownBlockQuote = styled.blockquote`
  border-left: 4px solid ${ThemeColors.primary};
  padding: 8px 8px 8px 16px;
  margin: 16px 0px 16px 8px;
  background-color: ${ThemeColors.bgHighlight1};
  font-style: italic;
`;

export const MarkdownTable = styled(Table)`
  margin-bottom: 16px;
  margin-top: 16px;
`;

export const MarkdownTableHead = styled(TableHead)``;
export const MarkdownTableHeadRow = styled(TableHeader)``;
export const MarkdownTableBody = styled(TableBody)``;
export const MarkdownTableRow = styled(TableRow)``;
export const MarkdownTableCell = styled(TableCell)``;

export const MarkdownHorizontalRule = styled.hr`
  border-bottom: 1px solid ${ThemeColors.border};
  margin: 16px 0px 16px 0px;
`;

export const MarkdownLineBreak = styled.br`
  margin: 0px;
`;

// a, blockquote, br, code, em, h1, h2, h3, h4, h5, h6, hr, img, li, ol, p, pre, strong, and ul
