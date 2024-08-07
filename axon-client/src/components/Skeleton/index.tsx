import BaseSkeleton, {
  SkeletonStyleProps,
  SkeletonTheme,
  SkeletonThemeProps,
} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Skeleton({
  count = 4,
  height = 20,
  width = "100%",
  baseColor = "#f0f0f0",
  highlightColor = "#e0e0e0",
}: {
  count?: number;
} & SkeletonStyleProps) {
  return (
    <SkeletonTheme
      baseColor={baseColor}
      highlightColor={highlightColor}
      width={width}
      height={height}
    >
      <BaseSkeleton count={count} style={{ marginBottom: "4px" }} />
    </SkeletonTheme>
  );
}

export default Skeleton;
