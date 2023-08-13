import React, { Fragment, useEffect, useRef, useState } from "react";
import { HeaderTextContent, HeaderTextInput } from "./styles";

interface HeaderTextProps {
  title: string;
  style?: object;
  children?: React.ReactNode;
}

const HeaderText: React.FC<HeaderTextProps> = (props) => {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(props.title);
  const inputRef = useRef<any>(null);

  const handleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    // Update the global context with data
  };

  const handleChange = (e: any) => {
    setData(e.target.value);
  };

  useEffect(() => {
    if (inputRef && inputRef.current && editing === true) {
      inputRef.current.focus();
    }
  }, [editing, inputRef]);

  return (
    <Fragment>
      {editing ? (
        <HeaderTextInput
          autofocus
          ref={inputRef}
          value={data}
          onBlur={handleBlur}
          type="text"
          placeholder="Untitled Node"
          onChange={handleChange}
        />
      ) : (
        <HeaderTextContent
          style={props.style}
          onClick={handleClick}
          onBlur={handleBlur}
        >
          {`${data}`.slice(0, 20)}
          {data.length > 20 ? "..." : ""}
        </HeaderTextContent>
      )}
    </Fragment>
  );
};

export default HeaderText;
