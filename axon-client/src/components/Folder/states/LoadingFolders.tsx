import { SkeletonText } from "@carbon/react";
import { ThemeColors } from "src/shared/themes";

const LoadingFolders = () => {
  return (
    <div
      style={{
        width: "90%",
        margin: "auto",
        paddingTop: "24px",
      }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <SkeletonText
          style={{
            height: "32px",
            backgroundColor: ThemeColors.bgDark2,
          }}
          key={index}
        />
      ))}
    </div>
  );
};

export default LoadingFolders;
