import { Link as PrimerLink, useTheme } from "@primer/react";
import { Truncate } from "@primer/react";
import { useNavigate } from "react-router-dom";

interface LinkProps {
  truncateText?: number;
  text: string;
  to: string;
}
function Link({ truncateText, text, to }: LinkProps) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  return (
    <PrimerLink
      sx={{
        color: theme?.colors?.text.white,
        textDecoration: "none",
        cursor: "pointer",
        ":hover": {
          textDecoration: "none",
        },
      }}
      hoverColor={theme?.colors?.text.primary}
      inline={false}
    >
      {truncateText ? (
        <Truncate
          title={text}
          maxWidth={truncateText}
          onClick={() => navigate(`${to}`)}
        >
          {text}
        </Truncate>
      ) : (
        text
      )}
    </PrimerLink>
  );
}

export default Link;
