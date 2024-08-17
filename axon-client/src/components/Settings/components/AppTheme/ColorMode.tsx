import { Box, FormControl, Radio, Text, useTheme } from "@primer/react";
import { InlineHeader } from "src/components/Common";

function ColorMode() {
  return (
    <Box>
      <InlineHeader title="Fonts" subtitle="(Select default color mode)" />
      <Box
        sx={{
          display: "flex",
          gap: 4,
        }}
      >
        <FormControl>
          <Radio
            name="Dark Theme"
            value={"Dark Theme"}
            onChange={() => {}}
            checked={false}
            disabled={false}
          />
          <FormControl.Label>
            <Text
              sx={{
                fontSize: 0,
                fontWeight: 400,
              }}
            >
              Dark Theme
            </Text>
          </FormControl.Label>
        </FormControl>
        <FormControl>
          <Radio
            name="Light Theme"
            value={"Light Theme"}
            onChange={() => {}}
            checked={false}
            disabled={false}
          />
          <FormControl.Label>
            <Text
              sx={{
                fontSize: 0,
                fontWeight: 400,
              }}
            >
              Light Theme
            </Text>
          </FormControl.Label>
        </FormControl>
      </Box>
    </Box>
  );
}

export default ColorMode;
