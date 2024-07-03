import { Box, Button, FormControl, TextInput } from "@primer/react";
import { CheckCircleFillIcon } from "@primer/octicons-react";
import {
  DialogBody,
  DialogContainer,
  DialogFooter,
  DialogHeader,
} from "src/components/Dialog";
import { Spinner } from "src/components/Loader/Spinner";
import { DialogProps } from "../Dialog/index.types";
import { Stack } from "@primer/react/experimental";
import { PiWarning } from "react-icons/pi";
import FilePicker from "../Common/FilePicker";

function NewDocument(dialogProps: DialogProps) {
  const { toggle, setToggle } = dialogProps;
  return (
    <DialogContainer
      isOpen={toggle}
      onDismiss={() => setToggle(false)}
      aria-labelledby="new folder dialog"
    >
      <DialogHeader id={"new-folder"} header={"New Document"} />
      <DialogBody>
        <Stack direction={"vertical"}>
          <FormControl>
            <FormControl.Caption
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <PiWarning /> Image PDFs are not supported
            </FormControl.Caption>
            <FilePicker />
          </FormControl>
        </Stack>
      </DialogBody>
    </DialogContainer>
  );
}

export default NewDocument;
