import { Box, Button, Text, useTheme } from "@primer/react";
import { Stack } from "@primer/react/drafts";
import { useRef, useState } from "react";
import { PiUploadBold } from "react-icons/pi";

function FilePicker() {
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleButtonClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "120px",
        border: `1px dashed ${theme?.colors.border.default}`,
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack direction="vertical">
        <Button
          variant="primary"
          leadingVisual={PiUploadBold}
          onClick={handleButtonClick}
        >
          Upload
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {fileName && (
          <Text
            sx={{
              marginTop: "10px",
              color: theme?.colors.text.primary,
            }}
          >
            {fileName}
          </Text>
        )}
      </Stack>
    </Box>
  );
}

export default FilePicker;
