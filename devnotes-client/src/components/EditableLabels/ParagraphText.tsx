import React, { Fragment, useEffect, useRef, useState } from "react";
import { ParagraphInput } from "./styles";

interface ParagraphTextProps {
  description: string;
  style?: object;
  children?: React.ReactChildren;
}

const ParagraphText: React.FC<ParagraphTextProps> = (props) => {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(props.description);
  const paragraphInputRef = useRef<any>(null);

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
    if (paragraphInputRef && paragraphInputRef.current && editing === true) {
      paragraphInputRef.current.focus();
    }
  }, [editing, paragraphInputRef]);

  return (
    <Fragment>
      {editing ? (
        <ParagraphInput
          autofocus
          ref={paragraphInputRef}
          value={data}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Header"
          onChange={handleChange}
        />
      ) : (
        <div
          className="node-description"
          onClick={handleClick}
          onBlur={handleBlur}
        >
          {`${props.description}`.slice(0, 100)}
          {props.description.length > 100 ? "..." : ""}
        </div>
      )}
    </Fragment>
  );
};

export default ParagraphText;
