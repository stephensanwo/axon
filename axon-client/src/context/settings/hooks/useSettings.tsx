import { UseMutationResult } from "@tanstack/react-query";
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
} {
  const createColor = useDataMutation<CreateColorDto, ColorEntity>({
    mutationFn: async (dto: CreateColorDto) => settingsService.createColor(dto),
    optionalQueryKeysToInvalidate: [[...SettingsQueryKeys.SETTINGS]],
  });

  const deleteColor = useDataMutation<string[], boolean>({
    mutationFn: async (dto: string[]) => settingsService.deleteColor(dto),
    optionalQueryKeysToInvalidate: [[...SettingsQueryKeys.SETTINGS]],
  });

  return {
    createColor,
    deleteColor,
  };
}
