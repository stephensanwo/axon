import { useState } from "react";
import { Box, UnderlineNav, useTheme } from "@primer/react";

interface ITabHeader {
  label: string;
  icon: React.ReactNode;
  counter?: string;
}

interface ITabProps {
  name: string;
  headers: ITabHeader[];
  content: React.ReactNode[];
}

function Tabs({ name, headers, content }: ITabProps) {
  const [activeTab, setActiveTab] = useState(0);
  const { theme } = useTheme();
  return (
    <>
      <UnderlineNav
        aria-label={name}
        sx={{
          position: "fixed",
          width: "100%",
          backgroundColor: theme?.colors.bg.default,
        }}
      >
        {headers.map((header, index) => (
          <UnderlineNav.Item
            key={index}
            icon={() => header.icon}
            aria-current={index === activeTab ? "page" : undefined}
            onSelect={() => setActiveTab(index)}
            counter={header.counter}
          >
            {header.label}
          </UnderlineNav.Item>
        ))}
      </UnderlineNav>
      <Box sx={{ marginTop: "48px", overflow: "scroll" }}>
        {content[activeTab]}
      </Box>
    </>
  );
}

export default Tabs;
