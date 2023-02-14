import React from "react";
import { OverflowMenu, OverflowMenuItem } from "carbon-components-react";
import "./style.scss";
const OptionsMenu = () => {
  return (
    <OverflowMenu
      data-floating-menu-container
      selectorPrimaryFocus={".optionOne"}
      flipped={true}
      iconClass="menu-icon"
      className="menu-container"
      size="sm"
    >
      <OverflowMenuItem className="optionOne" itemText="Option 1" />
      <OverflowMenuItem
        className="optionTwo"
        itemText="Option 2 is an example of a really long string and how we recommend handling this"
        requireTitle
      />
      <OverflowMenuItem itemText="Option 3" />
      <OverflowMenuItem itemText="Option 4" hasDivider />
    </OverflowMenu>
  );
};

export default OptionsMenu;
