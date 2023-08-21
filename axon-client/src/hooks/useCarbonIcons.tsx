import React from "react";
import * as CarbonIcons from "@carbon/icons-react"; // Import all icons from the library

type IconProps = React.SVGProps<SVGSVGElement>;

function useCarbonIcons(iconName: string) {
  // Check if the requested icon exists in the imported icons
  if (iconName in CarbonIcons) {
    const IconComponent = CarbonIcons[iconName];

    // Return a wrapper component that renders the dynamically imported icon
    return function IconWrapper(props: IconProps) {
      return <IconComponent {...props} />;
    };
  } else {
    console.warn(`Icon "${iconName}" not found in Carbon Icons library.`);
    // Return a default icon or fallback component if desired
    return function DefaultIcon(props: IconProps) {
      return <div>Icon not found</div>;
    };
  }
}

export default useCarbonIcons;
