import React from "react";
import { Box, IconButton, useTheme } from "@primer/react";
import AppIcon from "../AppIcon";
import Drawer from "../Drawer";
import Nav from "../Nav";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { PageHeaderProps } from "./index.types";
import { SidebarTrigger } from "./SideBar";

function Header({ breadcrumb, menus }: PageHeaderProps) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  return (
    <header
      className="flex items-center justify-between pr-4 pl-2.5 h-12 bg-background shrink-0"
      style={{
        borderBottom: `1px solid ${theme?.colors.border.default}`,
      }}
    >
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "10%",
        }}
      >
        <Drawer trigger={<AppIcon />} content={<Nav />} />
      </Box> */}
      <SidebarTrigger className="-ml-1" />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton
              icon={() => <PiArrowLeft size={16} />}
              onClick={() => navigate(-1)}
              aria-label="Back"
              variant="invisible"
              sx={{
                flexShrink: 0,
              }}
            />
            <IconButton
              icon={() => <PiArrowRight size={16} />}
              onClick={() => navigate(1)}
              aria-label="Forward"
              variant="invisible"
              sx={{
                flexShrink: 0,
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {breadcrumb}
          </Box>
        </Box>
        <Box className="flex items-center gap-1">{menus}</Box>
      </Box>
    </header>
  );
}

export default Header;
