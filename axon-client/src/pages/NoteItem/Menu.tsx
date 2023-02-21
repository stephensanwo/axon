import PageHeader from "../../components/PageHeader";
import {
  AddAlt,
  Edit,
  Information,
  ColorPalette,
  TrashCan,
  Share,
} from "@carbon/icons-react";

export const HeaderMenu = [
  {
    menuText: "Add Node",
    menuIcon: <AddAlt size={16} />,
    menuOptions: [
      {
        text: "Create new node",
        className: "create-new-node",
        isDisabled: false,
        isDelete: false,
      },
      {
        text: "Import from marketplace",
        className: "marketplace-import",
        isDisabled: false,
        isDelete: false,
      },
      {
        text: "Import custom node",
        className: "custom-import",
        isDisabled: false,
        isDelete: false,
      },
    ],
  },
  {
    menuText: "Edit Note",
    menuIcon: <Edit size={16} />,
    menuOptions: [
      {
        text: "Create new node",
        className: "create-new-node",
        isDisabled: false,
        isDelete: false,
      },
      {
        text: "Import from marketplace",
        className: "marketplace-import",
        isDisabled: false,
        isDelete: false,
      },
      {
        text: "Import custom node",
        className: "custom-import",
        isDisabled: false,
        isDelete: false,
      },
    ],
  },
  {
    menuText: "Delete Note",
    menuIcon: <TrashCan size={16} />,
    menuOptions: [
      {
        text: "Create new node",
        className: "create-new-node",
        isDisabled: false,
        isDelete: false,
      },
      {
        text: "Import from marketplace",
        className: "marketplace-import",
        isDisabled: false,
        isDelete: false,
      },
      {
        text: "Import custom node",
        className: "custom-import",
        isDisabled: false,
        isDelete: false,
      },
    ],
  },
  {
    menuText: "Node Styles",
    menuIcon: <ColorPalette size={16} />,
    menuOptions: [
      {
        text: "Create new node",
        className: "create-new-node",
        isDisabled: false,
        isDelete: false,
      },
      {
        text: "Import from marketplace",
        className: "marketplace-import",
        isDisabled: false,
        isDelete: false,
      },
      {
        text: "Import custom node",
        className: "custom-import",
        isDisabled: false,
        isDelete: false,
      },
    ],
  },
  {
    menuText: "Publish Note",
    menuIcon: <Share size={16} />,
    menuOptions: [
      {
        text: "Create new node",
        className: "create-new-node",
        isDisabled: false,
        isDelete: false,
      },
      {
        text: "Import from marketplace",
        className: "marketplace-import",
        isDisabled: false,
        isDelete: false,
      },
      {
        text: "Import custom node",
        className: "custom-import",
        isDisabled: false,
        isDelete: false,
      },
    ],
  },
  {
    menuText: "Note Information",
    menuIcon: <Information size={16} />,
    menuOptions: [
      {
        text: "Create new node",
        className: "create-new-node",
        isDisabled: false,
        isDelete: false,
      },
      {
        text: "Import from marketplace",
        className: "marketplace-import",
        isDisabled: false,
        isDelete: false,
      },
      {
        text: "Import custom node",
        className: "custom-import",
        isDisabled: false,
        isDelete: false,
      },
    ],
  },
];
