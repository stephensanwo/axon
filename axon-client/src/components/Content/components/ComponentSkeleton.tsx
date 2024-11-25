import { Skeleton } from "../../Common/Skeleton";
import { Box } from "@primer/react";

function ComponentSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Skeleton className="h-[14px] mb-2" />
      <Skeleton className="h-[150px] mb-2" />
      <Skeleton className="flex-grow" />
    </Box>
  );
}

export default ComponentSkeleton;
