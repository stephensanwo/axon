import { Fragment, useContext } from "react";
import NoteContext from "src/context/notes";
import { ContentComponent } from "./Router";
import Blank from "../Blank";

const Content = () => {
  const { selectedNode } = useContext(NoteContext);

  return (
    <Fragment>
      {selectedNode?.data?.contentType ? (
        <ContentComponent contentType={selectedNode?.data?.contentType!!} />
      ) : (
        <Blank
          heading="No Content"
          description="Select a node to view content"
          type="info"
        />
      )}
    </Fragment>
  );
};

export default Content;
