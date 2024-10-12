import { useTheme } from "@primer/react";
import BaseSkeleton, {
  SkeletonStyleProps,
  SkeletonTheme,
} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Skeleton({
  count = 4,
  height = 20,
  width = "100%",
  baseColor,
  highlightColor,
  styles,
}: {
  count?: number;
} & SkeletonStyleProps) {
  const { theme } = useTheme();
  return (
    <SkeletonTheme
      baseColor={baseColor ?? theme?.colors.bg.variant1}
      highlightColor={highlightColor ?? theme?.colors.bg.variant2}
      width={width}
      height={height}
    >
      <BaseSkeleton count={count} style={{ ...styles, marginBottom: "4px" }} />
    </SkeletonTheme>
  );
}

export default Skeleton;
