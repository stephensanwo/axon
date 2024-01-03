import { fireEvent, waitFor, render, screen } from "@testing-library/react";
import NumberInput from "./NumberInput";

describe("NumberInput", () => {
  let mockProps = {
    node_id: "123456789",
    value: 2,
    minValue: 1,
    maxValue: 10,
    step: 1,
    suffix: "px",
  };
  let renderedValue: string | null = "";
  let numberInputComponent: HTMLElement | null;
  let decreaseButton: HTMLElement | null;
  let increaseButton: HTMLElement | null;

  describe("NumberInput Component", () => {
    beforeEach(() => {
      const { container } = render(
        <NumberInput
          id={mockProps.node_id}
          value={mockProps.value}
          setValue={(newValue: number) => {
            renderedValue = `${newValue}${mockProps.suffix || ""}`;
          }}
          minValue={mockProps.minValue}
          maxValue={mockProps.maxValue}
          step={mockProps.step}
          suffix={mockProps.suffix}
        />
      );
      numberInputComponent = container.querySelector(
        `#number-input-${mockProps.node_id}`
      );
      decreaseButton = container.querySelector(
        `#decrease-${mockProps.node_id}`
      );
      increaseButton = container.querySelector(
        `#increase-${mockProps.node_id}`
      );
    });

    test("renders with a suffix if provided", () => {
      const renderedValue = screen.queryByText(/2px/i);
      expect(renderedValue).toBeVisible();
    });

    test("renders each children component with the passed node id", () => {
      expect(numberInputComponent).toBeVisible();
      expect(decreaseButton).toBeVisible();
      expect(increaseButton).toBeVisible();
    });

    test("increments the value", async () => {
      fireEvent.click(increaseButton!);
      await waitFor(() => {
        expect(renderedValue).toContain("3px");
      });
    });

    test("decrements the value", async () => {
      fireEvent.click(decreaseButton!);
      await waitFor(() => {
        expect(renderedValue).toContain("1px");
      });
    });
  });

  describe("NumberInput Max Value", () => {
    const newMockProps = {
      ...mockProps,
      value: 10,
    };
    beforeEach(() => {
      const { container } = render(
        <NumberInput
          id={newMockProps.node_id}
          value={newMockProps.value}
          setValue={(newValue: number) => {
            renderedValue = `${newValue}${newMockProps.suffix || ""}`;
          }}
          minValue={newMockProps.minValue}
          maxValue={newMockProps.maxValue}
          step={newMockProps.step}
          suffix={newMockProps.suffix}
        />
      );
      increaseButton = container.querySelector(
        `#increase-${newMockProps.node_id}`
      );
    });

    test("does not increment the value past the max value", async () => {
      fireEvent.click(increaseButton!);
      await waitFor(() => {
        expect(renderedValue).toContain("10px");
      });
    });
  });

  describe("NumberInput Min Value", () => {
    const newMockProps = {
      ...mockProps,
      value: 1,
    };

    beforeEach(() => {
      const { container } = render(
        <NumberInput
          id={newMockProps.node_id}
          value={newMockProps.value}
          setValue={(newValue: number) => {
            renderedValue = `${newValue}${newMockProps.suffix || ""}`;
          }}
          minValue={newMockProps.minValue}
          maxValue={newMockProps.maxValue}
          step={newMockProps.step}
          suffix={newMockProps.suffix}
        />
      );
      decreaseButton = container.querySelector(
        `#decrease-${newMockProps.node_id}`
      );
    });

    test("does not decrement the value past the min value", async () => {
      fireEvent.click(decreaseButton!);
      await waitFor(() => {
        expect(renderedValue).toContain("1px");
      });
    });
  });
});
