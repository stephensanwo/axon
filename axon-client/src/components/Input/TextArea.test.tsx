import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { TextArea } from "./TextArea";

describe("TextArea", () => {
  let defaultValue = "New Text";
  let newValue = "Updated value";

  beforeEach(() => {
    render(<TextArea defaultValue={defaultValue} />);
  });

  test("renders the textarea component", () => {
    const textareaElement = screen.getByRole("textbox");
    expect(textareaElement).toBeVisible();
  });

  test("renders the textarea with default value", () => {
    const textareaElement = screen.getByRole("textbox");
    expect(textareaElement).toHaveValue(defaultValue);
  });

  test("updates the value of the textarea", () => {
    const textareaElement = screen.getByRole("textbox");
    expect(textareaElement).toHaveValue(defaultValue);

    fireEvent.change(textareaElement, { target: { value: newValue } });

    expect(textareaElement).toHaveValue(newValue);
  });
});
