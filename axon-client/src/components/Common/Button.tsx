import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "src/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-foreground text-destructive shadow-sm hover:bg-destructive hover:text-destructive-foreground",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground text-border [&_svg]:text-border [&_svg]:hover:text-accent-foreground",
        "outline-destructive":
          "border border-input bg-background shadow-sm hover:bg-destructive hover:text-accent-foreground text-destructive hover:text-destructive-foreground [&_svg]:text-destructive [&_svg]:hover:text-destructive-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground [&_svg]:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 px-4 py-2 rounded-none",
        sm: "h-7 rounded-none px-3 text-xs",
        lg: "h-10 rounded-none px-8",
        icon: "h-8 w-8 rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export type ButtonVariants = typeof buttonVariants;
export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "outline-destructive"
  | "secondary"
  | "ghost"
  | "link"
  | null
  | undefined;
export { Button, buttonVariants };
