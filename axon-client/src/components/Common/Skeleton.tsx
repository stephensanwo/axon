import { cn } from "src/lib/utils";

function Skeleton({
  className,
  count = 1,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  count?: number;
}) {
  return (
    <>
      {Array.from({ length: count ?? 1 }).map((_, index) => (
        <div
          className={cn("animate-pulse rounded-none bg-foreground", className)}
          {...props}
        />
      ))}
    </>
  );
}

export { Skeleton };
