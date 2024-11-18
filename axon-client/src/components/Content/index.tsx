import ContentEmpty from "./ContentEmpty";
import { ContentMain } from "./ContentMain";
import ContentPreview from "./Preview";
import ContentListHeader from "./Header/ContentListHeader";
import ContentFolderListHeader from "./Header/ContentFolderListHeader";
import ContentList from "./List/ContentList";
import ContentNav from "./Nav";
import ContentPreviewButton from "./Preview/ContentPreviewButton";
import ContentPreviewOptions from "./Preview/ContentPreviewOptions";
import ContentView from "./View";
import ContentFolderList from "./List/ContentFolderList";
import { ContentFolderMain } from "./Main/ContentFolderMain";
import ContentFolderLeft from "./Left/ContentFolderLeft";
import ContentIndexMain from "./Main/ContentIndexMain";
import ContentListRight from "./Right/ContentListRight";
import ContentListFooter from "./Footer";

const Content = {
  Main: ContentMain,
  List: ContentList,
  FolderList: ContentFolderList,
  FolderMain: ContentFolderMain,
  IndexMain: ContentIndexMain,
  Empty: ContentEmpty,
  Nav: ContentNav,
  ContentListHeader: ContentListHeader,
  ContentFolderListHeader: ContentFolderListHeader,
  Preview: ContentPreview,
  View: ContentView,
  PreviewButton: ContentPreviewButton,
  PreviewOptions: ContentPreviewOptions,
  FolderLeft: ContentFolderLeft,
  ListRight: ContentListRight,
  ListFooter: ContentListFooter,
};

export default Content;
