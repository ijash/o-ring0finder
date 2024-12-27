import React, { useEffect } from "react";

const GoatCounter: React.FC = () => {
  useEffect(() => {
    const handleLoad = () => {
      const script = document.createElement("script");

      script.src = "//gc.zgo.at/count.js";
      script.async = true;
      if (process.env.GOAT_COUNTER_ID) {
        script.dataset.goatcounter = `https://${process.env.REACT_APP_GOAT_COUNTER_ID}.goatcounter.com/count`;
      } else {
        console.error("GOAT_COUNTER_ID is not defined");
      }

      document.body.appendChild(script);
    };

    // Attach the event listener for window load
    window.addEventListener("load", handleLoad);

    // Cleanup: remove event listener
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return null; // No UI for this component
};

export default GoatCounter;
