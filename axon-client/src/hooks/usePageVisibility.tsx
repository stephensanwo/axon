import { useEffect } from "react";

/**
 * Custom hook to detect when the user leaves the page, browser, or comes back.
 * It accepts callbacks for each action.
 *
 * @param onPageLeave - Function to be called when the page is hidden or the user leaves the browser
 * @param onPageReturn - Function to be called when the page or browser becomes visible/active again
 */
function usePageVisibility(onPageLeave: () => void, onPageReturn: () => void) {
  useEffect(() => {
    // Function to handle visibility changes (tabs or window visibility)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        onPageLeave(); // Page is hidden
      } else if (document.visibilityState === "visible") {
        onPageReturn(); // Page is visible again
      }
    };

    // Handle window blur/focus events (browser or app focus)
    const handleWindowBlur = () => {
      onPageLeave(); // Browser is out of focus (user switches apps or minimizes)
    };

    const handleWindowFocus = () => {
      onPageReturn(); // Browser is focused again
    };

    // Attach event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    // Cleanup listeners on component unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [onPageLeave, onPageReturn]);
}

export default usePageVisibility;
