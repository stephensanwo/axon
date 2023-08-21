import { HeaderMenuProps } from "src/components/PageHeader";
import {
  Settings,
  Share,
  ColorPalette as ColorPaletteIcon,
  NotebookReference,
  SubtractAlt,
  TextSmallCaps,
  CharacterUpperCase,
  FaceSatisfied,
  CharacterSentenceCase,
} from "@carbon/icons-react";
import { useContext } from "react";
import NoteContext from "src/context/notes";
import AppContext from "src/context/app";

export const usePageActions = (): HeaderMenuProps[] => {
  const {
    note,
    noteDispatch,
    selectedNode,
    setSelectedNode,
    setNodePanel,
    nodePanel,
  } = useContext(NoteContext);
  const { defaultNodeTheme } = useContext(AppContext);

  const toggleMarkdown = () => {
    setNodePanel({
      ...nodePanel,
      toogle: true,
      markdown: true,
      styles: false,
      settings: false,
    });
  };

  const toggleStyles = () => {
    setNodePanel({
      ...nodePanel,
      toogle: true,
      markdown: false,
      styles: true,
      settings: false,
    });
  };

  const toggleSettings = () => {
    setNodePanel({
      ...nodePanel,
      toogle: true,
      markdown: false,
      styles: false,
      settings: true,
    });
  };

  const pageActions: HeaderMenuProps[] = [
    {
      menuText: "Add Text Box",
      menuIcon: <TextSmallCaps size={16} />,
      menuOptions: [],
      action: () => {
        note &&
          noteDispatch({
            type: "ADD_NODE",
            payload: {
              node_type: "input-node",
              default_theme: defaultNodeTheme,
            },
          });
      },
    },
    {
      menuText: "Add Title",
      menuIcon: <CharacterUpperCase size={20} />,
      menuOptions: [],
      action: () => {
        note &&
          noteDispatch({
            type: "ADD_NODE",
            payload: {
              node_type: "title-node",
              default_theme: defaultNodeTheme,
            },
          });
      },
    },
    {
      menuText: "Add Text",
      menuIcon: <CharacterSentenceCase size={20} />,
      menuOptions: [],
      action: () => {
        note &&
          noteDispatch({
            type: "ADD_NODE",
            payload: {
              node_type: "text-node",
              default_theme: defaultNodeTheme,
            },
          });
      },
    },
    {
      menuText: "Add Icon",
      menuIcon: <FaceSatisfied size={16} />,
      menuOptions: [],
      action: () => {
        note &&
          noteDispatch({
            type: "ADD_NODE",
            payload: {
              node_type: "icon-node",
              default_theme: defaultNodeTheme,
            },
          });
      },
    },
    {
      menuText: "Remove Node",
      menuIcon: <SubtractAlt size={16} />,
      menuOptions: [],
    },

    {
      menuText: "Node Styles",
      menuIcon: <ColorPaletteIcon size={16} />,
      menuOptions: [],
      action: toggleStyles,
    },
    {
      menuText: "Markdown Content",
      menuIcon: <NotebookReference size={16} />,
      menuOptions: [],
      action: toggleMarkdown,
    },
    {
      menuText: "Publish Note",
      menuIcon: <Share size={16} />,
      menuOptions: [],
    },
    {
      menuText: "Settings",
      menuIcon: <Settings size={16} />,
      menuOptions: [],
      action: toggleSettings,
    },
  ];

  return pageActions;
};
