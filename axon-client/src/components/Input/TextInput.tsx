import styled from "styled-components";
import { TextInput as CarbonTextInput } from "@carbon/react";
import { StateColors, ThemeColors } from "src/shared/themes";

const styleMaps: {
  [key: string]: {
    height: string;
    fontSize: string;
  };
} = {
  sm: {
    height: "24px",
    fontSize: "12px",
  },
  md: {
    height: "32px",
    fontSize: "14px",
  },
  lg: {
    height: "48px",
    fontSize: "16px",
  },
};

export const TextInput = styled(CarbonTextInput).attrs(
  (props: { size: "sm" | "md" | "lg" }) => props
)`
  height: ${({ size = "sm" }) => styleMaps[size].height};
  > div > div > input {
    height: ${({ size = "sm" }) => styleMaps[size].height};
    font-size: ${({ size = "sm" }) => styleMaps[size].fontSize};
    padding-left: 8px;
    padding-right: 32px;
    width: 100%;
    border-radius: 4px;
    color: ${ThemeColors.textLight};

    :disabled {
      color: ${ThemeColors.textDark};
      -webkit-text-fill-color: ${ThemeColors.textDark};
    }

    ::placeholder {
      color: ${ThemeColors.textDark};
    }

    :focus {
      outline: 1px solid ${ThemeColors.primary};
    }
  }

  .cds--text-input__invalid-icon {
    right: 8px;
  }

  [data-invalid="true"] {
    :focus {
      outline: 2px solid ${StateColors.failed};
    }
  }

  [data-invalid="false"] {
    :focus {
      outline: 4px solid ${StateColors.success};
    }
  }
`;

const TextInputWithIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TextInputWithIcon: React.FC<
  React.ComponentProps<typeof TextInput> & {
    icon: React.ReactNode;
    iconposition?: "left" | "right";
  }
> = ({ icon, iconposition = "left", style, ...props }) => {
  return (
    <TextInputWithIconWrapper>
      {iconposition === "left" && (
        <div
          style={{
            width: "24px",
            height: "24px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </div>
      )}
      <TextInput
        size={"sm"}
        {...props}
        style={{
          ...style,
          borderRadius: "4px",
        }}
      />
      {iconposition === "right" && (
        <div
          style={{
            width: "24px",
            height: "24px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </div>
      )}
    </TextInputWithIconWrapper>
  );
};
