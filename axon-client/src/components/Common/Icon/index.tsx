import {
  PiAppWindow,
  PiAppWindowFill,
  PiArchiveFill,
  PiCheckCircle,
  PiDotsThree,
  PiFile,
  PiFolder,
} from "react-icons/pi";

const Icon = {
  DocumentFile: PiFile,
  DocumentFolder: PiFolder,
  Project: PiArchiveFill,
  BoardAlt: PiAppWindow,
  Board: PiAppWindowFill,
  DotMenu: PiDotsThree,
  CircleCheck: PiCheckCircle,
} satisfies Record<string, React.ElementType>;

export default Icon;
