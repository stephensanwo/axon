import { Box, Button, useTheme } from "@primer/react";
import { FormApi, formOptions, Updater, useForm } from "@tanstack/react-form";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PiDotsThree, PiFloppyDisk } from "react-icons/pi";
import { Input } from "src/components/Common/Input";
import TableList from "src/components/TableList";
import { TableListHeaderData } from "src/components/TableList/index.types";
import InputCell from "../TableList/components/InputCell";
import { BaseDataTableProps, EditStateProps } from "./index.types";
import usePageVisibility from "src/hooks/usePageVisibility";
import { TableData } from "src/domain/content/content.entity";
import { formatDateToRelativeTime } from "src/common/date";
import { BsFillMarkdownFill } from "react-icons/bs";
import { Text } from "../Common/Text";
import { startCase } from "lodash";
import { InlineSpinner } from "../Common/Spinner";
import { flushSync } from "react-dom";

function DataTable({
  data,
  updated,
  updateTable,
  refetchTable,
  title,
  showHeader,
}: BaseDataTableProps) {
  const { theme } = useTheme();
  const header = data.data.header;
  const body = data.data.body;
  const [isTyping, setIsTyping] = useState<EditStateProps>({
    typing: false,
    lastTyped: updated,
  });

  const formOpts = formOptions<{
    header: {
      id: string;
      name: string;
    }[];
  }>({
    defaultValues: {
      header: header,
    },
  });

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value, formApi }) => {
      const dto = {
        ...data,
        data: {
          ...data.data,
          header: value.header,
        },
      };
      console.log("Table Input Form Submitted", dto);
      updateTable(dto);
    },
  });

  const template = `repeat(${header.length}, auto) 32px`;
  const [isActive, setIsActive] = useState("");

  // Callback to run when the page is hidden (user leaves)
  const handlePageLeave = () => {
    console.log("User left the page");
  };

  // Callback to run when the page becomes visible (user returns)
  const handlePageReturn = () => {
    console.log("User returned to the page ==> refetching");
    refetchTable();
  };

  // Use the custom hook with the leave and return callbacks
  usePageVisibility(handlePageLeave, handlePageReturn);

  const typingTimeout = useRef<number | undefined>(undefined); // Timeout reference to track typing

  const handleInputChange = (
    e: string,
    handleChange: (value: string) => void
  ) => {
    flushSync(() => handleChange(e)); // Update field value immediately

    // Clear any existing timeout
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    // Set a new timeout to submit the form if typing stops for 500ms
    typingTimeout.current = window.setTimeout(() => {
      Form.handleSubmit(); // Submit the form after 500ms of no typing
    }, 500);
  };

  return (
    <>
      {showHeader && <DataTableHeader table={data} isTyping={isTyping} />}
      <TableList.Header
        data={header}
        gridTemplateColumns={template}
        actions={[<PiDotsThree size={16} color={theme?.colors.text.gray} />]}
      >
        <Form.Field name="header" mode="array">
          {(field) => {
            return (
              <>
                {field.state.value.map((_, i) => {
                  return (
                    <Form.Field key={i} name={`header[${i}].name`}>
                      {(subField) => {
                        return (
                          <TableList.Cell>
                            <Input.Box
                              value={subField.state.value || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  e.target.value,
                                  subField.handleChange
                                )
                              }
                              onBlur={subField.handleBlur}
                              placeholder="Add New Label"
                            />
                          </TableList.Cell>
                        );
                      }}
                    </Form.Field>
                  );
                })}
              </>
            );
          }}
        </Form.Field>
      </TableList.Header>
      {body.map((body, i) => (
        <SheetData
          key={i}
          index={i}
          data={body}
          header={header}
          isActive={isActive}
          setIsActive={setIsActive}
          updateTable={updateTable}
          tableData={data}
        />
      ))}
      <NewSheetRow
        header={header}
        isActive={isActive}
        setIsActive={setIsActive}
      />
    </>
  );
}

function SheetData({
  data,
  header,
  isActive,
  setIsActive,
  index,
  updateTable,
  tableData,
}: {
  tableData: TableData;
  data: TableListHeaderData;
  header: TableListHeaderData;
  isActive: string;
  setIsActive: React.Dispatch<React.SetStateAction<string>>;
  index: number;
  updateTable: (value: TableData) => void;
}) {
  const { theme } = useTheme();

  const formOpts = useMemo(
    () =>
      formOptions<{ body: TableListHeaderData }>({
        defaultValues: {
          body: data,
        },
      }),
    []
  );

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value, formApi }) => {
      const updatedBody = tableData.data.body.map(
        (row, idx) => (idx === index ? value.body : row) // Update the specific row
      );

      const dto = {
        ...tableData,
        data: {
          ...tableData.data,
          body: updatedBody, // Replace the body with the updated version
        },
      };

      console.log("Table Input Form Submitted", dto);
      updateTable(dto);
    },
  });

  const typingTimeout = useRef<number | undefined>(undefined); // Timeout reference to track typing

  const handleInputChange = (
    e: string,
    handleChange: (value: string) => void
  ) => {
    flushSync(() => handleChange(e)); // Update field value immediately

    // Clear any existing timeout
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    // Set a new timeout to submit the form if typing stops for 500ms
    typingTimeout.current = window.setTimeout(() => {
      Form.handleSubmit(); // Submit the form after 500ms of no typing
    }, 500);
  };

  const template = `repeat(${header.length}, 1fr) 32px`;
  return (
    <TableList.Body2
      data={data}
      gridTemplateColumns={template}
      actions={[<PiDotsThree size={16} color={theme?.colors.text.gray} />]}
    >
      <Form.Field name="body" mode="array">
        {(field) => {
          return (
            <>
              {field.state.value.map((_, i) => {
                return (
                  <Form.Field key={i} name={`body[${i}].name`}>
                    {(subField) => {
                      return (
                        <TableList.Cell
                          onClick={() =>
                            setIsActive(`${index}.body[${i}].name`)
                          }
                        >
                          <InputCell
                            value={subField.state.value || ""}
                            onChange={(e) =>
                              handleInputChange(
                                e.target.value,
                                subField.handleChange
                              )
                            }
                            onBlur={subField.handleBlur}
                            isActive={isActive}
                            id={`${index}.body[${i}].name`}
                          />
                        </TableList.Cell>
                      );
                    }}
                  </Form.Field>
                );
              })}
            </>
          );
        }}
      </Form.Field>
    </TableList.Body2>
  );
}

function NewSheetRow({
  header,
  isActive,
  setIsActive,
}: {
  header: TableListHeaderData;
  isActive: string;
  setIsActive: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { theme } = useTheme();
  const data = [
    {
      id: "",
      name: "",
    },
    {
      id: "",
      name: "",
    },
  ];
  const formOpts = useMemo(
    () =>
      formOptions<{ new: TableListHeaderData }>({
        defaultValues: {
          new: data,
        },
      }),
    []
  );

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value, formApi }) => {
      formApi.reset();
    },
  });

  const template = `repeat(${header.length}, auto) 32px`;

  return (
    <TableList.Body2
      data={{} as TableListHeaderData}
      gridTemplateColumns={template}
      actions={[<PiDotsThree size={16} color={theme?.colors.text.gray} />]}
    >
      <Form.Field name="new" mode="array">
        {(field) => {
          return (
            <>
              {field.state.value.map((_, i) => {
                return (
                  <Form.Field key={i} name={`new[${i}].name`}>
                    {(subField) => {
                      return (
                        <TableList.Cell
                          onClick={() => setIsActive(`new[${i}].name`)}
                        >
                          <Input.Box
                            value={subField.state.value || ""}
                            onChange={(e) =>
                              subField.handleChange(e.target.value)
                            }
                            onBlur={subField.handleBlur}
                            placeholder="Add New Label"
                            style={{
                              border:
                                isActive === `new[${i}].name`
                                  ? `1px solid ${theme?.colors.text.primary}`
                                  : "none",
                            }}
                          />
                        </TableList.Cell>
                      );
                    }}
                  </Form.Field>
                );
              })}
            </>
          );
        }}
      </Form.Field>
    </TableList.Body2>
  );
}

export function DataTableHeader({
  table,
  isTyping,
}: {
  table: TableData;
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
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <BsFillMarkdownFill size={14} fill={theme?.colors.text.gray} />
        <Text.SmallSecondary>
          {startCase(table.content_type)}
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
      </Box>
    </Box>
  );
}

export default DataTable;
