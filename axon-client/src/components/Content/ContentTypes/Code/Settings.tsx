import { Dropdown } from "src/components/Input/DropDown";
import { ISupportedLanguage, SUPPORTED_LANGUAGES } from "./utils";
import { upperFirst } from "lodash";
import styled from "styled-components";
import { useCode } from "src/hooks/content/useCode";

const SettingsStyles = styled.div`
  &[data-wrapper] {
    width: 100%;
    padding: 20px;
  }
`;
const Settings = () => {
  const { code, handleLanguageChange } = useCode();
  return (
    <SettingsStyles data-wrapper>
      <Dropdown
        id="change-language-dropdown"
        titleText="Change Language"
        label={upperFirst(code?.language)}
        items={SUPPORTED_LANGUAGES}
        itemToString={(item: ISupportedLanguage) =>
          item ? upperFirst(item.language) : ""
        }
        size="md"
        onChange={(event: any) => handleLanguageChange(event)}
      />
    </SettingsStyles>
  );
};

export default Settings;
