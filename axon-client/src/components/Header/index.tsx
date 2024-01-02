import { useContext } from "react";
import { Header as CarbonHeader, HeaderMenuButton } from "@carbon/react";
import AppContext from "../../context/app";
import axonLogoSmall from "../../assets/icons/axon-logo-small.svg";
import AuthContext from "src/context/auth";
import PageHeader from "./PageHeader";
import NoteContext from "src/context/notes";

const Header: React.FC<{
  isPublic?: boolean;
}> = ({ isPublic }) => {
  const { isSideNavExpanded, onClickSideNavExpand } = useContext(AppContext);
  const { isSignedIn } = useContext(AuthContext);

  const handleSideNav = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation(); // stop the event propagation for the outside click
    if (isSideNavExpanded === true) {
      onClickSideNavExpand(false);
    } else {
      onClickSideNavExpand(true);
    }
  };

  return (
    <CarbonHeader
      aria-label=""
      style={{
        height: "35px",
      }}
    >
      <div
        style={{
          // width: "377.5px",
          width: "250px",
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        {!isPublic && isSignedIn ? (
          <HeaderMenuButton
            aria-label="Open menu"
            isCollapsible
            onClick={handleSideNav}
            isActive={isSideNavExpanded}
            style={{
              width: "40px",
              height: "35px",
            }}
          />
        ) : (
          !isPublic && (
            <div
              style={{
                width: "40px",
                height: "35px",
              }}
            ></div>
          )
        )}
        <div>
          <img src={axonLogoSmall} alt="axon-logo" />
        </div>
      </div>
      {!isPublic && isSignedIn && <PageHeader />}
    </CarbonHeader>
  );
};

export default Header;
