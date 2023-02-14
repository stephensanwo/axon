import React, { Fragment, useEffect, useRef, useState } from "react";
import { HeaderTextInput } from "./styles";

interface HeaderTextProps {
  title: string;
  style?: object;
  children?: React.ReactChildren;
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
          placeholder="Enter Header"
          onChange={handleChange}
        />
      ) : (
        <h5 style={props.style} onClick={handleClick} onBlur={handleBlur}>
          {`${data}`.slice(0, 20)}
          {data.length > 20 ? "..." : ""}
        </h5>
      )}
    </Fragment>
  );
};

export default HeaderText;
