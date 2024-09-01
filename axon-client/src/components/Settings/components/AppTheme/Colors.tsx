import { useState } from "react";
import { Box, LabelGroup, Token, useTheme } from "@primer/react";
import { PiStarLight, PiStarFill } from "react-icons/pi";
import { useNoteContext } from "src/hooks/notes/useNoteContext";
import ColorPickerPanel from "src/components/Color/ColorPickerPanel";
import { InlineHeader } from "src/components/Common";

function Colors(): JSX.Element {
  const {
    defaultNodeTheme,
    setDefaultNodeStyles,
    defaultNodeStyles,
    setDefaultNodeTheme,
    noteTheme,
    setNoteTheme,
  } = useNoteContext();
  const [enableColorDelete, setEnableColorDelete] = useState<string>("");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box>
        <InlineHeader
          title="Colors"
          subtitle="(Select default color and create custom colors)"
        />
        {/* <ColorPickerPanel /> */}
      </Box>
      <Box>
        <InlineHeader subtitle="Select color token to make default or delete" />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          <LabelGroup visibleChildCount={6} overflowStyle="inline">
            {noteTheme?.colors.map((color, index) => (
              <Token
                key={index}
                text={color.label}
                onRemove={() => alert("remove me")}
                size="large"
                leadingVisual={() =>
                  defaultNodeTheme.color === color.hex ? (
                    <PiStarFill
                      size={14}
                      color={color.hex}
                      onClick={() => alert("default")}
                    />
                  ) : (
                    <PiStarLight
                      size={14}
                      color={color.hex}
                      onClick={() => {
                        setDefaultNodeTheme({
                          ...defaultNodeTheme,
                          color: color.hex,
                        });
                        setDefaultNodeStyles({
                          ...defaultNodeStyles,
                          background_color: color.hex,
                        });
                      }}
                    />
                  )
                }
                hideRemoveButton={enableColorDelete !== color.hex}
                onClick={() => setEnableColorDelete(color.hex)}
                onBlur={() => setEnableColorDelete("")}
                sx={{
                  cursor: "pointer",
                  border: `1px solid ${color.hex}`,
                  color: color.hex,
                  fontSize: 0,
                  fontWeight: "normal",
                }}
              />
            ))}
          </LabelGroup>
        </Box>
      </Box>
    </Box>
  );
}

export default Colors;
