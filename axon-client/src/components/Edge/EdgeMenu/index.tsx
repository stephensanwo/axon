import { useState } from "react";
import { PiTrashSimpleLight } from "react-icons/pi";
import { EdgeProps } from "reactflow";
import {
  Box,
  Checkbox,
  FormControl,
  Radio,
  Text,
  TextInput,
  ToggleSwitch,
  useTheme,
} from "@primer/react";
import { useEdgeEvents } from "src/hooks/edge/useEdgeEvents";
import MenuButton from "src/components/Button/MenuButton";
import { useNoteContext } from "src/hooks/notes/useNoteContext";
import { applyOpacity } from "src/utils/styles";

const EdgeMenu = (props: EdgeProps) => {
  const { animated, id, data, label, markerStart, markerEnd } = props;
  const { noteTheme } = useNoteContext();
  const {
    updateEdgeColor,
    updateEdgeAnimation,
    handleEdgeLabelContentChange,
    removeEdge,
    updateConnectionLineType,
    updateEdgeMarkers,
  } = useEdgeEvents({ ...props });
  const [edgeLabel, setEdgeLabel] = useState<string>(label as string);
  const { theme } = useTheme();
  const saveEdgeMenuChanges = () => {
    handleEdgeLabelContentChange(edgeLabel);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        marginBottom: "8px",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
      onBlur={() => saveEdgeMenuChanges()}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text fontWeight="bold">Edge Options</Text>
        <MenuButton
          id={"delete-edge"}
          name={"Delete Edge"}
          onClick={() => {
            removeEdge(id);
          }}
          width="24px"
          height="24px"
          hoverfill={theme?.colors.fg.default}
          backgroundHoverFill={theme?.colors.danger.default}
          background={theme?.colors.bg.variant2}
        >
          {<PiTrashSimpleLight size={16} />}
        </MenuButton>
      </Box>
      <Box>
        <FormControl>
          <FormControl.Label visuallyHidden>Label Text</FormControl.Label>
          <TextInput
            name="edge_label"
            placeholder="Label Text"
            sx={{
              backgroundColor: theme?.colors.bg.variant2,
              border: "none",
            }}
            block
            size="small"
            value={edgeLabel}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEdgeLabel(e.target.value)
            }
          />
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text fontSize={0}>Edge Animation</Text>
        <ToggleSwitch
          aria-labelledby="toggle edge animation"
          onClick={() => updateEdgeAnimation()}
          checked={animated}
          defaultChecked={animated}
          statusLabelPosition="end"
          size="small"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Text fontSize={0}>Arrows</Text>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
          }}
        >
          <FormControl>
            <Checkbox
              value="default"
              onChange={() => updateEdgeMarkers("start")}
              checked={markerStart === "url(#)" ? false : true}
            />
            <FormControl.Label>
              <Text
                sx={{
                  fontSize: 0,
                  fontWeight: 400,
                }}
              >
                Edge Start
              </Text>
            </FormControl.Label>
          </FormControl>
          <FormControl>
            <Checkbox
              value="default"
              onChange={() => updateEdgeMarkers("end")}
              checked={markerEnd === "url(#)" ? false : true}
            />
            <FormControl.Label>
              <Text
                sx={{
                  fontSize: 0,
                  fontWeight: 400,
                }}
              >
                Edge End
              </Text>
            </FormControl.Label>
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Text fontSize={0}>Connection Line Styles</Text>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
          }}
        >
          <FormControl>
            <Radio
              name="curveEdge"
              value={"curveEdge"}
              onChange={() => updateConnectionLineType("curveEdge")}
              checked={data.type === "curveEdge"}
              disabled={false}
            />
            <FormControl.Label>
              <Text
                sx={{
                  fontSize: 0,
                  fontWeight: 400,
                }}
              >
                Curve
              </Text>
            </FormControl.Label>
          </FormControl>
          <FormControl>
            <Radio
              name="straightEdge"
              value={"straightEdge"}
              onChange={() => updateConnectionLineType("straightEdge")}
              checked={data.type === "straightEdge"}
              disabled={false}
            />
            <FormControl.Label>
              <Text
                sx={{
                  fontSize: 0,
                  fontWeight: 400,
                }}
              >
                Straight
              </Text>
            </FormControl.Label>
          </FormControl>
          <FormControl>
            <Radio
              name="stepEdge"
              value={"stepEdge"}
              onChange={() => updateConnectionLineType("stepEdge")}
              checked={data.type === "stepEdge"}
              disabled={false}
            />
            <FormControl.Label>
              <Text
                sx={{
                  fontSize: 0,
                  fontWeight: 400,
                }}
              >
                Step
              </Text>
            </FormControl.Label>
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Text fontSize={0}>Edge & Label Color</Text>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              flex: 1,
              gap: 1,
            }}
          >
            {noteTheme.colors.map((color, index) => {
              return (
                <Box
                  name={color.label}
                  sx={{
                    backgroundColor: color.hex,
                    width: "18px",
                    height: "18px",
                    borderRadius: 0,
                    cursor: "pointer",
                    ":hover": {
                      backgroundColor: applyOpacity(color.hex, 0.8),
                    },
                  }}
                  onClick={() => updateEdgeColor(color.hex)}
                ></Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EdgeMenu;
