import React from "react";
import IconButton from "../../Button/MenuButton";
import { CircleSolid } from "@carbon/icons-react";
import { useClickAway } from "@uidotdev/usehooks";
import { Headings } from "./BlockList";
import { IBlockProps } from "./interface";
import styled from "styled-components";
// import { TextInput, TextInputWithIcon } from "../../Input/TextInput";
import { useTheme } from "@primer/react";
import { themeGet } from "@primer/react";

const BlockSelector: React.FC<{
  action: any;
  toggleModal: any;
}> = (props) => {
  const { toggleModal } = props;

  const ref = useClickAway<HTMLDivElement>(() => {
    toggleModal(false);
  });

  const { theme } = useTheme();

  return (
    <div
      ref={ref}
      style={{
        width: "calc(100% - 40px)",
        // maxWidth: "540px",
        // height: "280px",
        left: "20px",
        // transform: "translateX(-50%)",
        backgroundColor: theme?.colors.bg.variant1,
        position: "absolute",
        // marginTop: "80px",
        top: 36,
        zIndex: 100,
        borderRadius: "8px",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          display: "flex",
          width: "100%",
          height: "48px",
          borderBottom: `1px dashed ${theme?.colors.border.default}`,
          alignItems: "center",
          paddingLeft: "16px",
          paddingRight: "16px",
          backgroundColor: theme?.colors.bg.variant1,
          gap: "16px",
        }}
      >
        {/* <TextInput
          labelText={""}
          id="code-file-name"
          placeholder="Find block element"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          autoSave="off"
          autoFocus={false}
          style={{
            backgroundColor: ThemeColors.bgHighlight1,
          }}
          // value={customColor}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
          icon={<></>}
        /> */}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px",
          gap: "24px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            // flexDirection: "column",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {Headings.map((block, index) => (
            <BlockSelectorItem
              key={index}
              icon={block.icon}
              description={block.description}
              label={block.label}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const BlockSelectorItemWrapper = styled.div`
  height: 48px;
  display: flex;
  gap: 16px;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  padding: 8px;
  :hover {
    background-color: ${themeGet("colors.border.default")};
  }
`;

const BlockSelectorItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}> = (props) => {
  const { icon, label, description, onClick } = props;
  const { theme } = useTheme();
  return (
    <BlockSelectorItemWrapper onClick={onClick}>
      <div>{icon}</div>
      <div>
        <h6
          style={{
            color: theme?.colors.text.gray,
          }}
        >
          {label}
        </h6>
        <small
          style={{
            color: theme?.colors.text.gray,
            fontSize: "10px",
          }}
        >
          {description}
        </small>
      </div>
    </BlockSelectorItemWrapper>
  );
};

export default BlockSelector;
