import React, { useEffect } from "react";
import {
  Tabs as CarbonTabs,
  Tab as CarbonTab,
  TabList as CarbonTabList,
  TabPanels,
  TabPanel,
} from "@carbon/react";
import IconButton from "src/components/Button/IconButton";
import { ThemeColors } from "src/shared/themes";
import { BiFullscreen } from "react-icons/bi";

interface ITabHeader {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

interface ITabProps {
  header: ITabHeader[];
  content: React.ReactNode[];
}

const Tabs: React.FC<{
  children: ITabProps;
}> = (props) => {
  const {
    children: { header, content },
  } = props;
  const [parentWidth, setParentWidth] = React.useState<number>(0);
  const [tabWidth, setTabWidth] = React.useState<number>(0);

  useEffect(() => {
    const parentWidth = document.getElementById(
      "node-content-container"
    )?.offsetWidth;
    setTabWidth(parentWidth!! / header.length);
    setParentWidth(parentWidth!!);
  }, []);

  return (
    <CarbonTabs>
      <CarbonTabList
        aria-label="List of tabs"
        activation="manual"
        fullWidth
        style={{
          outline: "none",
          border: "none",
          borderBlockEnd: "none",
          position: "fixed",
          background: ThemeColors.bgDark,
          width: parentWidth,
        }}
      >
        {header.map((tab, index) => (
          <CarbonTab
            key={index}
            label={tab.label}
            renderIcon={() => tab.icon}
            style={{
              outline: "none",
              fontSize: "12px",
              fontWeight: "bold",
              height: "40px",
              // width: tabWidth,
            }}
            onClick={tab.onClick}
          >
            {tab.label}
          </CarbonTab>
        ))}
      </CarbonTabList>
      <TabPanels>
        {content.map((tab, index) => (
          <TabPanel
            key={index}
            style={{
              padding: 0,
            }}
          >
            {tab}
          </TabPanel>
        ))}
      </TabPanels>
    </CarbonTabs>
  );
};

export default Tabs;
