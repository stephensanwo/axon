import React, { Fragment, useEffect, useRef, useState } from "react";
import { ParagraphInput, ParagraphTextContent } from "./styles";

interface ParagraphTextProps {
  description: string;
  style?: object;
  children?: React.ReactNode;
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
          placeholder="Node Text"
          onChange={handleChange}
          rows={2}
        />
      ) : (
        <ParagraphTextContent onClick={handleClick} onBlur={handleBlur}>
          {`${data}`.slice(0, 100)}
          {data.length > 100 ? "..." : ""}
        </ParagraphTextContent>
      )}
    </Fragment>
  );
};

export default ParagraphText;
