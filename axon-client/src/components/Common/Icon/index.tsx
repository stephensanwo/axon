import {
  PiAppWindow,
  PiAppWindowFill,
  PiArchiveFill,
  PiFile,
  PiFolder,
} from "react-icons/pi";

const Icon = {
  DocumentFile: PiFile,
  DocumentFolder: PiFolder,
  Project: PiArchiveFill,
  AddBoard: PiAppWindow,
  Board: PiAppWindowFill,
} satisfies Record<string, React.ElementType>;

export default Icon;
