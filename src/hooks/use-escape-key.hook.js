import React from "react";

const useEscapeKey = (keyDownFunction) => {
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        keyDownFunction(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyDownFunction]);
};

export default useEscapeKey;
