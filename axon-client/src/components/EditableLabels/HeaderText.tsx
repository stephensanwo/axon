import React, { useState, useEffect, useRef } from "react";
import { HeaderTextContent, HeaderTextInput } from "./styles";

interface HeaderTextProps {
  title: string;
  mutateTitle: (fieldName: "title" | "description", value: string) => void;
  style?: object;
  children?: React.ReactNode;
  color: string;
}

const HeaderText: React.FC<HeaderTextProps> = (props) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(props.title); // Controlled input value
  const inputRef = useRef<HTMLInputElement>(null);

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
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  useEffect(() => {
    setInputValue(props.title); // Update input value when the title prop changes
  }, [props.title]);

  return (
    <>
      {editing ? (
        <HeaderTextInput
          autoFocus
          ref={inputRef}
          value={inputValue}
          onBlur={handleBlur}
          type="text"
          placeholder="Untitled Node"
          onChange={handleChange}
          color={props.color}
        />
      ) : (
        <HeaderTextContent
          style={props.style}
          onClick={handleClick}
          onBlur={handleBlur}
          color={props.color}
        >
          {`${inputValue}`.slice(0, 25)}
        </HeaderTextContent>
      )}
    </>
  );
};

export default HeaderText;
