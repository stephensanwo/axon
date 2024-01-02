import React from "react";
import IconButton from "../../Button/IconButton";
import { CircleSolid } from "@carbon/icons-react";
import { ThemeColors } from "src/shared/themes";
import { useClickAway } from "@uidotdev/usehooks";
import { Headings } from "./BlockList";
import { IBlockProps } from "./interface";
import styled from "styled-components";
import { TextInput, TextInputWithIcon } from "../../Input/TextInput";

const BlockSelector: React.FC<{
  action: any;
  toggleModal: any;
}> = (props) => {
  const { toggleModal } = props;

  const ref = useClickAway<HTMLDivElement>(() => {
    toggleModal(false);
  });

  return (
    <div
      ref={ref}
      style={{
        width: "calc(100% - 40px)",
        // maxWidth: "540px",
        // height: "280px",
        left: "20px",
        // transform: "translateX(-50%)",
        backgroundColor: ThemeColors.bgDark2,
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
          borderBottom: `1px dashed ${ThemeColors.border}`,
          alignItems: "center",
          paddingLeft: "16px",
          paddingRight: "16px",
          backgroundColor: ThemeColors.bgDark2,
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
    background-color: ${ThemeColors.border};
  }
`;

const BlockSelectorItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}> = (props) => {
  const { icon, label, description, onClick } = props;
  return (
    <BlockSelectorItemWrapper onClick={onClick}>
      <div>{icon}</div>
      <div>
        <h6
          style={{
            color: ThemeColors.textDark,
          }}
        >
          {label}
        </h6>
        <small
          style={{
            color: ThemeColors.textDark,
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
