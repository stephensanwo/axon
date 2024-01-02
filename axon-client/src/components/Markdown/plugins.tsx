import { PluggableList } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkBreaks from "remark-breaks";
import rehypeVideo from "rehype-video";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";

export const REMARK_MARKDOWN_PLUGINS: PluggableList | undefined = [
  remarkGfm,
  remarkToc,
  remarkBreaks,
];

export const REHYPE_MARKDOWN_PLUGINS: PluggableList | undefined = [
  rehypeAutolinkHeadings,
  rehypeSlug,
  rehypeRaw,
];
