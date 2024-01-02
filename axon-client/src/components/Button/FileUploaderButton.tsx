import { FileUploaderButton as CarbonFileUploaderButton } from "@carbon/react";
import { CheckmarkOutline, Warning, CloudUpload } from "@carbon/icons-react";
import { StateColors, ThemeColors } from "src/shared/themes";
import styled from "styled-components";
import { InlineLoader } from "../Loader";
import IconButton from "./IconButton";

export const FileUploaderButtonWrapper = styled(CarbonFileUploaderButton)`
  background-color: transparent;
  font-size: 12px;
  height: 100%;
  width: 100%;
  color: ${(props: { hasFilename: boolean }) =>
    props.hasFilename ? StateColors.success : ThemeColors.textDark};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: none;
  border-radius: 4px;
  background-color: ${(props: { background: string }) => props.background};

  input {
    padding: "0px 8px 0px 8px";
  }
  :hover {
    color: ${ThemeColors.primary};
    background-color: ${(props: { background: string }) => props.background};
  }
`;

export const FileUploaderButton: React.FC<{
  labelText: string;
  accept: string[];
  multiple: boolean;
  disabled: boolean;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  status: "idle" | "pending" | "success" | "error";
}> = (props) => {
  const { labelText, accept, multiple, disabled, name, onChange, status } =
    props;
  return (
    <div
      style={{
        display: "flex",
        maxWidth: "100%",
        alignItems: "center",
        gap: "8px",
        width: "100%",
        height: "32px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {status === "success" && (
          <IconButton
            id={`node-file-upload-success`}
            name={"Success"}
            onClick={() => {}}
            disabled={false}
            width="32px"
            height="32px"
            background={ThemeColors.bgHighlight1}
            borderradius="4px"
            fill={StateColors.success}
            hoverfill={StateColors.success}
          >
            <CheckmarkOutline size={16} />
          </IconButton>
        )}
        {status === "error" && (
          <IconButton
            id={`node-file-upload-error`}
            name={"Error"}
            onClick={() => {}}
            disabled={false}
            width="32px"
            height="32px"
            background={ThemeColors.bgHighlight1}
            borderradius="4px"
            fill={StateColors.failed}
            hoverfill={StateColors.failed}
          >
            <Warning size={16} />
          </IconButton>
        )}
        {status === "idle" && (
          <IconButton
            id={`node-file-upload-idle`}
            name={"Idle"}
            onClick={() => {}}
            disabled={false}
            width="32px"
            height="32px"
            background={ThemeColors.bgHighlight1}
            borderradius="4px"
            fill={ThemeColors.textDark}
            hoverfill={ThemeColors.textDark}
          >
            <CloudUpload size={16} />
          </IconButton>
        )}
        {status === "pending" && (
          <IconButton
            id={`node-file-upload-pending`}
            name={"Pending"}
            onClick={() => {}}
            disabled={false}
            width="32px"
            height="32px"
            background={ThemeColors.bgHighlight1}
            borderradius="4px"
            fill={ThemeColors.textDark}
            hoverfill={ThemeColors.textDark}
          >
            <InlineLoader
              style={{
                height: "16px",
                width: "16px",
              }}
            />
          </IconButton>
        )}
      </div>
      <div
        style={{
          flexGrow: 1,
          flex: 1,
          overflow: "hidden",
        }}
      >
        <FileUploaderButtonWrapper
          labelText={labelText}
          buttonKind="ghost"
          style={{
            padding: "0px 8px 0px 8px",
            display: "flex",
            alignItems: "center",
          }}
          size="sm"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          name={name}
          onChange={onChange}
          background={ThemeColors.bgHighlight1}
        />
      </div>
    </div>
  );
};
