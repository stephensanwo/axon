import React, { Fragment, useEffect, useRef, useState } from "react";
import { LabelInput } from "./styles";

interface LabelTextProps {
  label: string;
  style?: object;
  children?: React.ReactChildren;
}

const LabelText: React.FC<LabelTextProps> = (props) => {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(props.label);
  const labelInputRef = useRef<any>(null);

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
    if (labelInputRef && labelInputRef.current && editing === true) {
      labelInputRef.current.focus();
    }
  }, [editing, labelInputRef]);

  return (
    <Fragment>
      {editing ? (
        <LabelInput
          autofocus
          ref={labelInputRef}
          value={data}
          onBlur={handleBlur}
          type="text"
          placeholder = "Enter Label"
          onChange={handleChange}
        />
      ) : (
        <div className="node-label" onClick={handleClick} onBlur={handleBlur}>
          {`${data}`.slice(0, 20)}
          {data.length > 20 ? "..." : ""}
        </div>
      )}
    </Fragment>
  );
};

export default LabelText;
