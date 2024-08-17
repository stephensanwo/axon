import React, { Reducer, createContext, useEffect, useReducer } from "react";
import { useDataQuery } from "src/hooks/api/useDataQuery";
import { SettingsAction, SettingsState } from "./settings.types";
import {
  SettingsEntity,
  SettingsQueryKeys,
} from "src/domain/settings/settings.entity";
import settingsService from "src/domain/settings/settings.service";
import { settingsReducer } from "./settings.reducer";

interface SettingsProviderProps {
  children: React.ReactNode;
}

interface SettingsContextProps {
  settingsState: SettingsState;
  settingsStateDispatch: React.Dispatch<SettingsAction>;
}

const SettingsContext = createContext({} as SettingsContextProps);

const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const settingsQuery = useDataQuery<SettingsEntity>({
    queryKey: [...SettingsQueryKeys.SETTINGS],
    queryFn: async () => settingsService.getSettings(),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const [settingsState, settingsStateDispatch] = useReducer<
    Reducer<SettingsState, SettingsAction>
  >(settingsReducer, {
    settings: {
      data: null,
      query: settingsQuery,
    },
  });

  useEffect(() => {
    if (settingsQuery.data && settingsQuery.isFetched) {
      settingsStateDispatch({
        type: "INIT_SETTINGS",
        payload: {
          settings: {
            data: settingsQuery.data,
            query: settingsQuery,
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsQuery.data]);

  return (
    <SettingsContext.Provider
      value={{
        settingsState,
        settingsStateDispatch,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsProvider, SettingsContext };
