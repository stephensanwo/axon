import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  AxonSyntaxHighlighter,
  MarkdownBlockQuote,
  MarkdownHeading1,
  MarkdownHeading2,
  MarkdownHeading3,
  MarkdownHeading4,
  MarkdownHeading5,
  MarkdownHeading6,
  MarkdownHorizontalRule,
  MarkdownImage,
  MarkdownLineBreak,
  MarkdownList,
  MarkdownOrderedList,
  MarkdownParagraph,
  MarkdownTable,
  MarkdownTableBody,
  MarkdownTableCell,
  MarkdownTableHead,
  MarkdownTableHeadRow,
  MarkdownTableRow,
  MarkdownUnorderedList,
} from "./styles";
import { ThemeColors } from "src/shared/themes";
import { setImageErrorSrc } from "./utils";

export const MARKDOWN_COMPONENTS:
  | Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>
  | undefined = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <AxonSyntaxHighlighter
        children={String(children).replace(/\n$/, "")}
        style={vs2015}
        language={match[1]}
        PreTag="div"
        showLineNumbers={true}
        lineNumberStyle={{
          color: ThemeColors.textDark,
          borderRight: `1px solid ${ThemeColors.border}`,
          paddingRight: "10px",
          marginRight: "10px",
        }}
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  h1: ({ node, ...props }) => <MarkdownHeading1 {...props} />,
  h2: ({ node, ...props }) => <MarkdownHeading2 {...props} />,
  h3: ({ node, ...props }) => <MarkdownHeading3 {...props} />,
  h4: ({ node, ...props }) => <MarkdownHeading4 {...props} />,
  h5: ({ node, ...props }) => <MarkdownHeading5 {...props} />,
  h6: ({ node, ...props }) => <MarkdownHeading6 {...props} />,
  p: ({ node, ...props }) => <MarkdownParagraph {...props} />,
  ul: ({ node, ...props }) => <MarkdownUnorderedList {...props} />,
  ol: ({ node, ...props }) => <MarkdownOrderedList {...props} />,
  li: ({ node, ...props }) => <MarkdownList {...props} />,
  img: ({ node, ...props }) => (
    <MarkdownImage>
      <img
        id="markdown-image-content"
        {...props}
        onError={() => setImageErrorSrc()}
      />
      <figcaption>{props.alt}</figcaption>
    </MarkdownImage>
  ),
  br: ({ node, ...props }) => <MarkdownLineBreak {...props} />,
  blockquote: ({ node, ...props }) => <MarkdownBlockQuote {...props} />,
  a: ({ node, ...props }) => <a {...props} target="_blank" />,
  table: ({ node, ...props }) => <MarkdownTable {...props} />,
  thead: ({ node, ...props }) => <MarkdownTableHead {...props} />,
  th: ({ node, ...props }) => <MarkdownTableHeadRow {...props} />,
  tr: ({ node, ...props }) => <MarkdownTableRow {...props} />,
  tbody: ({ node, ...props }) => <MarkdownTableBody {...props} />,
  td: ({ node, ...props }) => <MarkdownTableCell {...props} />,
  hr: ({ node, ...props }) => <MarkdownHorizontalRule {...props} />,
};
