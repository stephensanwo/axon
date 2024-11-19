import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box, Button, useTheme } from "@primer/react";
import ReactMarkdown from "react-markdown";
import Editor from "src/components/CodeEditor/Editor";
import { getMarkdownComponents } from "./components";
import { REHYPE_MARKDOWN_PLUGINS, REMARK_MARKDOWN_PLUGINS } from "./plugins";
import { MarkdownData } from "src/domain/content/content.entity";
import { FormApi, formOptions, Updater, useForm } from "@tanstack/react-form";
import { BaseMarkdownProps, EditStateProps } from "./index.types";
import { InlineSpinner } from "../Common/Spinner";
import { PiEye, PiFloppyDisk, PiPencil } from "react-icons/pi";
import { Text } from "../Common/Text";
import { startCase } from "lodash";
import { formatDateToRelativeTime } from "src/common/date";
import { flushSync } from "react-dom";
import usePageVisibility from "src/hooks/usePageVisibility";
import { BsFillMarkdownFill } from "react-icons/bs";

export function MarkdownInput({
  Form,
  setIsTyping,
  loadingComponent = "Loading Markdown...",
}: {
  Form: FormApi<MarkdownData, undefined>;
  setIsTyping: React.Dispatch<React.SetStateAction<EditStateProps>>;
  loadingComponent?: React.ReactNode;
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
    <Form.Field name="data">
      {({ state, handleChange }) => {
        return (
          <Editor
            defaultValue="Add Markdown here..."
            language={"markdown"}
            value={state.value}
            loading={loadingComponent}
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
                bottom: 0,
              },
            }}
            width={"100%"}
          />
        );
      }}
    </Form.Field>
  );
}

export function MarkdownPreview({ markdown }: { markdown: MarkdownData }) {
  const { theme } = useTheme();
  const MARKDOWN_COMPONENTS = useMemo(() => {
    return getMarkdownComponents(theme!!);
  }, []);
  return (
    <Box
      sx={{
        padding: "0px 14px 14px 14px",
        width: "100%",
      }}
    >
      <ReactMarkdown
        children={markdown.data}
        remarkPlugins={REMARK_MARKDOWN_PLUGINS}
        rehypePlugins={REHYPE_MARKDOWN_PLUGINS}
        components={MARKDOWN_COMPONENTS}
        // remarkRehypeOptions={{
        //   allowDangerousHtml: false,
        // }}
      />
    </Box>
  );
}

export function Markdown({
  markdown,
  updateMarkdown,
  title,
  updated,
  showHeader = true,
  refetchMarkdown,
  loadingComponent,
}: BaseMarkdownProps) {
  const [isTyping, setIsTyping] = useState<EditStateProps>({
    typing: false,
    lastTyped: updated,
  });
  const formOpts = formOptions<MarkdownData>({
    defaultValues: {
      data: markdown.data || `# ${title}`,
      content_type: "markdown",
      view: markdown.view || "input",
    },
  });

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value, formApi }) => {
      console.log("Markdown Input Form Submitted", value);
      updateMarkdown(value);
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
    refetchMarkdown();
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
      {showHeader && (
        <MarkdownHeader Form={Form} markdown={markdown} isTyping={isTyping} />
      )}
      {/* {markdown.view === "input" ? (
        <MarkdownInput
          Form={Form}
          setIsTyping={setIsTyping}
          loadingComponent={loadingComponent}
        />
      ) : (
        <MarkdownPreview markdown={markdown} />
      )} */}
    </Box>
  );
}

export function MarkdownHeader({
  Form,
  markdown,
  isTyping,
}: {
  Form: FormApi<MarkdownData, undefined>;
  markdown: MarkdownData;
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
    <Box className="flex flex-row items-center justify-between bg-red-500">
      <Box className="flex items-center gap-2">
        <BsFillMarkdownFill size={14} fill={theme?.colors.text.gray} />
        <Text.SmallSecondary>
          {startCase(markdown.content_type)}
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

        <Form.Field name="view">
          {({ state }) => {
            return (
              <Button
                variant="invisible"
                leadingVisual={state.value === "input" ? PiEye : PiPencil}
                disabled={false}
                onClick={() => {
                  flushSync(() => {
                    Form.setFieldValue(
                      "view",
                      state.value === "input" ? "preview" : "input"
                    );
                  });
                  Form.handleSubmit();
                }}
                size="small"
                sx={{
                  height: "24px",
                  color: theme?.colors.text.gray,
                }}
              >
                {state.value === "input" ? "Preview" : "Edit"}
              </Button>
            );
          }}
        </Form.Field>
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
