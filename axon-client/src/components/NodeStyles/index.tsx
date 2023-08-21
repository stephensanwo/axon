import React, { Fragment, useContext, useRef, useState } from "react";
import styled from "styled-components";
import { SidePanelOpen } from "@carbon/icons-react";
import { INode } from "src/types/notes";
import { useContextMenu } from "@carbon/react";
import { ColorPalette, ThemeColors } from "src/shared/themes";
import NoteContext from "src/context/notes";
import { IconButton } from "@carbon/react";
import { CarbonIcons, CommomCarbonIcons } from "src/assets/carbon_icons";
import RenderIcon from "../EditableLabels/RenderIcon";
import { Search } from "@carbon/react";
import { Menu, MenuItem, MenuItemDivider } from "@carbon/react";
import AppContext from "src/context/app";

const NodeStylesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
`;

const NoteStyleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #393939;
  height: 30px;
  padding-left: 10px;
  padding-right: 10px;
  position: absolute;
  width: 100%;
  background-color: ${ThemeColors.bgDark};
`;

const HeaderIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NodeStyleContent = styled.div`
  flex: 1;
  padding: 16px;
  margin-top: 30px;
`;

const NodeStyleContentHeader = styled.h6`
  margin-bottom: 16px;
  color: ${ThemeColors.textDark};
`;

const NodeStyleColorContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 32px;
`;

const NodeIconContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 32px;
`;

const NodeBackground = styled.div`
  background-color: ${(props: { color: string }) => props.color};
  width: 32px;
  height: 32px;
  border-radius: 15%;
  cursor: pointer;
  box-shadow: ${(props: { active: boolean }) =>
    props.active && `0 0 0 3px ${ThemeColors.white}`};
  border: ${(props: { color: string }) =>
    props.color === "transparent" && `2px solid ${ThemeColors.white}`};

  :hover {
    box-shadow: 0 0 0 3px ${ThemeColors.white};
  }
`;

const NodeBorder = styled.div`
  background-color: transparent;
  border: ${(props: { color: string }) => `2px solid ${props.color}`};
  width: 32px;
  height: 32px;
  border-radius: 15%;
  cursor: pointer;
  box-shadow: ${(props: { active: boolean }) =>
    props.active && `0 0 0 3px ${ThemeColors.white}`};

  :hover {
    box-shadow: 0 0 0 3px ${ThemeColors.white};
  }
`;

interface NodeStylesProps {
  header: string;
  content: INode;
  toggleClose: () => void;
}

const NodeStyles: React.FC<NodeStylesProps> = (props) => {
  const { noteDispatch, selectedNode } = useContext(NoteContext);
  const [iconSearchResult, setIconSearchResult] = useState<string>();
  const [icons, setIcons] = useState<string[]>(CommomCarbonIcons);
  const { defaultNodeTheme } = useContext(AppContext);

  const updateNodeIcon = (iconName?: string) => {
    noteDispatch({
      type: "UPDATE_NODE",
      payload: {
        node_id: props.content?.data.id,
        updated_fields: {
          icon: iconName,
        },
      },
    });
  };

  const updateNodeStyle = (styleObject: {
    node_background_color: string;
    node_border_color: string;
    font_color: string;
  }) => {
    const { node_background_color, node_border_color, font_color } =
      styleObject;

    noteDispatch({
      type: "UPDATE_NODE",
      payload: {
        node_id: props.content.id,
        updated_fields: {
          node_styles: {
            node_background_color: node_background_color,
            node_border_color: node_border_color,
            font_color: font_color,
          },
        },
      },
    });
  };

  const findIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setIconSearchResult(searchTerm);

    const formattedSearchTerm =
      searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase();

    const filteredIcons = CarbonIcons.filter((icon) =>
      icon.toLowerCase().includes(formattedSearchTerm.toLowerCase())
    );

    setIcons(
      searchTerm.length > 0 ? filteredIcons.slice(0, 50) : CommomCarbonIcons
    );
  };

  return (
    <NodeStylesContainer>
      <NoteStyleHeader>
        <div></div>
        <small>{props.header}</small>
        <HeaderIcons>
          <IconButton
            size="md"
            focusTrap={false}
            iconDescription={"Close"}
            key={1}
            ariaLabel="Close"
            onClick={props.toggleClose}
            disabled={false}
            kind="secondary"
            style={{
              width: "24px",
              height: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 0,
            }}
          >
            <SidePanelOpen size="16" style={{ cursor: "pointer" }} />
          </IconButton>
        </HeaderIcons>
      </NoteStyleHeader>

      {selectedNode.id && (
        <NodeStyleContent>
          <NodeStyleContentHeader>Default Theme</NodeStyleContentHeader>
          <NodeStyleColorContainer>
            {defaultNodeTheme.node_background_color && (
              <NodeBackground
                color={defaultNodeTheme.node_background_color}
              ></NodeBackground>
            )}
            {defaultNodeTheme.node_border_color && (
              <NodeBorder
                color={defaultNodeTheme.node_border_color}
              ></NodeBorder>
            )}
          </NodeStyleColorContainer>

          <NodeStyleContentHeader>Background</NodeStyleContentHeader>
          <NodeStyleColorContainer>
            {Object.values(ColorPalette).map((color, index) => {
              return (
                <NodeBackgroundItem
                  key={index}
                  color={color.hex}
                  onClick={updateNodeStyle}
                ></NodeBackgroundItem>
              );
            })}
          </NodeStyleColorContainer>
          <NodeStyleContentHeader>Border</NodeStyleContentHeader>
          <NodeStyleColorContainer>
            {Object.values(ColorPalette).map((color, index) => {
              return (
                <NodeBorderItem
                  color={color.hex}
                  onClick={updateNodeStyle}
                ></NodeBorderItem>
              );
            })}
          </NodeStyleColorContainer>
          {selectedNode.data.category === "icon-node" && (
            <Fragment>
              <NodeStyleContentHeader>Icons</NodeStyleContentHeader>
              <div
                style={{
                  marginBottom: "32px",
                }}
              >
                <Search
                  id="search-1"
                  labelText={""}
                  placeholdertext="Find Icon"
                  size="sm"
                  value={iconSearchResult}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    findIcon(e)
                  }
                />
              </div>
              <NodeIconContainer>
                {icons.map((icon) => (
                  <RenderIcon
                    iconName={icon}
                    width={24}
                    height={24}
                    onClick={updateNodeIcon}
                  />
                ))}
              </NodeIconContainer>
            </Fragment>
          )}
        </NodeStyleContent>
      )}
      <NodeStyleContent
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!selectedNode.id && <small> Select a node to change style</small>}
      </NodeStyleContent>
    </NodeStylesContainer>
  );
};

const NodeBackgroundItem = (props: { color: string; onClick: any }) => {
  const el = useRef(null);
  const menuProps = useContextMenu(el);
  const { defaultNodeTheme, setDefaultNodeTheme } = useContext(AppContext);

  return (
    <Fragment>
      <NodeBackground
        color={props.color}
        onClick={() => {
          props.onClick({
            node_background_color: props.color,
            node_border_color: "",
            font_color: ThemeColors.textBlack,
          });
        }}
        ref={el}
      ></NodeBackground>
      <Menu {...menuProps} label={"Background Options"}>
        <div
          style={{
            padding: "4px",
            paddingLeft: "16px",
          }}
        >
          <p>Background Options</p>
        </div>
        <MenuItemDivider />
        <MenuItem
          label="Set as default"
          onClick={() =>
            setDefaultNodeTheme({
              ...defaultNodeTheme,
              node_background_color: props.color,
              node_border_color: "",
              font_color: ThemeColors.textBlack,
            })
          }
        />
      </Menu>
    </Fragment>
  );
};

const NodeBorderItem = (props: { color: string; onClick: any }) => {
  const el = useRef(null);
  const menuProps = useContextMenu(el);
  const { defaultNodeTheme, setDefaultNodeTheme } = useContext(AppContext);

  return (
    <Fragment>
      <NodeBorder
        color={props.color}
        onClick={() => {
          props.onClick({
            node_border_color: props.color,
            node_background_color: "",
            font_color: props.color,
          });
        }}
        ref={el}
      ></NodeBorder>
      <Menu {...menuProps} label={"Border Options"}>
        <div
          style={{
            padding: "4px",
            paddingLeft: "16px",
          }}
        >
          <p>Border Options</p>
        </div>
        <MenuItemDivider />
        <MenuItem
          label="Set as default"
          onClick={() =>
            setDefaultNodeTheme({
              ...defaultNodeTheme,
              node_background_color: "",
              node_border_color: props.color,
              font_color: props.color,
            })
          }
        />
      </Menu>
    </Fragment>
  );
};

export default NodeStyles;
