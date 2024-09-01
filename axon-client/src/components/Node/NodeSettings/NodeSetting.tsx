import { Box, FormControl, IconButton, Radio, useTheme } from "@primer/react";
import { FormApi } from "@tanstack/react-form";
import { useState } from "react";
import { TableListRowDataProps } from "src/components/TableList/index.types";
import TableList from "src/components/TableList";
import startCase from "lodash/startCase";
import { ColorData } from "src/domain/settings/settings.entity";
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
import { Text } from "src/components/Common/Text";
import {
  NodeBorderStyles,
  NodeFontAlignments,
  NodeStyle,
  NodeStyleComponentTypes,
  NodeStyleData,
} from "src/domain/node/node.entity";
import { flushSync } from "react-dom";

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
        const [formValue, setFormValue] = useState(
          Form.state.values[id].value as ColorData
        );
        const updateColor = (color: ColorProps, view: ColorViews) => {
          flushSync(() => {
            setFormValue({ label, value: color, view });
          });
          flushSync(() => {
            Form.setFieldValue(id, {
              label,
              value: { value: color, view, label },
              component,
            });
          });
          Form.handleSubmit();
        };

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
            <ColorDialog
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              formValue={formValue}
              updateColor={updateColor}
            />
          </>
        );
      }
      case "select": {
        const [menuOpen, setMenuOpen] = useState(false);
        const [formValue, setFormValue] = useState(
          id === "border_style"
            ? (Form.state.values[id].value as NodeBorderStyles)
            : id === "font_alignment"
              ? (Form.state.values[id].value as NodeFontAlignments)
              : null
        );

        const updateRadio = (option: NodeBorderStyles | NodeFontAlignments) => {
          flushSync(() => {
            setFormValue(option);
          });
          flushSync(() => {
            Form.setFieldValue(id, {
              label,
              value: option,
              component,
            });
          });
          Form.handleSubmit();
        };

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
                  {startCase(formValue as string)}
                </Text.ParagraphSecondary>
              </Box>
              <IconButton
                variant="invisible"
                icon={PiDotsThree}
                disabled={false}
                aria-label="Select Options"
                sx={{
                  flexShrink: 0,
                  borderRadius: 0,
                }}
                onClick={() => setMenuOpen(true)}
              />
            </Box>
            <RadioDialog
              id={id}
              label={label}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              formValue={formValue!!}
              updateRadio={updateRadio}
            />
          </>
        );
      }
      case "number": {
        const formValue = Form.state.values[id].value as number;
        const { minRange, maxRange } = getStyleRange(id);
        const step = getStyleSteps(id);
        const { value, handleIncrease, handleDecrease } = useNumberInput({
          initialValue: formValue,
          step,
          minValue: minRange,
          maxValue: maxRange,
          onChange: (newValue) => {
            Form.setFieldValue(id, {
              label,
              value: newValue,
              component,
            });
            Form.handleSubmit();
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
              {value}px
            </Text.ParagraphSecondary>
            <Box>
              <IconButton
                variant="invisible"
                icon={RiSubtractFill}
                disabled={false}
                aria-label="Decrease Button"
                sx={{
                  flexShrink: 0,
                  borderRadius: 0,
                }}
                onClick={handleDecrease}
              />
              <IconButton
                variant="invisible"
                icon={RiAddFill}
                disabled={false}
                aria-label="Increase Button"
                sx={{
                  flexShrink: 0,
                  borderRadius: 0,
                }}
                onClick={handleIncrease}
              />
            </Box>
          </Box>
        );
      }
    }
  },
};

function ColorDialog({
  menuOpen,
  setMenuOpen,
  formValue,
  updateColor,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formValue: ColorData;
  updateColor?: (color: ColorProps, view: ColorViews) => void;
}) {
  return (
    <Color.Dialog
      openModal={menuOpen}
      closeModalFn={() => {
        setMenuOpen(false);
      }}
      colorLabel={formValue.label}
      defaultColor={formValue.value.hex}
      defaultView={formValue.view}
      updateColor={updateColor!!}
    />
  );
}

function RadioDialog({
  id,
  label,
  menuOpen,
  setMenuOpen,
  formValue,
  updateRadio,
}: {
  id: keyof NodeStyleData;
  label: string;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formValue: NodeBorderStyles | NodeFontAlignments;
  updateRadio: (option: NodeBorderStyles | NodeFontAlignments) => void;
}) {
  const data =
    id === "border_style"
      ? (formValue as NodeBorderStyles)
      : id === "font_alignment"
        ? (formValue as NodeFontAlignments)
        : null;

  const radioOptions =
    id === "border_style"
      ? (["dashed", "solid", "dotted"] as NodeBorderStyles[])
      : id === "font_alignment"
        ? (["center", "left"] as NodeFontAlignments[])
        : [];

  return (
    <CustomDialog
      header={label}
      subheading="Set node default styles"
      id={`node-settings-dialog-${id}`}
      openModal={menuOpen}
      closeModalFn={() => {
        setMenuOpen(false);
      }}
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
              value={data!!}
              checked={data === option}
              onChange={() => {
                updateRadio(option);
              }}
              disabled={false}
            />
            <FormControl.Label>
              <Text.SmallSecondary>{startCase(option)}</Text.SmallSecondary>
            </FormControl.Label>
          </FormControl>
        ))}
      </Box>
    </CustomDialog>
  );
}

export default NodeSetting;
