import { Box, FormControl, IconButton, Radio, useTheme } from "@primer/react";
import { FormApi } from "@tanstack/react-form";
import { useCallback, useState } from "react";
import { TableListRowDataProps } from "src/components/TableList/index.types";
import TableList from "src/components/TableList";
import startCase from "lodash/startCase";
import {
  ColorData,
  FontAlignments,
  NodeStyle,
  NodeStyleComponentTypes,
  NodeStyleData,
} from "src/domain/settings/settings.entity";
import Color from "src/components/Color";
import {
  ColorViews,
  Color as ColorProps,
} from "src/components/Color/index.types";
import { FaRegCircleDot } from "react-icons/fa6";
import { colorToString } from "src/common/color";
import { PiDotsThree } from "react-icons/pi";
import CustomDialog from "src/components/Dialog/CustomDialog";
import { getStyleRange, getStyleSteps } from "src/common/styles";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { useNumberInput } from "src/components/Common/Input/Number/hooks/useNumberInput";
import { BorderStyles } from "src/types/node";
import { Text } from "src/components/Common/Text";

const gridTemplateColumns = "3fr 2fr";

function NodeSetting({
  id,
  label,
  component,
  Form,
}: {
  id: keyof NodeStyleData;
  label: string;
  component: NodeStyleComponentTypes;
  Form: FormApi<NodeStyle, undefined>;
}) {
  const { theme } = useTheme();
  const rowData: TableListRowDataProps = [
    {
      id: "setting",
      name: "Setting",
      renderCell: (
        <Box
          sx={{
            backgroundColor: theme?.colors.bg.default,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 0 0 8px",
            height: "32px",
          }}
        >
          <Text.ParagraphSecondary
            sx={{
              fontSize: "12px",
              fontFamily: theme?.fonts.mono,
            }}
          >
            {startCase(label)}
          </Text.ParagraphSecondary>
        </Box>
      ),
    },
    {
      id: "value",
      name: "Value",
      renderCell: (
        <Box
          sx={{
            backgroundColor: theme?.colors.bg.default,
            padding: "0 0 0 8px",
          }}
        >
          {CellComponents.switchComponent(component, label, id, Form)}
        </Box>
      ),
    },
  ];

  return (
    <>
      <TableList.Row data={rowData} gridTemplateColumns={gridTemplateColumns} />
    </>
  );
}

const CellComponents = {
  switchComponent(
    component: NodeStyleComponentTypes,
    label: string,
    id: keyof NodeStyleData,
    Form: FormApi<NodeStyle, undefined>
  ) {
    const { theme } = useTheme();

    switch (component) {
      case "color": {
        const [menuOpen, setMenuOpen] = useState(false);
        const formValue = Form.state.values[id].value as ColorData;
        const updateColor = useCallback(
          (color: ColorProps, view: ColorViews) => {
            Form.setFieldValue(id, {
              label,
              value: { value: color, view, label },
              component,
            });
          },
          []
        );
        return (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <>
                  <Text.ParagraphSecondary
                    sx={{
                      fontSize: "12px",
                      fontFamily: theme?.fonts.mono,
                    }}
                  >
                    {colorToString(formValue.value, formValue.view)}
                  </Text.ParagraphSecondary>
                  <FaRegCircleDot fill={formValue.value.hex} />
                </>
              </Box>
              <IconButton
                variant="invisible"
                icon={PiDotsThree}
                disabled={false}
                aria-label="Color Options"
                sx={{
                  flexShrink: 0,
                  borderRadius: 0,
                }}
                onClick={() => setMenuOpen(true)}
              />
            </Box>
            {DialogComponents.switchComponent(
              component,
              label,
              id,
              menuOpen,
              setMenuOpen,
              Form,
              updateColor
            )}
          </>
        );
      }
      case "select": {
        const [menuOpen, setMenuOpen] = useState(false);
        const formValue =
          id === "border_style"
            ? (Form.state.values[id].value as BorderStyles)
            : id === "font_alignment"
              ? (Form.state.values[id].value as FontAlignments)
              : null;
        return (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Text.ParagraphSecondary
                  sx={{
                    fontSize: "12px",
                    fontFamily: theme?.fonts.mono,
                  }}
                >
                  {formValue}
                </Text.ParagraphSecondary>
              </Box>
              <IconButton
                variant="invisible"
                icon={PiDotsThree}
                disabled={false}
                aria-label="Color Options"
                sx={{
                  flexShrink: 0,
                  borderRadius: 0,
                }}
                onClick={() => setMenuOpen(true)}
              />
            </Box>
            {DialogComponents.switchComponent(
              component,
              label,
              id,
              menuOpen,
              setMenuOpen,
              Form
            )}
          </>
        );
      }
      case "number": {
        const formValue = Form.state.values[id].value as number;
        const { minRange, maxRange } = getStyleRange(id);
        const step = getStyleSteps(id);
        const {
          value: FormItemData,
          increase,
          decrease,
        } = useNumberInput({
          id: `node-border-radius`,
          initialValue: formValue,
          step: step,
          minValue: minRange,
          maxValue: maxRange,
          onChange: (value) => {
            Form.setFieldValue(id, {
              label,
              value: value,
              component,
            });
          },
        });

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text.ParagraphSecondary
              sx={{
                fontSize: "12px",
                fontFamily: theme?.fonts.mono,
              }}
            >
              {FormItemData}px
            </Text.ParagraphSecondary>
            <Box>
              <IconButton
                variant="invisible"
                icon={RiSubtractFill}
                disabled={false}
                aria-label="Color Options"
                sx={{
                  flexShrink: 0,
                  borderRadius: 0,
                }}
                onClick={() => decrease()}
              />
              <IconButton
                variant="invisible"
                icon={RiAddFill}
                disabled={false}
                aria-label="Color Options"
                sx={{
                  flexShrink: 0,
                  borderRadius: 0,
                }}
                onClick={() => increase()}
              />
            </Box>
          </Box>
        );
      }
    }
  },
};

const DialogComponents = {
  switchComponent(
    component: NodeStyleComponentTypes,
    label: string,
    id: keyof NodeStyleData,
    menuOpen: boolean,
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
    Form: FormApi<NodeStyle, undefined>,
    updateColor?: (color: ColorProps, view: ColorViews) => void
  ) {
    switch (component) {
      case "color": {
        const formValue = Form.state.values[id].value as ColorData;
        return (
          <Color.Dialog
            openModal={menuOpen}
            closeModalFn={setMenuOpen}
            colorLabel={formValue.label}
            defaultColor={formValue.value.hex}
            defaultView={formValue.view}
            updateColor={updateColor!!}
          />
        );
      }
      case "select":
        const [formValue, setFormValue] = useState(
          id === "border_style"
            ? (Form.state.values[id].value as BorderStyles)
            : id === "font_alignment"
              ? (Form.state.values[id].value as FontAlignments)
              : null
        );

        const radioOptions =
          id === "border_style"
            ? (["dashed", "solid", "dotted"] as BorderStyles[])
            : id === "font_alignment"
              ? (["center", "left"] as FontAlignments[])
              : [];

        return (
          <CustomDialog
            header={label!!}
            subheading="Set node default styles"
            id="node-border-radius"
            openModal={menuOpen}
            closeModalFn={setMenuOpen}
            size="narrow"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 4,
              }}
            >
              {radioOptions.map((option, index) => (
                <FormControl key={index}>
                  <Radio
                    name={option}
                    value={formValue!!}
                    checked={formValue === option}
                    onChange={() => {
                      setFormValue(option);
                      Form.setFieldValue(id, {
                        label: label,
                        value: option,
                        component,
                      });
                    }}
                    disabled={false}
                  />
                  <FormControl.Label>
                    <Text.SmallSecondary>
                      {startCase(option)}
                    </Text.SmallSecondary>
                  </FormControl.Label>
                </FormControl>
              ))}
            </Box>
          </CustomDialog>
        );
      default:
        return null;
    }
  },
};
export default NodeSetting;
