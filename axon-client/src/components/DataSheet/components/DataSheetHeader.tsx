import { Box, useTheme } from "@primer/react";
import { startCase } from "lodash";
import { PiTable } from "react-icons/pi";
import { formatDateToRelativeTime } from "src/common/date";
import { TableData } from "src/domain/content/content.entity";
import { EditStateProps } from "../index.types";
import { Text } from "src/components/Common/Text";
import { useEffect, useState } from "react";

function DataSheetHeader({
  table,
  editState,
}: {
  table: TableData;
  editState: EditStateProps;
}) {
  const { theme } = useTheme();

  const [relativeTime, setRelativeTime] = useState(
    formatDateToRelativeTime(editState.lastTyped)
  );

  useEffect(() => {
    // Immediately update the relative time when `lastTyped` changes
    setRelativeTime(formatDateToRelativeTime(editState.lastTyped));

    // Set up the interval to keep updating every 5 seconds
    const interval = setInterval(() => {
      setRelativeTime(formatDateToRelativeTime(editState.lastTyped));
    }, 5000);

    // Clear the interval when the component unmounts or when `lastTyped` changes
    return () => clearInterval(interval);
  }, [editState.lastTyped]); // Re-run effect when `lastTyped` changes

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <PiTable size={14} fill={theme?.colors.text.gray} />
        <Text.SmallSecondary>
          {startCase(table.content_type)}
        </Text.SmallSecondary>
        <Text.SmallSecondary> | </Text.SmallSecondary>
        <Text.SmallSecondary>Saved {relativeTime}</Text.SmallSecondary>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* <Text.SmallSecondary>
          Auto Save • {isTyping.typing ? "Editing" : "Saved"}
        </Text.SmallSecondary> */}
      </Box>
    </Box>
  );
}

export default DataSheetHeader;
