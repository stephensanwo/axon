import { Box, IconButton, Text, useTheme } from "@primer/react";
import { formOptions, useForm } from "@tanstack/react-form";
import { useCallback, useMemo, useState } from "react";
import { PiCheckCircle, PiDotsThree, PiMagicWand, PiX } from "react-icons/pi";
import { nameUid } from "src/common/uid";
import { InlineHeader } from "src/components/Common";
import { Input } from "src/components/Common/Input";
import { ColorEntity } from "src/domain/settings/settings.entity";
import { FaRegCircleDot } from "react-icons/fa6";
import {
  Color as ColorProps,
  ColorViews,
} from "src/components/Color/index.types";
import Color from "src/components/Color";
import { colorToString } from "src/common/color";
import { CreateColorDto } from "src/domain/settings/settings.dto";
import { InlineSpinner } from "src/components/Common/Spinner";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { formValidation } from "src/common/forms/forms.validation";
import TableList from "src/components/TableList";
import {
  TableListHeaderData,
  TableListRowDataProps,
} from "src/components/TableList/index.types";
import { useSettings } from "src/context/settings/hooks/useSettings";
import { BaseSettingsProps } from "../../index.types";

const gridTemplateColumns = "3fr 2fr auto";

function ColorList({ settingsState }: BaseSettingsProps) {
  const { theme } = useTheme();
  const colorList = settingsState.settings.data?.colors?.toReversed();
  const headerData: TableListHeaderData = [
    {
      id: "label",
      name: "Label",
    },
    {
      id: "color",
      name: "Color",
      tooltip: {
        direction: "s",
        text: "Click to open the color palette and update a color. \n Axon supports HEX, RGB and HSL",
        type: "label",
      },
    },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <InlineHeader
          title="Colors"
          subtitle="Select default color and create custom colors"
          styles={{
            marginBottom: 0,
            display: "flex",
            flexDirection: "column",
            gap: 0,
            alignItems: "flex-start",
          }}
        />
      </Box>
      <TableList.Header
        data={headerData}
        gridTemplateColumns={gridTemplateColumns}
        actions={[<PiDotsThree size={16} color={theme?.colors.text.gray} />]}
      ></TableList.Header>
      <TableList.Body>
        {colorList?.map((color, index) => {
          return <ColorListItem key={index} color={color} />;
        })}
        {<NewColorItem />}
      </TableList.Body>
    </>
  );
}

function ColorListItem({ color }: { color: ColorEntity }) {
  const { theme } = useTheme();
  const { deleteColor } = useSettings();
  const rowData: TableListRowDataProps = [
    {
      id: "label",
      name: "Label",
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
          <Text
            sx={{
              color: theme?.colors.text.gray,
              fontSize: "12px",
              fontFamily: theme?.fonts.mono,
            }}
          >
            {color.label}
          </Text>
        </Box>
      ),
    },
    {
      id: "color",
      name: "Color",
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Text
              sx={{
                color: theme?.colors.text.gray,
                fontSize: "12px",
                fontFamily: theme?.fonts.mono,
              }}
            >
              {color.value.hex ? colorToString(color.value, color.view) : null}
            </Text>
            {color.value.hex && <FaRegCircleDot fill={color.value.hex} />}
          </Box>
        </Box>
      ),
    },
    {
      id: "delete",
      name: "Delete",
      renderCell: (
        <Box
          sx={{
            backgroundColor: theme?.colors.bg.default,
          }}
        >
          <IconButton
            variant="invisible"
            icon={PiX}
            disabled={false}
            aria-label="Delete Color"
            sx={{
              flexShrink: 0,
              borderRadius: 0,
            }}
            onClick={() => deleteColor.mutate([color.id])}
          />
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

function NewColorItem() {
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { createColor } = useSettings();

  const formOpts = useMemo(
    () =>
      formOptions<CreateColorDto>({
        defaultValues: {
          label: "",
          value: {} as ColorProps,
          view: "hex",
        },
      }),
    []
  );

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value, formApi }) => {
      createColor.mutate(value);
      formApi.reset();
    },
  });

  const updateColor = useCallback((color: ColorProps, view: ColorViews) => {
    Form.setFieldValue("value", color);
    Form.setFieldValue("view", view);
  }, []);

  const rowData: TableListRowDataProps = [
    {
      id: "label",
      name: "Label",
      renderCell: (
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Form.Field
            name="label"
            validatorAdapter={zodValidator()}
            validators={{
              onChangeAsyncDebounceMs: 500,
              onChange: formValidation.fieldValidation("string"),
            }}
          >
            {({ state, handleChange, handleBlur }) => {
              return (
                <Input.Box
                  value={state.value || ""}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  placeholder="Add New Label"
                />
              );
            }}
          </Form.Field>

          <Box
            sx={{
              backgroundColor: theme?.colors.bg.default,
            }}
          >
            <IconButton
              variant="invisible"
              icon={PiMagicWand}
              disabled={false}
              aria-label="Generate Name"
              sx={{
                flexShrink: 0,
                borderRadius: 0,
              }}
              onClick={() => Form.setFieldValue("label", nameUid())}
            />
          </Box>
        </Box>
      ),
    },
    {
      id: "color",
      name: "Color",
      renderCell: (
        <Box
          sx={{
            backgroundColor: theme?.colors.bg.default,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 0 0 8px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {Form.state.values.value.hex ? (
              <>
                <Text
                  sx={{
                    color: theme?.colors.text.gray,
                    fontSize: "12px",
                    fontFamily: theme?.fonts.mono,
                  }}
                >
                  {colorToString(
                    Form.state.values.value,
                    Form.state.values.view
                  )}
                </Text>
                <FaRegCircleDot fill={Form.state.values.value.hex} />
              </>
            ) : (
              <Text
                sx={{
                  color: theme?.colors.text.gray,
                  fontSize: "12px",
                  fontFamily: theme?.fonts.mono,
                }}
              >
                Select a color
              </Text>
            )}
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
          <Color.Dialog
            openModal={menuOpen}
            closeModalFn={setMenuOpen}
            colorLabel={Form.state.values.label}
            defaultColor={Form.state.values.value.hex}
            defaultView={Form.state.values.view}
            updateColor={updateColor}
          />
        </Box>
      ),
    },
    {
      id: "submit",
      name: "Submit",
      renderCell: (
        <Box
          sx={{
            backgroundColor: theme?.colors.bg.default,
          }}
        >
          <Form.Subscribe
            selector={({ isSubmitting }) => [isSubmitting]}
            children={([isSubmitting]) => (
              <IconButton
                variant="invisible"
                icon={() =>
                  isSubmitting ? (
                    <InlineSpinner size={16} />
                  ) : (
                    <PiCheckCircle size={16} />
                  )
                }
                disabled={
                  isSubmitting ||
                  !Form.state.values.label ||
                  !Form.state.values.value.hex ||
                  !Form.state.values.view
                }
                onClick={Form.handleSubmit}
                aria-label="Confirm Color"
                sx={{
                  flexShrink: 0,
                  borderRadius: 0,
                }}
              />
            )}
          />
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

export default ColorList;
