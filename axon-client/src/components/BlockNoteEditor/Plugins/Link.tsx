import { LinkPlugin as LexicalLinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { validateUrl } from "src/utils/url";

export default function LinkPlugin(): JSX.Element {
  return <LexicalLinkPlugin validateUrl={validateUrl} />;
}
