import BaseSkeleton, { SkeletonTheme } from "react-loading-skeleton";

function Skeleton() {
  return (
    <BaseSkeleton
      count={3}
      baseColor="red"
      highlightColor="blue"
      width="100px"
      height={"20px"}
    />
  );
}

export default Skeleton;
