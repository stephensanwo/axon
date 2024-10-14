import { Box } from "@primer/react";
import { Text } from "../../Common/Text";
import { BaseContentProps } from "../index.types";
import CreateContent from "../Form/CreateContent";
import SelectContentOptions from "../Form/SelectContentOptions";

function ContentListHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
} & BaseContentProps) {
  return (
    <>
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Text.Heading4>{title}</Text.Heading4>
          <Text.Small>{subtitle}</Text.Small>
        </Box>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <SelectContentOptions />
          <CreateContent />
        </Box>
      </Box>
    </>
  );
}

export default ContentListHeader;
