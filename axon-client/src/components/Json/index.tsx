import { PiFloppyDisk } from "react-icons/pi";
import Editor from "src/components/CodeEditor/Editor";
import { BaseJsonProps, EditStateProps } from "./index.types";
import { useCallback, useEffect, useRef, useState } from "react";
import { JsonData } from "src/domain/content/content.entity";
import { FormApi, formOptions, Updater, useForm } from "@tanstack/react-form";
import { flushSync } from "react-dom";
import usePageVisibility from "src/hooks/usePageVisibility";
import { Box, Button, useTheme } from "@primer/react";
import { formatDateToRelativeTime } from "src/common/date";
import { BsFileCodeFill } from "react-icons/bs";
import { Text } from "../Common/Text";
import { startCase } from "lodash";
import { InlineSpinner } from "../Common/Spinner";

export function JsonInput({
  Form,
  setIsTyping,
}: {
  Form: FormApi<JsonData, undefined>;
  setIsTyping: React.Dispatch<React.SetStateAction<EditStateProps>>;
}) {
  const typingTimeout = useRef<number | undefined>(undefined); // Timeout reference to track typing

  const handleStopTyping = useCallback(
    (
      e: string | undefined,
      handleChange: (updater: Updater<string>) => void
    ) => {
      flushSync(() => {
        handleChange(e ?? ""); // Ensure empty string fallback if `e` is undefined
      });
      Form.handleSubmit(); // Submit the form after user stops typing
      setIsTyping((prev) => ({
        ...prev,
        typing: false,
        lastTyped: new Date().toISOString(),
      })); // Reset typing state
    },
    [Form]
  );

  const handleEditorChange = (
    e: string | undefined,
    handleChange: (updater: Updater<string>) => void
  ) => {
    setIsTyping((prev) => ({
      ...prev,
      typing: true,
    })); // Mark as typing

    // Clear the previous timeout if the user is still typing
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    // Set a timeout to wait until the user stops typing
    typingTimeout.current = window.setTimeout(() => {
      handleStopTyping(e, handleChange); // Submit when the user has stopped typing
    }, 500); // 500ms delay after the user stops typing
  };

  // Clean up the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, []);

  return (
    <Form.Field name="code">
      {({ state, handleChange }) => {
        return (
          <Editor
            defaultValue="Add Code here..."
            language={"javascript"}
            value={state.value}
            loading={"Loading Markdown..."}
            onChange={(e: string | undefined) =>
              handleEditorChange(e, handleChange)
            }
            overrideOptions={{
              lineNumbers: "off",
              renderLineHighlight: "none",
              autoIndent: "full",
              wrappingIndent: "none",
              tabSize: 2,
              padding: {
                top: 0,
              },
            }}
            width={"100%"}
          />
        );
      }}
    </Form.Field>
  );
}

export function Json({
  json,
  updateJson,
  updated,
  showHeader = true,
  refetchJson,
}: BaseJsonProps) {
  const [isTyping, setIsTyping] = useState<EditStateProps>({
    typing: false,
    lastTyped: updated,
  });
  const formOpts = formOptions<JsonData>({
    defaultValues: {
      code: json.code || "{}",
      content_type: "json",
    },
  });

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value, formApi }) => {
      console.log("Json Input Form Submitted", value);
      updateJson(value);
    },
  });

  // Callback to run when the page is hidden (user leaves)
  const handlePageLeave = () => {
    console.log("User left the page");
    // Form.handleSubmit();
  };

  // Callback to run when the page becomes visible (user returns)
  const handlePageReturn = () => {
    console.log("User returned to the page ==> refetching");
    refetchJson();
  };

  // Use the custom hook with the leave and return callbacks
  usePageVisibility(handlePageLeave, handlePageReturn);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        width: "100%",
        height: "100%",
      }}
    >
      {showHeader && <JsonHeader Form={Form} json={json} isTyping={isTyping} />}
      <JsonInput Form={Form} setIsTyping={setIsTyping} />
    </Box>
  );
}

export function JsonHeader({
  Form,
  json,
  isTyping,
}: {
  Form: FormApi<JsonData, undefined>;
  json: JsonData;
  isTyping: EditStateProps;
}) {
  const { theme } = useTheme();
  const [relativeTime, setRelativeTime] = useState(
    formatDateToRelativeTime(isTyping.lastTyped)
  );

  useEffect(() => {
    // Immediately update the relative time when `lastTyped` changes
    setRelativeTime(formatDateToRelativeTime(isTyping.lastTyped));

    // Set up the interval to keep updating every 5 seconds
    const interval = setInterval(() => {
      setRelativeTime(formatDateToRelativeTime(isTyping.lastTyped));
    }, 5000);

    // Clear the interval when the component unmounts or when `lastTyped` changes
    return () => clearInterval(interval);
  }, [isTyping.lastTyped]); // Re-run effect when `lastTyped` changes

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        pl: "26px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <BsFileCodeFill size={14} fill={theme?.colors.text.gray} />
        <Text.SmallSecondary>
          {startCase(json.content_type)}
        </Text.SmallSecondary>
        <Text.SmallSecondary> | </Text.SmallSecondary>
        <Text.SmallSecondary>Saved {relativeTime}</Text.SmallSecondary>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Text.SmallSecondary>
          Auto Save • {isTyping.typing ? "Editing" : "Saved"}
        </Text.SmallSecondary>
        <Form.Subscribe
          selector={({ isSubmitting }) => [isSubmitting]}
          children={([isSubmitting]) => (
            <Button
              variant="invisible"
              leadingVisual={isSubmitting ? InlineSpinner : PiFloppyDisk}
              disabled={isSubmitting}
              onClick={Form.handleSubmit}
              size="small"
              sx={{
                height: "24px",
                color: theme?.colors.text.gray,
              }}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          )}
        />
      </Box>
    </Box>
  );
}
