import { render, screen } from "@testing-library/react";
import CodeEditor from "./Editor";

describe("CodeEditor", () => {
  it("renders the code editor component", () => {
    render(<CodeEditor />);
    const codeEditorElement = screen.getByRole("textbox");
    expect(codeEditorElement).toBeInTheDocument();
  });

  it("renders the code editor with default value", () => {
    const defaultValue = "// Start adding code here";
    render(<CodeEditor defaultValue={defaultValue} />);
    const codeEditorElement = screen.getByRole("textbox");
    expect(codeEditorElement).toHaveValue(defaultValue);
  });

  // Add more test cases as needed
});
