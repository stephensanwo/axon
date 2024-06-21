import { Header } from "@primer/react";
import { useHeaderContext } from "./HeaderContext";

function HeaderIcon() {
  const { headerIcon, togglePanel } = useHeaderContext();
  return (
    <Header.Item onClick={() => togglePanel("left")}>{headerIcon}</Header.Item>
  );
}

export default HeaderIcon;
