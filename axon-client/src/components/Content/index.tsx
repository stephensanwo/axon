import { Fragment, useContext } from "react";
import NoteContext from "src/context/notes";
import { ContentState } from "./ContentTypes/Shared/ContentState";
import { ContentComponent } from "./ContentTypes/Shared/Router";

const Content = () => {
  const { selectedNode } = useContext(NoteContext);

  return (
    <Fragment>
      {selectedNode?.data?.contentType ? (
        <ContentComponent contentType={selectedNode?.data?.contentType!!} />
      ) : (
        <ContentState
          state="empty"
          description="Select a node to view content"
        />
      )}
    </Fragment>
  );
};

export default Content;
