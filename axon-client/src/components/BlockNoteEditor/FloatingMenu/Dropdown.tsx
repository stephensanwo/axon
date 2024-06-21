// import { TextInputWithIcon } from "src/components/Input/TextInput";
import { useAlignActionsPlugin } from "../Plugins/Alignment";
import { useTextActionsPlugin } from "../Plugins/Text";
import { FloatingMenuDropdownTypes } from "../index.types";
import { useState } from "react";
import { validateUrl } from "src/utils/url";
// import { ThemeColors } from "src/shared/themes";
import { CheckmarkOutline } from "@carbon/icons-react";
import IconButton from "src/components/Button/MenuButton";
import { Reset } from "@carbon/icons-react";

export const FloatingMenuDropdown: React.FC<{
  dropDownType: FloatingMenuDropdownTypes | null;
  namespace: string;
  currentValue: Partial<Record<FloatingMenuDropdownTypes, any>>;
  action: Partial<Record<FloatingMenuDropdownTypes, any>>;
}> = (props) => {
  const { dropDownType, namespace, action, currentValue } = props;
  const alignActions = useAlignActionsPlugin();
  const textActions = useTextActionsPlugin();
  const [link, setLink] = useState<string>(currentValue.link ?? "");
  console.log("Link", link);
  return (
    <>
      {dropDownType === "align" && (
        <div
          data-floating-menu-dropdown={dropDownType === "align" && "visible"}
        >
          <div data-floating-menu-item-flex>
            {alignActions.map((action, index) => (
              <div key={index}>{action}</div>
            ))}
          </div>
        </div>
      )}
      {dropDownType === "text" && (
        <div data-floating-menu-dropdown={dropDownType === "text" && "visible"}>
          <div data-floating-menu-item-flex>
            {textActions.map((action, index) => (
              <div key={index}>{action}</div>
            ))}
          </div>
        </div>
      )}
      {dropDownType === "link" && (
        <div data-floating-menu-dropdown={dropDownType === "link" && "visible"}>
          <div>
            {/* <TextInputWithIcon
              labelText={""}
              id={`link-input-${namespace}`}
              placeholder="https://www.example.com"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              autoSave="off"
              autoFocus={true}
              disabled={currentValue.link.length > 0}
              warn={(link.length > 0 && !validateUrl(link)) ?? true}
              style={{
                backgroundColor: ThemeColors.bgHighlight1,
              }}
              value={link}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLink(() => e.target.value)
              }
              iconposition="right"
              icon={
                <IconButton
                  id={`link-status-icon-${namespace}`}
                  name={`Link Status ${namespace}`}
                  onClick={
                    currentValue.link.length > 0
                      ? () => action.link.unLink()
                      : () => action.link.setLinkUrl(link)
                  }
                  disabled={(link.length > 0 && !validateUrl(link)) ?? true}
                  width="24px"
                  height="24px"
                  background={"transparent"}
                  fill={ThemeColors.primary}
                  borderradius="50%"
                >
                  {currentValue.link.length > 0 ? (
                    <Reset size={18} />
                  ) : (
                    <CheckmarkOutline size={18} />
                  )}
                </IconButton>
              }
            /> */}
          </div>
        </div>
      )}
    </>
  );
};
