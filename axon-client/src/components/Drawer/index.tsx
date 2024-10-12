import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./Sheet";
import { Button, useTheme } from "@primer/react";
const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

// type SheetSide = (typeof SHEET_SIDES)[number]

export default function Drawer({
  trigger,
  content,
  side = "left",
}: {
  trigger: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}) {
  const { theme } = useTheme();
  return (
    <Sheet key={side}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side={side}
        style={{
          backgroundColor: theme?.colors.bg.default,
          borderRight: `1px solid ${theme?.colors.border.default}`,
        }}
      >
        {content}
      </SheetContent>
    </Sheet>
  );
}
