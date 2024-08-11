import { useState } from "react";
import { Box, SxProp, UnderlineNav } from "@primer/react";

interface ITabHeader {
  label: string;
  icon: React.ReactNode;
  counter?: string;
}

interface ITabProps {
  name: string;
  headers: ITabHeader[];
  content: React.ReactNode[];
  tabContainerStyle?: SxProp["sx"];
  tabHeaderStyle?: SxProp["sx"];
  tabBodyContainerStyle?: SxProp["sx"];
}

function Tabs({
  name,
  headers,
  content,
  tabContainerStyle,
  tabHeaderStyle,
  tabBodyContainerStyle,
}: ITabProps) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <UnderlineNav
        aria-label={name}
        sx={{
          ...tabContainerStyle,
        }}
      >
        {headers.map((header, index) => (
          <UnderlineNav.Item
            key={index}
            icon={() => header.icon}
            aria-current={index === activeTab ? "page" : undefined}
            onSelect={() => setActiveTab(index)}
            counter={header.counter}
            sx={{
              ...tabHeaderStyle,
            }}
          >
            {header.label}
          </UnderlineNav.Item>
        ))}
      </UnderlineNav>
      <Box
        sx={{
          ...tabBodyContainerStyle,
        }}
      >
        {content[activeTab]}
      </Box>
    </>
  );
}

export default Tabs;
