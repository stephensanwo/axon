import ContentEmpty from "./ContentEmpty";
import ContentFooter from "./ContentFooter";
import { ContentMain } from "./ContentMain";
import ContentPreview from "./Preview";
import ContentListHeader from "./Header/ContentListHeader";
import ContentList from "./List/ContentList";
import ContentNav from "./Nav";
import ContentPreviewButton from "./Preview/ContentPreviewButton";
import ContentPreviewOptions from "./Preview/ContentPreviewOptions";
import ContentView from "./View";

const Content = {
  Main: ContentMain,
  List: ContentList,
  Empty: ContentEmpty,
  Nav: ContentNav,
  Footer: ContentFooter,
  ContentListHeader: ContentListHeader,
  Preview: ContentPreview,
  View: ContentView,
  PreviewButton: ContentPreviewButton,
  PreviewOptions: ContentPreviewOptions,
};

export default Content;
