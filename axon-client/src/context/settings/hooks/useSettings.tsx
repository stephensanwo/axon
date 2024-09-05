import { UseMutationResult } from "@tanstack/react-query";
import { UpdateEdgeStyleDto } from "src/domain/edge/edge.dto";
import edgeService from "src/domain/edge/edge.service";
import { UpdateNodeStyleDto } from "src/domain/node/node.dto";
import nodeService from "src/domain/node/node.service";
import { CreateColorDto } from "src/domain/settings/settings.dto";
import {
  ColorData,
  ColorEntity,
  SettingsQueryKeys,
} from "src/domain/settings/settings.entity";
import settingsService from "src/domain/settings/settings.service";
import { useDataMutation } from "src/hooks/api/useDataMutation";

export function useSettings(): {
  createColor: UseMutationResult<ColorEntity, unknown, ColorData, unknown>;
  deleteColor: UseMutationResult<boolean, unknown, string[], unknown>;
  updateNodeStyles: UseMutationResult<
    boolean,
    unknown,
    UpdateNodeStyleDto,
    unknown
  >;
  updateEdgeStyles: UseMutationResult<
    boolean,
    unknown,
    UpdateEdgeStyleDto,
    unknown
  >;
} {
  const createColor = useDataMutation<CreateColorDto, ColorEntity>({
    mutationFn: async (dto: CreateColorDto) => settingsService.createColor(dto),
    optionalQueryKeysToInvalidate: [[...SettingsQueryKeys.SETTINGS]],
  });

  const deleteColor = useDataMutation<string[], boolean>({
    mutationFn: async (dto: string[]) => settingsService.deleteColor(dto),
    optionalQueryKeysToInvalidate: [[...SettingsQueryKeys.SETTINGS]],
  });

  const updateNodeStyles = useDataMutation<UpdateNodeStyleDto, boolean>({
    mutationFn: async (dto: UpdateNodeStyleDto) =>
      nodeService.updateNodeStyles(dto),
    optionalQueryKeysToInvalidate: [[...SettingsQueryKeys.SETTINGS]],
  });

  const updateEdgeStyles = useDataMutation<UpdateEdgeStyleDto, boolean>({
    mutationFn: async (dto: UpdateEdgeStyleDto) =>
      edgeService.updateEdgeStyles(dto),
    optionalQueryKeysToInvalidate: [[...SettingsQueryKeys.SETTINGS]],
  });

  return {
    createColor,
    deleteColor,
    updateNodeStyles,
    updateEdgeStyles,
  };
}
