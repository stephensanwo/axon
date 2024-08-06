import { useState } from "react";
import {
  PagePanelDirections,
  PagePanels,
} from "src/components/Page/index.types";

export function usePage(): {
  panel: PagePanels;
  togglePanel: (
    direction: PagePanelDirections,
    action?: "open" | "close"
  ) => void;
} {
  const [panel, setPanel] = useState<PagePanels>({
    left: false,
    right: false,
  });

  function togglePanel(
    direction: PagePanelDirections,
    action?: "open" | "close"
  ) {
    if (action === "open") {
      setPanel((prevPanel) => ({
        ...prevPanel,
        [direction]: true,
      }));
    } else if (action === "close") {
      setPanel((prevPanel) => ({
        ...prevPanel,
        [direction]: false,
      }));
    } else {
      setPanel((prevPanel) => ({
        ...prevPanel,
        [direction]: !prevPanel[direction],
      }));
    }
  }
  return { panel, togglePanel };
}
