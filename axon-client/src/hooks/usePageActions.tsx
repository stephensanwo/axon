import { HeaderMenuProps } from "src/components/PageHeader";
import { AddAlt, Share } from "@carbon/icons-react";
import { useContext } from "react";
import NoteContext from "src/context/notes";
import { ColorPalette } from "src/shared/themes";

export const usePageActions = (): HeaderMenuProps[] => {
  const { note, noteDispatch } = useContext(NoteContext);
  console.log("note", note);
  const pageActions: HeaderMenuProps[] = [
    {
      menuText: "Add Node",
      menuIcon: <AddAlt size={16} />,
      menuOptions: [
        {
          text: (
            <div
              style={{
                display: "flex",
                gap: "20px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "20px",
                  backgroundColor: ColorPalette["green-1"].hex,
                }}
              ></div>
              <>Default Node</>
            </div>
          ),
          className: "create-new-node",
          isDisabled: false,
          isDelete: false,
          action: () => {
            note &&
              noteDispatch({
                type: "ADD_NODE",
                payload: {
                  node_type: "input-node",
                  node_data: note,
                },
              });
          },
        },
        {
          text: "Connector",
          className: "marketplace-import",
          isDisabled: false,
          isDelete: false,
          action: () => {
            note &&
              noteDispatch({
                type: "ADD_NODE",
                payload: {
                  node_type: "anchor-node",
                  node_data: note,
                },
              });
          },
        },
      ],
    },
    {
      menuText: "Publish Note",
      menuIcon: <Share size={16} />,
      menuOptions: [],
      //   action: () =>
      //     setNoteModal({
      //       ...noteModal,
      //       publish: true,
      //     }),
    },
  ];

  return pageActions;
};
