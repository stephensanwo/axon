import React, { Fragment } from "react";
import { OverflowMenu, OverflowMenuItem } from "carbon-components-react";
import styled from "styled-components";
import {
  Menu as StyledMenu,
  MenuItem,
  SubMenu,
  MenuHeader,
  MenuDivider,
  MenuButton as StyledMenuButton,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import {
  Settings16,
  OverflowMenuVertical16,
  ModelBuilder16,
  DirectionLoopLeft16,
  DirectionLoopRight16,
  Branch16,
} from "@carbon/icons-react";
import "./style.scss";
import { ColorPalette } from "../../shared/themes";

const ControlsContainer = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 20px;
`;

const Menu = styled(StyledMenu)`
  background-color: red;
`;

const MenuButton = styled(StyledMenuButton)`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const ColorPicker = styled.div`
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background-color: ${(props: { background: string }) => props.background};

  :hover {
    border: 3px solid #e8e8e8;
  }
`;

const ColorPaletteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;
const Controls = () => {
  return (
    <div>
      <Menu
        menuClassName={"overflow-menu-container"}
        menuButton={
          <MenuButton>
            <OverflowMenuVertical16 fill="#fff" />
            {/* <Settings16 fill="#fff" /> */}
            {/* Settings */}
          </MenuButton>
        }
        transition
      >
        <MenuHeader className={"overflow-menu-header"}>Connections</MenuHeader>
        <MenuDivider className={"overflow-menu-divider"} />
        <MenuItem className={"overflow-menu-item"}>
          Add New Node
          <DirectionLoopLeft16 fill="#1192e8" />
        </MenuItem>
        <MenuItem className={"overflow-menu-item"}>
          Add New Anchor
          <DirectionLoopRight16 fill="#1192e8" />
        </MenuItem>
        <MenuItem className={"overflow-menu-item"}>
          Add New Anchor
          <DirectionLoopRight16 fill="#1192e8" />
        </MenuItem>
        <MenuItem className={"overflow-menu-item"}>
          Add New Anchor
          <DirectionLoopRight16 fill="#1192e8" />
        </MenuItem>
        <MenuItem className={"overflow-menu-item"}>
          Add New Anchor
          <DirectionLoopRight16 fill="#1192e8" />
        </MenuItem>

        <MenuHeader className={"overflow-menu-header"}>
          Color Palette
        </MenuHeader>
        <MenuDivider className={"overflow-menu-divider"} />
        <MenuItem className={"overflow-menu-item"} style={{ height: "80px" }}>
          <ColorPaletteContainer>
            {ColorPalette.map((color) => (
              <MenuItem
                className={"overflow-menu-item"}
                key={color.id}
                style={{ padding: "0px", height: "16px" }}
              >
                <ColorPicker background={color.hex}></ColorPicker>
              </MenuItem>
            ))}
          </ColorPaletteContainer>
        </MenuItem>
        <MenuDivider className={"overflow-menu-divider"} />

        <MenuItem className={"overflow-menu-item"} style={{ color: "#fa4d56" }}>
          Delete Node
          <Fragment></Fragment>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Controls;
