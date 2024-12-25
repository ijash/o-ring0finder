import { DataRepresentation } from "data";
import React from "react";

interface ViewportDimensions {
  width: number;
  height: number;
}

interface VisualizationProps {
  ringDimensions: DataRepresentation;
  dimensions: ViewportDimensions;
}

const GRADIENT = {
  ID: "ringGradient",
  STOPS: {
    START: 0,
    QUARTER: 25,
    HALF: 50,
    THREE_QUARTERS: 75,
    END: 100,
  },
  COLORS: {
    PRIMARY: "black",
    SECONDARY: "#25282B",
    TERTIARY: "#53595F",
  },
} as const;

const RING = {
  OPTIMAL_RATIO: 0.86,
  STROKE_WIDTH: 0.8,
  MASK_ID: "ringMask",
} as const;

const DIMENSION_LINE = {
  STROKE_COLOR: " #3388B9 ",
  STROKE_WIDTH: 1.1,
  DASH_ARRAY: 2,
} as const;

const RING_SIZE_LABEL = {
  COLOR: " #336E90 ",
  STROKE_WIDTH: 0.5,
  FONT_SIZE: 11,
  FONT_FAMILY: "monospace,Ubuntu, Helvetica, Arial, sans-serif",
  FONT_VARIANT: "normal",
} as const;

const RingVisualization: React.FC<VisualizationProps> = ({
  ringDimensions,
  dimensions,
}) => {
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;

  // Calculate ring sizes
  const scaleFactor =
    (RING.OPTIMAL_RATIO * Math.min(dimensions.width, dimensions.height)) /
    ringDimensions.od;
  const innerDiameter = ringDimensions.id * scaleFactor;
  const outerDiameter = ringDimensions.od * scaleFactor;

  // Helper function to calculate gradient offsets
  const calculateGradientOffset = (percentage: number) =>
    ((innerDiameter + (outerDiameter - innerDiameter) * (percentage / 100)) /
      outerDiameter) *
    100;

  // Calculate dimension lines coordinates
  const getLineCoordinates = () => {
    const margin = 20;
    // const lineLength = 40;

    return {
      od: {
        arrow: {
          x1: centerX - outerDiameter / 2 - margin,
          y1: centerY - outerDiameter / 2,
          x2: centerX - outerDiameter / 2 - margin,
          y2: centerY + outerDiameter / 2,
        },
        upperDash: {
          x1: centerX - outerDiameter / 2 - margin,
          y1: centerY - outerDiameter / 2,
          x2: centerX,
          y2: centerY - outerDiameter / 2,
        },
        lowerDash: {
          x1: centerX - outerDiameter / 2 - margin,
          y1: centerY + outerDiameter / 2,
          x2: centerX + outerDiameter / 2 + margin,
          y2: centerY + outerDiameter / 2,
        },
      },
      id: {
        arrow: {
          x1: centerX + outerDiameter / 2 + margin,
          y1: centerY - innerDiameter / 2,
          x2: centerX + outerDiameter / 2 + margin,
          y2: centerY + innerDiameter / 2,
        },
        upperDash: {
          x1: centerX,
          y1: centerY - innerDiameter / 2,
          x2: centerX + outerDiameter / 2 + margin,
          y2: centerY - innerDiameter / 2,
        },
        lowerDash: {
          x1: centerX,
          y1: centerY + innerDiameter / 2,
          x2: centerX + outerDiameter / 2 + margin,
          y2: centerY + innerDiameter / 2,
        },
      },
      cs: {
        arrow: {
          x1: centerX + outerDiameter / 2 + margin,
          y1: centerY + innerDiameter / 2,
          x2: centerX + outerDiameter / 2 + margin,
          y2: centerY + outerDiameter / 2,
        },
      },
    };
  };
  // function getCSPosOffset(
  //   dimensions: { height: number },
  //   outerDiameter: number,
  //   innerDiameter: number
  // ): number {
  //   const cs = (outerDiameter - innerDiameter) / 2;
  //   const range = dimensions.height - outerDiameter;
  //   const csRange = remapPercent(30, 100, (Math.min(cs, range) / range) * 100);
  //   const result = -csRange * 0.1;
  //   return Math.round(result * 100) / 100;
  // }

  const lines = getLineCoordinates();
  //   const labelMargins = (centerX - outerDiameter) * 0.2;
  const labelMargins = 10;
  return (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      className="shadow-sm rounded-1 border border-dark"
      style={{
        background: "linear-gradient(#F6F7F8, rgb(191, 195, 199))",
      }}
    >
      <defs>
        <radialGradient id={GRADIENT.ID}>
          <stop
            offset={`${GRADIENT.STOPS.START}%`}
            stopColor={GRADIENT.COLORS.PRIMARY}
          />
          <stop
            offset={`${calculateGradientOffset(GRADIENT.STOPS.QUARTER)}%`}
            stopColor={GRADIENT.COLORS.SECONDARY}
          />
          <stop
            offset={`${calculateGradientOffset(GRADIENT.STOPS.HALF)}%`}
            stopColor={GRADIENT.COLORS.TERTIARY}
          />
          <stop
            offset={`${calculateGradientOffset(
              GRADIENT.STOPS.THREE_QUARTERS
            )}%`}
            stopColor={GRADIENT.COLORS.SECONDARY}
          />
          <stop
            offset={`${GRADIENT.STOPS.END}%`}
            stopColor={GRADIENT.COLORS.PRIMARY}
          />
        </radialGradient>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
          fill={DIMENSION_LINE.STROKE_COLOR}
        >
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>

      <mask id={RING.MASK_ID} maskContentUnits="userSpaceOnUse">
        <circle cx={centerX} cy={centerY} r={outerDiameter / 2} fill="white" />
        <circle cx={centerX} cy={centerY} r={innerDiameter / 2} fill="black" />
      </mask>

      {/* Main ring */}
      <circle
        cx={centerX}
        cy={centerY}
        r={outerDiameter / 2}
        fill={`url(#${GRADIENT.ID})`}
        stroke="black"
        strokeWidth={RING.STROKE_WIDTH}
        mask={`url(#${RING.MASK_ID})`}
      />

      {/* Dimension lines */}
      <g id="dimensionLines">
        {/* OD lines */}
        <line
          {...lines.od.arrow}
          stroke={DIMENSION_LINE.STROKE_COLOR}
          strokeWidth={DIMENSION_LINE.STROKE_WIDTH}
          markerEnd="url(#arrow)"
          markerStart="url(#arrow)"
        />
        <line
          {...lines.od.upperDash}
          stroke={DIMENSION_LINE.STROKE_COLOR}
          strokeWidth={DIMENSION_LINE.STROKE_WIDTH}
          strokeDasharray={DIMENSION_LINE.DASH_ARRAY}
        />
        <line
          {...lines.od.lowerDash}
          stroke={DIMENSION_LINE.STROKE_COLOR}
          strokeWidth={DIMENSION_LINE.STROKE_WIDTH}
          strokeDasharray={DIMENSION_LINE.DASH_ARRAY}
        />

        {/* ID lines */}
        <line
          {...lines.id.arrow}
          stroke={DIMENSION_LINE.STROKE_COLOR}
          strokeWidth={DIMENSION_LINE.STROKE_WIDTH}
          markerEnd="url(#arrow)"
          markerStart="url(#arrow)"
        />
        <line
          {...lines.id.upperDash}
          stroke={DIMENSION_LINE.STROKE_COLOR}
          strokeWidth={DIMENSION_LINE.STROKE_WIDTH}
          strokeDasharray={DIMENSION_LINE.DASH_ARRAY}
        />
        <line
          {...lines.id.lowerDash}
          stroke={DIMENSION_LINE.STROKE_COLOR}
          strokeWidth={DIMENSION_LINE.STROKE_WIDTH}
          strokeDasharray={DIMENSION_LINE.DASH_ARRAY}
        />

        {/* CS line */}
        <line
          {...lines.cs.arrow}
          stroke={DIMENSION_LINE.STROKE_COLOR}
          strokeWidth={DIMENSION_LINE.STROKE_WIDTH}
          markerEnd="url(#arrow)"
          markerStart="url(#arrow)"
        />
      </g>

      {/* Dimension labels */}
      <g id="dimensionLabels">
        <text
          x={lines.od.arrow.x1 - labelMargins}
          y={centerY}
          textAnchor="end"
          dominantBaseline="middle"
          fill={RING_SIZE_LABEL.COLOR}
          fontSize={RING_SIZE_LABEL.FONT_SIZE}
          fontFamily={RING_SIZE_LABEL.FONT_FAMILY}
          fontVariant={RING_SIZE_LABEL.FONT_VARIANT}
        >
          <tspan x={lines.od.arrow.x1 - labelMargins} dy="-3">
            OD
          </tspan>
          <tspan x={lines.od.arrow.x1 - labelMargins} dy="10">
            {ringDimensions.od + ringDimensions.unit}
          </tspan>
        </text>
        <text
          x={lines.id.arrow.x1 + labelMargins}
          y={centerY}
          textAnchor="start"
          dominantBaseline="middle"
          fill={RING_SIZE_LABEL.COLOR}
          fontSize={RING_SIZE_LABEL.FONT_SIZE}
          fontFamily={RING_SIZE_LABEL.FONT_FAMILY}
          fontVariant={RING_SIZE_LABEL.FONT_VARIANT}
        >
          <tspan x={lines.id.arrow.x1 + labelMargins} dy="-3">
            ID
          </tspan>
          <tspan x={lines.id.arrow.x1 + labelMargins} dy="10">
            {ringDimensions.id + ringDimensions.unit}
          </tspan>
        </text>
        <text
          x={lines.cs.arrow.x1 + labelMargins}
          y={(lines.cs.arrow.y2 - lines.cs.arrow.y1) / 2 + lines.cs.arrow.y1}
          textAnchor="start"
          dominantBaseline="middle"
          fill={RING_SIZE_LABEL.COLOR}
          fontSize={RING_SIZE_LABEL.FONT_SIZE}
          fontFamily={RING_SIZE_LABEL.FONT_FAMILY}
          fontVariant={RING_SIZE_LABEL.FONT_VARIANT}
        >
          <tspan
            x={lines.cs.arrow.x1 + labelMargins}
            dy={"-10"}
            // TODO: fix using dynamic position, below has unknown glitch. `dy` result is the same with quoted one but  different position
            // //ERROR ANEH!
            // dy={((
            //   dimensions: { height: number },
            //   outerDiameter: number,
            //   innerDiameter: number
            // ): number =>
            //   Math.round(
            //     -remapPercent(
            //       30,
            //       100,
            //       (Math.min(
            //         (outerDiameter - innerDiameter) / 2,
            //         dimensions.height - outerDiameter
            //       ) /
            //         (dimensions.height - outerDiameter)) *
            //         100
            //     ) *
            //       0.1 *
            //       100
            //   ) / 100)(dimensions, outerDiameter, innerDiameter)}
          >
            CS
          </tspan>
          <tspan x={lines.cs.arrow.x1 + labelMargins} dy="10">
            {ringDimensions.cs + ringDimensions.unit}
          </tspan>
        </text>
      </g>
    </svg>
  );
};

export default RingVisualization;
