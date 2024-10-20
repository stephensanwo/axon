import Skeleton from "../Skeleton";
import { Box } from "@primer/react";

function ContentSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Skeleton count={1} height={14} />
      <Skeleton count={1} height={150} />
      <Skeleton count={4} height={14} />
    </Box>
  );
}

export default ContentSkeleton;
