import { render } from "@testing-library/react";
import NumberInput from "./NumberInput";

describe("NumberInput", () => {
  it("renders without crashing", () => {
    render(
      <NumberInput
        id="test-input"
        value={1}
        setValue={vi.fn()}
        minValue={1}
        maxValue={10}
        step={1}
      />
    );
  });

  it("renders with a suffix", () => {
    render(
      <NumberInput
        id="test-input"
        value={1}
        setValue={vi.fn()}
        minValue={1}
        maxValue={10}
        step={1}
        suffix="px"
      />
    );
  });

  it("increments the value", () => {
    const { getByTestId } = render(
      <NumberInput
        id="test-input"
        value={1}
        setValue={vi.fn()}
        minValue={1}
        maxValue={10}
        step={1}
      />
    );

    const incrementButton = getByTestId("increment-button");
    incrementButton.click();
    expect(getByTestId("test-input")).toHaveValue(2);
  });
});
