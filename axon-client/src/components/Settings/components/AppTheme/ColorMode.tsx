import { Box, FormControl, Radio, Text } from "@primer/react";
import { InlineHeader } from "src/components/Common";

function ColorMode() {
  return (
    <Box>
      <InlineHeader
        title="Color Mode"
        subtitle="(Select default application color mode)"
      />
      <Box
        sx={{
          display: "flex",
          gap: 4,
        }}
      >
        <FormControl>
          <Radio
            name="Dark Mode"
            value={"Dark Mode"}
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
              Dark Mode
            </Text>
          </FormControl.Label>
        </FormControl>
        <FormControl>
          <Radio
            name="Light Mode"
            value={"Light Mode"}
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
              Light Mode
            </Text>
          </FormControl.Label>
        </FormControl>
      </Box>
    </Box>
  );
}

export default ColorMode;
