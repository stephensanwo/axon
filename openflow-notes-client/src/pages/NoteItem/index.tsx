import { useState, useEffect } from "react";
import { PageContainer, MobileWarningDiv } from "../../shared/layout";
import { NoteContextProvider } from "../../context/notes";
import NoteItemContent from "./NoteItemContent";

const FlowItem: React.FC = () => {
  const [showMobileWarning, setShowMobileWarning] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 800) setShowMobileWarning(true);
  }, []);
  return (
    <NoteContextProvider>
      {showMobileWarning ? (
        <MobileWarningDiv>
          <p>
            <strong>OpenFlow</strong> is not supported on this screen size,
            Please open on a desktop browser
          </p>
        </MobileWarningDiv>
      ) : (
        <PageContainer dark>
          <NoteItemContent />
        </PageContainer>
      )}
    </NoteContextProvider>
  );
};

export default FlowItem;
