import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { LexicalEditor } from "lexical";
// // `Record` type with potentially `undefined` values
// import { PartialRecord } from '@/utils/types'

type EditorMutations = {
  editors: EditorMap;
  createEditor: (id: string, editor: LexicalEditor) => void;
  deleteEditor: (id: string) => void;
};

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

type EditorMap = PartialRecord<string, LexicalEditor>;

type EditorContextValue = EditorMutations & {
  editors: EditorMap;
};

const EditorContext = createContext<EditorContextValue | null>(null);

export const EditorProvider = (props: React.PropsWithChildren<{}>) => {
  const [editors, setEditors] = useState<EditorMap>({});

  const createEditor = useCallback((id: string, editor: LexicalEditor) => {
    setEditors((editors) => {
      if (editors[id]) return editors;
      return { ...editors, [id]: editor };
    });
  }, []);

  const deleteEditor = useCallback((id: string) => {
    setEditors((editors) => {
      if (!editors[id]) return editors;
      const { [id]: _, ...rest } = editors;
      return rest;
    });
  }, []);

  const value = useMemo(() => {
    return {
      editors,
      createEditor,
      deleteEditor,
    };
  }, [editors, createEditor, deleteEditor]);

  return (
    <EditorContext.Provider value={value}>
      {props.children}
    </EditorContext.Provider>
  );
};

export const useEditors = (): EditorMutations => {
  const context = useContext(EditorContext);
  if (context === null) {
    throw new Error(
      `The \`useEditors\` hook must be used inside the <EditorProvider> component's context.`
    );
  }
  const { editors, createEditor, deleteEditor } = context;
  return { editors, createEditor, deleteEditor };
};

export const useEditor = (id: string): LexicalEditor | null => {
  const context = useContext(EditorContext);
  if (context === null) {
    throw new Error(
      `The \`useEditor\` hook must be used inside the <EditorProvider> component's context.`
    );
  }
  return context.editors[id] || null;
};
