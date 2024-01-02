import React from "react";
import IconButton from "./IconButton";
import { ThemeColors } from "src/shared/themes";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";

const IconDropdownButton: React.FC<{
  id: string;
  name: string;
  toggleState: boolean;
  setToggleState: React.Dispatch<any>;
  currentIcon: React.ReactNode;
}> = (props) => {
  const { id, name, toggleState, setToggleState, currentIcon } = props;
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: ThemeColors.bgHighlight1,
        borderRadius: "8px",
      }}
    >
      <IconButton
        id={id}
        name={name}
        selected={false}
        disabled={true}
        width="24px"
        height="24px"
        onClick={() => {}}
        background="transparent"
        fill={ThemeColors.textDark}
        hoverfill={ThemeColors.primary}
        style={{
          borderTopRightRadius: "0px",
          borderBottomRightRadius: "0px",
          cursor: "pointer",
        }}
      >
        {currentIcon}
      </IconButton>
      <IconButton
        id={`${id}-toggle`}
        name={`${name} Toggle`}
        selected={false}
        width="24px"
        height="24px"
        onClick={setToggleState}
        background="transparent"
        fill={ThemeColors.textDark}
        hoverfill={ThemeColors.primary}
        style={{
          borderTopLeftRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
      >
        {toggleState ? <RxChevronUp size={16} /> : <RxChevronDown size={16} />}
      </IconButton>
    </div>
  );
};

export default IconDropdownButton;
