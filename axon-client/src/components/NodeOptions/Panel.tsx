import { NodeOptionsProps } from "src/context/board/board.types";
import { NodeOptionsComponents } from "src/context/board/board.types";
import Formatting from "./Formatting";
export type PanelRouterProps = {
  [key in NodeOptionsComponents]: React.ReactNode;
};

function Panel({ nodeOptions }: { nodeOptions: NodeOptionsProps }) {
  const { component } = nodeOptions;

  const PanelRouter: PanelRouterProps = {
    formatting: <Formatting />,
  };

  return <>{PanelRouter[component]}</>;
}

export default Panel;
