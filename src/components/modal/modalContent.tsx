import { DataRepresentation } from "data";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { remapPercent, getElementWidth } from "utils";

// Types

interface RingVisualization {
  canvasDimensions: ViewportDimensions;
  innerDiameter: number;
  outerDiameter: number;
  gradientId: string;
  maskId: string;
  calculateGradientOffset: (percentage: number) => number;
}

interface ViewportDimensions {
  width: number;
  height: number;
}

// Constants
const GRADIENT_STOPS = {
  START: 0,
  FIRST_QUARTER: 25,
  MIDDLE: 50,
  THIRD_QUARTER: 75,
  END: 100,
} as const;

const GRADIENT_COLORS = {
  PRIMARY: "black",
  SECONDARY: "#25282B",
  TERTIARY: "#53595F",
} as const;

const RING_CONSTANTS = {
  OPTIMAL_RATIO: 0.86,
  HEIGHT_TO_WIDTH_RATIO: 0.55,
  STROKE_WIDTH: 0.8,
} as const;

const ELEMENT_IDS = {
  GRADIENT: "ringGradient",
  MASK: "ringMask",
  CONTAINER: "visualContainer",
} as const;

// Hooks
const useViewportDimensions = (containerId: string) => {
  const [dimensions, setDimensions] = useState<ViewportDimensions>({
    width: 0,
    height: 0,
  });

  const updateDimensions = useCallback(() => {
    const containerWidth = getElementWidth(containerId);
    setDimensions({
      width: containerWidth,
      height: containerWidth * RING_CONSTANTS.HEIGHT_TO_WIDTH_RATIO,
    });
  }, [containerId]);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  return dimensions;
};

const useRingCalculations = (
  ringDimensions: DataRepresentation,
  viewportDimensions: ViewportDimensions
): RingVisualization | null => {
  return useMemo(() => {
    if (viewportDimensions.width === 0) return null;

    const scaleFactor =
      (RING_CONSTANTS.OPTIMAL_RATIO *
        Math.min(viewportDimensions.width, viewportDimensions.height)) /
      ringDimensions.od;

    return {
      canvasDimensions: viewportDimensions,
      innerDiameter: ringDimensions.id * scaleFactor,
      outerDiameter: ringDimensions.od * scaleFactor,
      gradientId: ELEMENT_IDS.GRADIENT,
      maskId: ELEMENT_IDS.MASK,
      calculateGradientOffset: (percentage: number) =>
        remapPercent(
          ringDimensions.id * scaleFactor,
          ringDimensions.od * scaleFactor,
          percentage
        ),
    };
  }, [ringDimensions, viewportDimensions]);
};

// Component
const ModalContent: React.FC<{ ringDimensions: DataRepresentation }> = ({
  ringDimensions,
}) => {
  const viewportDimensions = useViewportDimensions(ELEMENT_IDS.CONTAINER);
  const ringVisualization = useRingCalculations(
    ringDimensions,
    viewportDimensions
  );

  if (!ringVisualization) {
    return <div id={ELEMENT_IDS.CONTAINER}>Loading...</div>;
  }

  const centerX = viewportDimensions.width / 2;
  const centerY = viewportDimensions.height / 2;

  return (
    <div id="modalVisualization">
      <div className="text-center" id={ELEMENT_IDS.CONTAINER}>
        <h4 className="h4 text-center">Visualization</h4>
        <svg
          width={viewportDimensions.width}
          height={viewportDimensions.height}
          className="shadow-sm rounded-1 border border-dark"
          style={{
            background: "linear-gradient(#F6F7F8, rgb(191, 195, 199))",
          }}
        >
          <defs>
            <radialGradient id={ringVisualization.gradientId}>
              <stop
                offset={`${GRADIENT_STOPS.START}%`}
                stopColor={GRADIENT_COLORS.PRIMARY}
              />
              <stop
                offset={`${ringVisualization.calculateGradientOffset(
                  GRADIENT_STOPS.FIRST_QUARTER
                )}%`}
                stopColor={GRADIENT_COLORS.SECONDARY}
              />
              <stop
                offset={`${ringVisualization.calculateGradientOffset(
                  GRADIENT_STOPS.MIDDLE
                )}%`}
                stopColor={GRADIENT_COLORS.TERTIARY}
              />
              <stop
                offset={`${ringVisualization.calculateGradientOffset(
                  GRADIENT_STOPS.THIRD_QUARTER
                )}%`}
                stopColor={GRADIENT_COLORS.SECONDARY}
              />
              <stop
                offset={`${GRADIENT_STOPS.END}%`}
                stopColor={GRADIENT_COLORS.PRIMARY}
              />
            </radialGradient>
          </defs>

          <mask id={ringVisualization.maskId} maskContentUnits="userSpaceOnUse">
            {/* Outer circle mask */}
            <circle
              cx={centerX}
              cy={centerY}
              r={ringVisualization.outerDiameter / 2}
              fill="white"
            />
            {/* Inner circle mask */}
            <circle
              cx={centerX}
              cy={centerY}
              r={ringVisualization.innerDiameter / 2}
              fill="black"
            />
          </mask>

          {/* Main ring */}
          <circle
            cx={centerX}
            cy={centerY}
            r={ringVisualization.outerDiameter / 2}
            fill={`url(#${ringVisualization.gradientId})`}
            stroke="black"
            strokeWidth={RING_CONSTANTS.STROKE_WIDTH}
            mask={`url(#${ringVisualization.maskId})`}
          />
        </svg>
      </div>

      <div id="modalAttributes">
        <h4 className="h4 text-center ">Attributes</h4>
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
                value: `${ringDimensions.id} ${ringDimensions.unit}`,
              },
              {
                label: "Outer Diameter",
                value: `${ringDimensions.od} ${ringDimensions.unit}`,
              },
              {
                label: "Cross Section",
                value: `${ringDimensions.cs} ${ringDimensions.unit}`,
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
