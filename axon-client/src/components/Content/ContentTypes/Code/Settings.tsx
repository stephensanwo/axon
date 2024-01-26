import { useState } from "react";
import { upperFirst } from "lodash";
import { SearchIcon } from "@primer/octicons-react";
import styled from "styled-components";
import {
  ActionList,
  Box,
  FormControl,
  Text,
  TextInput,
  useTheme,
} from "@primer/react";
import { useCode } from "src/hooks/content/useCode";
import { ISupportedLanguage, SUPPORTED_LANGUAGES } from "./utils";

const SettingsStyles = styled.div`
  &[data-wrapper] {
    width: 100%;
    padding: 20px;
  }
`;
const Settings = () => {
  const { code, handleLanguageChange } = useCode();
  const [results, setResults] = useState(SUPPORTED_LANGUAGES);
  const { theme } = useTheme();
  const filter = async (event: any) => {
    const filteredResults = SUPPORTED_LANGUAGES.filter(
      (item: ISupportedLanguage) => {
        return item.language
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      }
    );
    setResults(filteredResults);
  };
  return (
    <SettingsStyles data-wrapper>
      {/* <Dropdown
        id="change-language-dropdown"
        titleText="Change Language"
        label={upperFirst(code?.language)}
        items={SUPPORTED_LANGUAGES}
        itemToString={(item: ISupportedLanguage) =>
          item ? upperFirst(item.language) : ""
        }
        size="md"
        onChange={(event: any) => handleLanguageChange(event)}
      /> */}
      <Box
        sx={{
          width: "100%",
          height: "300px",
          overflow: "scroll",
        }}
      >
        <FormControl
          sx={{
            position: "absolute",
            width: "calc(100% - 40px)",
            backgroundColor: theme?.colors.bg.default,
            zIndex: 10,
          }}
        >
          <FormControl.Label>
            Select Language{" "}
            <Text
              fontSize={0}
              fontWeight="normal"
              color={theme?.colors.text.gray}
            >
              (Scroll for more)
            </Text>
          </FormControl.Label>
          <TextInput
            onChange={filter}
            block
            placeholder="Find Language"
            leadingVisual={SearchIcon}
          />
        </FormControl>
        <ActionList
          selectionVariant="single"
          role="listbox"
          aria-label="Languages"
          sx={{
            marginTop: "60px",
          }}
        >
          {results.map((spl, index) => (
            <ActionList.Item
              key={index}
              role="option"
              selected={spl.language === code?.language}
              onSelect={() => handleLanguageChange(spl.language)}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Text> {upperFirst(spl.language)}</Text>
                <Text color={theme?.colors.primary.default}> .{spl.ext}</Text>
              </Box>
            </ActionList.Item>
          ))}
        </ActionList>
      </Box>
    </SettingsStyles>
  );
};

export default Settings;
