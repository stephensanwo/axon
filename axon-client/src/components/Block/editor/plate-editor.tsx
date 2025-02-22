"use client";

import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Plate } from "@udecode/plate-common/react";

import { useCreateEditor } from "src/components/Block/editor/use-create-editor";
import { SettingsDialog } from "src/components/Block/editor/settings";
import { Editor, EditorContainer } from "src/components/Block/plate-ui/editor";

export function PlateEditor() {
  const editor = useCreateEditor();

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}>
        <EditorContainer>
          <Editor variant="fullWidth" />
        </EditorContainer>

        <SettingsDialog />
      </Plate>
    </DndProvider>
  );
}
