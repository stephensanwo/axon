import { Toaster } from "sonner";

import { PlateEditor } from "src/components/Block/editor/plate-editor";
import { SettingsProvider } from "src/components/Block/editor/settings";

export default function Page() {
  return (
    <div className="h-screen w-full" data-registry="plate">
      <SettingsProvider>
        <PlateEditor />
      </SettingsProvider>

      <Toaster />
    </div>
  );
}
