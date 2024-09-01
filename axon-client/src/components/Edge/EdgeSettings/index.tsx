import { Box } from "@primer/react";
import { formOptions, useForm } from "@tanstack/react-form";
import { InlineHeader } from "src/components/Common";
import { BaseSettingsProps } from "src/components/Settings/index.types";
import TableList from "src/components/TableList";
import { TableListHeaderData } from "src/components/TableList/index.types";
import EdgeSetting from "./EdgeSetting";
import { useSettings } from "src/context/settings/hooks/useSettings";
import { useMemo } from "react";
import { EdgeStyle, EdgeStyleData } from "src/domain/edge/edge.entity";
import { UpdateEdgeStyleDto } from "src/domain/edge/edge.dto";

const gridTemplateColumns = "3fr 2fr";

function EdgeSettings({ settingsState }: BaseSettingsProps): JSX.Element {
  const { updateEdgeStyles } = useSettings();
  const edgeStyles = settingsState.settings.data?.edgeStyles!!;
  if (!edgeStyles) {
    return <></>; // TODO: Handle the case where edgeStyles is undefined
  }

  const formOpts = useMemo(() => {
    return formOptions<EdgeStyle>({
      defaultValues: {
        color: edgeStyles.color,
        width: edgeStyles.width,
        type: edgeStyles.type,
        animated: edgeStyles.animated,
        label: edgeStyles.label,
        marker: edgeStyles.marker,
      },
    });
  }, []);

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      const dto: UpdateEdgeStyleDto = {
        ...edgeStyles,
        ...value,
      };
      updateEdgeStyles.mutate(dto);
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
          title="Edge Settings"
          subtitle="Create custom styles for your edges"
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
      ></TableList.Header>
      <TableList.Body>
        {Object.keys(Form.state.values).map((key, index) => {
          const value = edgeStyles[key as keyof EdgeStyleData];
          return (
            <EdgeSetting
              key={index}
              id={key as keyof EdgeStyleData}
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

export default EdgeSettings;
