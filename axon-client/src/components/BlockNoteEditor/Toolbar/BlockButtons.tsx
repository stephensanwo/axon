import React from "react";
import IconButton from "../../Button/MenuButton";
import { ThemeColors } from "src/shared/themes";
import { Add } from "@carbon/icons-react";
import { Draggable } from "@carbon/icons-react";

const BlockButtons: React.FC<{
  isActiveButton: boolean;
  toggleSelector: React.Dispatch<boolean>;
}> = (props) => {
  const { isActiveButton, toggleSelector } = props;
  return (
    <>
      {isActiveButton ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "8px",
            marginRight: "8px",
          }}
        >
          <IconButton
            id={`test`}
            name={""}
            onClick={() => toggleSelector(true)}
            width="24px"
            height="24px"
            background="transparent"
            fill={ThemeColors.textDark}
          >
            <Add size={18} />
          </IconButton>
          <IconButton
            id={`test`}
            name={""}
            onClick={() => {}}
            width="24px"
            height="24px"
            background="transparent"
            fill={ThemeColors.textDark}
          >
            <Draggable size={18} />
          </IconButton>
        </div>
      ) : (
        <div
          style={{
            width: "48px",
            height: "24px",
            marginLeft: "8px",
            marginRight: "8px",
          }}
        ></div>
      )}
    </>
  );
};

export default BlockButtons;
