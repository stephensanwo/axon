import { ActionList, Text, useTheme } from "@primer/react";
import { CiShare1 } from "react-icons/ci";
import SharedNotesHeader from "./SharedNotesHeader";

function SharedNotes() {
  const { theme } = useTheme();

  return (
    <ActionList
      sx={{
        padding: 0,
        margin: 0,
        width: "100%",
      }}
    >
      <SharedNotesHeader />
      <ActionList.Item
        sx={{
          margin: 0,
          width: "100%",
          display: "flex",
        }}
        onClick={() => {}}
      >
        <ActionList.LeadingVisual>
          <CiShare1 fill={theme?.colors.text.primary} />
        </ActionList.LeadingVisual>
        <Text
          sx={{
            fontSize: 0,
            color: theme?.colors.text.gray,
          }}
        >
          {"Python Developer Roadmap 2021"}
        </Text>
      </ActionList.Item>
      <ActionList.Item
        sx={{
          margin: 0,
          width: "100%",
        }}
        onClick={() => {}}
      >
        <ActionList.LeadingVisual>
          <CiShare1 fill={theme?.colors.text.primary} />
        </ActionList.LeadingVisual>
        <Text
          sx={{
            fontSize: 0,
            color: theme?.colors.text.gray,
          }}
        >
          {"Rust Developer Roadmap 2021"}
        </Text>
      </ActionList.Item>
    </ActionList>
  );
}

export default SharedNotes;
