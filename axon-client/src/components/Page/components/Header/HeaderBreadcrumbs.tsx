import { Box, IconButton } from "@primer/react";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

function HeaderBreadcrumbs({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <IconButton
        icon={() => <PiArrowLeft size={16} />}
        onClick={() => navigate(-1)}
        aria-label="Back"
        size="small"
        variant="invisible"
        sx={{
          flexShrink: 0,
        }}
      />
      <IconButton
        icon={() => <PiArrowRight size={16} />}
        onClick={() => navigate(1)}
        aria-label="Forward"
        size="small"
        variant="invisible"
        sx={{
          flexShrink: 0,
        }}
      />
      {children}
    </Box>
  );
}

export default HeaderBreadcrumbs;
