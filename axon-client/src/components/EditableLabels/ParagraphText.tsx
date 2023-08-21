import React, { useState, useEffect, useRef } from "react";
import { ParagraphInput, ParagraphTextContent } from "./styles";

interface ParagraphTextProps {
  description: string;
  mutateDescription: (
    fieldName: "title" | "description",
    value: string
  ) => void;
  style?: object;
  children?: React.ReactNode;
  color: string;
}

const ParagraphText: React.FC<ParagraphTextProps> = (props) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(props.description); // Controlled input value
  const paragraphInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    // Update the global context with data
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (editing && paragraphInputRef.current) {
      paragraphInputRef.current.focus();
    }
  }, [editing]);

  useEffect(() => {
    setInputValue(props.description); // Update input value when the description prop changes
  }, [props.description]);

  return (
    <>
      {editing ? (
        <ParagraphInput
          autoFocus
          ref={paragraphInputRef}
          value={inputValue}
          onBlur={handleBlur}
          type="text"
          placeholder="Node Text"
          onChange={handleChange}
          rows={2}
          color={props.color}
        />
      ) : (
        <ParagraphTextContent
          onClick={handleClick}
          onBlur={handleBlur}
          color={props.color}
        >
          {`${inputValue}`.slice(0, 100)}
          {inputValue.length > 100 ? "..." : ""}
        </ParagraphTextContent>
      )}
    </>
  );
};

export default ParagraphText;
