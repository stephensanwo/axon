import { useContext } from "react";
import { ModalHeader, ModalBody, ComposedModal } from "@carbon/react";
import { Toggle } from "@carbon/react";
import { CircleSolid, TrashCan } from "@carbon/icons-react";
import EdgeContext from "src/context/edge";
import {
  EdgeMenuItem,
  EdgeMenuItemBodyGrid,
  EdgeMenuItemHeader,
} from "./styles";
import { ColorPalette, ThemeColors } from "src/shared/themes";
import IconButton from "src/components/Button/IconButton";
import { useEdgeEvents } from "src/hooks/edge/useEdgeEvents";
import { ModalFooter } from "@carbon/react";
import { AxonButton } from "src/components/Button";

const EdgeMenu = () => {
  const { edgeMenu, setEdgeMenu, selectedEdge } = useContext(EdgeContext);
  const { edge, updateEdgeColor, updateEdgeAnimation, removeEdgeOnClick } =
    useEdgeEvents();

  return (
    <ComposedModal
      size="xs"
      open={edgeMenu === "edge-options"}
      onClose={() => setEdgeMenu(() => null)}
      preventCloseOnClickOutside={true}
    >
      <ModalHeader
        title="Edge Options"
        label={`Edge ${selectedEdge?.data?.semantic_number!!}`}
      />
      <ModalBody
        style={{
          marginTop: "16px",
        }}
      >
        <EdgeMenuItem>
          <div
            style={{
              display: "flex",
              gap: "64px",
            }}
          >
            <Toggle
              size="sm"
              aria-label="toggle animation button"
              labelText="Edge Animation"
              labelA="Off"
              labelB="On"
              id="toggle-animation"
              onToggle={() => updateEdgeAnimation()}
              toggled={edge?.animated}
            />
          </div>
        </EdgeMenuItem>
        <EdgeMenuItem>
          <EdgeMenuItemHeader>
            <small>Edge Color</small>
          </EdgeMenuItemHeader>
          <EdgeMenuItemBodyGrid>
            {Object.values(ColorPalette).map((color, index) => {
              return (
                <IconButton
                  key={index}
                  id={`node-color-${color.label}`}
                  name={color.label}
                  onClick={(e: React.MouseEvent) => updateEdgeColor(color.hex)}
                  width="24px"
                  height="24px"
                  background={ThemeColors.bgHighlight2}
                  fill={color.hex}
                >
                  <CircleSolid
                    size={14}
                    style={{
                      margin: 0, // svg has an unknown margin
                    }}
                  />
                </IconButton>
              );
            })}
          </EdgeMenuItemBodyGrid>
        </EdgeMenuItem>
      </ModalBody>
      <ModalFooter>
        <div
          style={{
            width: "100%",
          }}
        >
          <AxonButton
            id="remove-edge"
            kind="secondary"
            renderIcon={() => <TrashCan size="16" />}
            iconDescription={"Remove Edge"}
            size="md"
            onClick={() => {
              removeEdgeOnClick(edge?.data?.semantic_number!!, edge?.id!!);
            }}
          >
            Remove Edge
          </AxonButton>
        </div>
      </ModalFooter>
    </ComposedModal>
  );
};

export default EdgeMenu;
