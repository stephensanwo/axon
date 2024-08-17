import { CreateColorDto } from "src/domain/settings/settings.dto";
import {
  ColorEntity,
  SettingsQueryKeys,
} from "src/domain/settings/settings.entity";
import settingsService from "src/domain/settings/settings.service";
import { useDataMutation } from "src/hooks/api/useDataMutation";
import { useSettingsContext } from "./useSettingsContext";

export function useSettings() {
  const { settingsState, settingsStateDispatch } = useSettingsContext();

  const createColor = useDataMutation<CreateColorDto, ColorEntity>({
    mutationFn: async (dto: CreateColorDto) => settingsService.createColor(dto),
    optionalQueryKeysToInvalidate: [[...SettingsQueryKeys.SETTINGS]],
    onSuccessCallback: () => {
      settingsStateDispatch({
        type: "INIT_SETTINGS",
        pa,
      });
    },
  });
}
