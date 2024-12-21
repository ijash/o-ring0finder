import React, { useEffect, useState, useCallback } from "react";
import { DataRepresentation } from "data";
import { getElementWidth } from "utils";
import RingVisualization from "./visualization";

interface ViewportDimensions {
  width: number;
  height: number;
}

const HEIGHT_TO_WIDTH_RATIO = 0.4;
const CONTAINER_ID = "visualContainer";

const useViewportDimensions = (containerId: string) => {
  const [dimensions, setDimensions] = useState<ViewportDimensions>({
    width: 0,
    height: 0,
  });

  const updateDimensions = useCallback(() => {
    const containerWidth = getElementWidth(containerId);
    setDimensions({
      width: containerWidth,
      height: containerWidth * HEIGHT_TO_WIDTH_RATIO,
    });
  }, [containerId]);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  return dimensions;
};

const ModalContent: React.FC<{ ringDimensions: DataRepresentation }> = ({
  ringDimensions,
}) => {
  const viewportDimensions = useViewportDimensions(CONTAINER_ID);

  if (!viewportDimensions.width) {
    return <div id={CONTAINER_ID}>Loading...</div>;
  }

  return (
    <div id="modalVisualization">
      <div className="text-center" id={CONTAINER_ID}>
        <h4 className="h3 text-center">Visualization</h4>
        <RingVisualization
          ringDimensions={ringDimensions}
          dimensions={viewportDimensions}
        />
      </div>

      <div id="modalAttributes">
        <h4 className="h3 text-center mt-3">Attributes</h4>
        <table className="table table-hover table-striped table-sm table-responsive caption-top border border-dark">
          <thead>
            <tr>
              <th className="bg-dark text-light">Attribute</th>
              <th className="bg-dark text-light">Value</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Measurement Standard", value: ringDimensions.standard },
              { label: "Ring Code", value: ringDimensions.code },
              {
                label: "Inner Diameter",
                value: `${ringDimensions.id}${ringDimensions.unit}`,
              },
              {
                label: "Outer Diameter",
                value: `${ringDimensions.od}${ringDimensions.unit}`,
              },
              {
                label: "Cross Section",
                value: `${ringDimensions.cs}${ringDimensions.unit}`,
              },
            ].map(({ label, value }) => (
              <tr key={label}>
                <td>{label}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModalContent;
