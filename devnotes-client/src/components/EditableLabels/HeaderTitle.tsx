import React, { Fragment, useEffect, useRef, useState } from "react";
import { HeaderTitleInput } from "./styles";

interface HeaderTitleProps {
  title: string;
  style?: object;
  children?: React.ReactChildren;
}

const HeaderTitle: React.FC<HeaderTitleProps> = (props) => {
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
        <HeaderTitleInput
          autofocus
          ref={inputRef}
          value={data}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Header"
          onChange={handleChange}
        />
      ) : (
        <h2 style={props.style} onClick={handleClick} onBlur={handleBlur}>
          {`${data}`.slice(0, 60)}
          {data.length > 60 ? "..." : ""}
        </h2>
      )}
    </Fragment>
  );
};

export default HeaderTitle;
