import {
  PiTextHOneFill,
  PiTextHTwoFill,
  PiTextHThreeFill,
  PiTextHFourFill,
  PiTextHFiveFill,
  PiTextHSixFill,
  PiParagraphFill,
  PiCode,
  PiListDashesBold,
  PiListNumbersFill,
  PiQuotesFill,
  PiLinkBold,
} from "react-icons/pi";
import { HEADING_LEVELS, IBlockProps } from "./interface";
import { ThemeColors } from "src/shared/themes";

export const Headings: IBlockProps<HEADING_LEVELS>[] = [
  {
    id: "heading1",
    variant: "h1",
    label: "Heading 1",
    icon: <PiTextHOneFill size={24} fill={ThemeColors.textDark} />,
    description: "XLarge section header",
  },
  {
    id: "heading4",
    variant: "h4",
    label: "Heading 4",
    icon: <PiTextHFourFill size={24} fill={ThemeColors.textDark} />,
    description: "Small section header",
  },
  {
    id: "heading2",
    variant: "h2",
    label: "Heading 2",
    icon: <PiTextHTwoFill size={24} fill={ThemeColors.textDark} />,
    description: "Large section header",
  },
  {
    id: "heading3",
    variant: "h3",
    label: "Heading 3",
    icon: <PiTextHThreeFill size={24} fill={ThemeColors.textDark} />,
    description: "Small section header",
  },
  {
    id: "heading5",
    variant: "h5",
    label: "Heading 5",
    icon: <PiTextHFiveFill size={24} fill={ThemeColors.textDark} />,
    description: "XSmall section header",
  },
  {
    id: "heading6",
    variant: "h6",
    label: "Heading 6",
    icon: <PiTextHSixFill size={24} fill={ThemeColors.textDark} />,
    description: "XXSmall section header",
  },
];
