import { Box, Button } from "@primer/react";
import { formOptions, useForm } from "@tanstack/react-form";
import { InlineHeader } from "src/components/Common";
import Icon from "src/components/Common/Icon";
import { BaseSettingsProps } from "src/components/Settings/index.types";
import TableList from "src/components/TableList";
import { TableListHeaderData } from "src/components/TableList/index.types";
import { UpdateNodeStyleDto } from "src/domain/settings/settings.dto";
import NodeSetting from "./NodeSetting";
import { Text } from "src/components/Common/Text";
import { NodeStyle, NodeStyleData } from "src/domain/settings/settings.entity";
import { useSettings } from "src/context/settings/hooks/useSettings";
import { useMemo } from "react";

const gridTemplateColumns = "3fr 2fr";

function NodeSettings({ settingsState }: BaseSettingsProps): JSX.Element {
  const { updateNodeStyles } = useSettings();
  const nodeStyles = settingsState.settings.data?.nodeStyles!!;
  if (!nodeStyles) {
    return <></>; // TODO: Handle the case where nodeStyles is undefined
  }

  const formOpts = useMemo(() => {
    return formOptions<NodeStyle>({
      defaultValues: {
        background_color: nodeStyles.background_color,
        border_color: nodeStyles.border_color,
        font_color: nodeStyles.font_color,
        font_weight: nodeStyles.font_weight,
        font_alignment: nodeStyles.font_alignment,
        font_size: nodeStyles.font_size,
        border_style: nodeStyles.border_style,
        border_radius: nodeStyles.border_radius,
      },
    });
  }, []);

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value, formApi }) => {
      console.log("value", value);
      console.log("formApi", formApi);
      const dto: UpdateNodeStyleDto = {
        ...nodeStyles,
        ...value,
      };
      updateNodeStyles.mutate(dto);
    },
  });

  const headerData: TableListHeaderData = [
    {
      id: "setting",
      name: "Setting",
    },
    {
      id: "value",
      name: "Value",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <InlineHeader
          title="Node Settings"
          subtitle="Create custom styles for your nodes"
          styles={{
            marginBottom: 0,
            display: "flex",
            flexDirection: "column",
            gap: 0,
            alignItems: "flex-start",
          }}
        />
        <Form.Subscribe
          selector={({ isSubmitting }) => [isSubmitting]}
          children={([isSubmitting]) => (
            <Button
              variant="default"
              size="small"
              trailingVisual={Icon.CircleCheck}
              onClick={Form.handleSubmit}
            >
              <Text.SmallSecondary>Save</Text.SmallSecondary>
            </Button>
          )}
        />
      </Box>
      <TableList.Header
        data={headerData}
        gridTemplateColumns={gridTemplateColumns}
      ></TableList.Header>
      <TableList.Body>
        {Object.keys(Form.state.values).map((key, index) => {
          const value = nodeStyles[key as keyof NodeStyleData];
          return (
            <NodeSetting
              key={index}
              id={key as keyof NodeStyleData}
              component={value.component}
              label={value.label}
              Form={Form}
            />
          );
        })}
      </TableList.Body>
    </Box>
  );
}

export default NodeSettings;
