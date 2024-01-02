import * as CarbonIcons from "@carbon/icons-react"; // Import all icons from the library
import { Icon } from "@carbon/icons-react";
import { Warning } from "@carbon/icons-react";
import { ThemeColors } from "src/shared/themes";

function useCarbonIcons(iconName: string) {
  // Check if the requested icon exists in the imported icons
  if (iconName in CarbonIcons) {
    const IconComponent = CarbonIcons[iconName];

    // Return a wrapper component that renders the dynamically imported icon
    return function IconWrapper(props: typeof Icon) {
      return <IconComponent {...props} />;
    };
  } else {
    console.warn(`Icon "${iconName}" not found in Carbon Icons library.`);
    // Return a default icon or fallback component if desired
    return function DefaultIcon() {
      return <Warning size={16} fill={ThemeColors.border} />;
    };
  }
}

export default useCarbonIcons;
