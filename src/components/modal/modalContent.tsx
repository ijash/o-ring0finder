import { DataRepresentation } from "data";
import React, { useEffect, useState } from "react";
import { remapPercent, getElementWidth } from "utils";
interface modalContentProps {
  oringData: DataRepresentation;
}

const tableStyle = `

table
table-hover
table-striped
table-sm
table-responsive
table caption-top
border
border-dark
`;
const theadStyle = `
bg-dark text-light
`;

const sectionTitleStyle = `h4 text-center`;

function setRatio(diameter: number, canvas: number) {
  const optimalRatio = 0.86;
  return (optimalRatio * canvas) / diameter;
}

const ModalContent: React.FC<modalContentProps> = (
  props: modalContentProps
) => {
  const oringData = props.oringData;

  const [svgCanvas, setSvgCanvas] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const width = getElementWidth("visualContainer");
    setSvgCanvas({ x: width, y: width * 0.4 });
  }, []); // Empty dependency array runs effect only once after rendering

  const standard = oringData.standard;
  const code = oringData.code;
  const sizeRatio = setRatio(oringData.od, Math.min(svgCanvas.x, svgCanvas.y));
  const id = oringData.id * sizeRatio;
  const od = oringData.od * sizeRatio;
  const cs = oringData.cs * sizeRatio;
  const unit = oringData.unit;
  console.log(">>>>>", sizeRatio);
  const svgProps = {
    std: oringData.standard,
    unit: oringData.unit,
    id: oringData.id * sizeRatio,
    od: oringData.od * sizeRatio,
    cs: oringData.cs * sizeRatio,
    code: oringData.code,
    stroke: 0.8,
    strokeColor: "black",
    maskId: "donutMask",
    gradientId: "oringSkin",
    setPercent: (p: number) => remapPercent(svgProps.id, svgProps.od, p),
  };

  return (
    <div>
      <div>
        <h4 className={sectionTitleStyle}>Attributes</h4>
        <table className={tableStyle}>
          <thead>
            <tr>
              <th className={theadStyle}>Attribute</th>
              <th className={theadStyle}>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Measurement Standard</td>
              <td>{oringData.standard}</td>
            </tr>
            <tr>
              <td>Ring Code</td>
              <td>{oringData.code}</td>
            </tr>
            <tr>
              <td>Inner Diameter</td>
              <td>
                {oringData.id} {oringData.unit}
              </td>
            </tr>
            <tr>
              <td>Outer Diameter</td>
              <td>
                {oringData.od} {oringData.unit}
              </td>
            </tr>
            <tr>
              <td>Cross Section</td>
              <td>
                {oringData.cs} {oringData.unit}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center" id="visualContainer">
        <h4 className={sectionTitleStyle}>Visualization</h4>

        <svg
          id="svg-o-ring"
          width={svgCanvas.x}
          height={svgCanvas.y}
          className="shadow-sm rounded-3 border border-secondary"
          style={{ backgroundColor: "#C3CAD4" }}
        >
          <defs>
            <radialGradient id={svgProps.gradientId}>
              <stop offset="0%" stop-color="black" />
              <stop
                offset={svgProps.setPercent(25) + "%"}
                stop-color="#25282B"
              />
              <stop
                offset={svgProps.setPercent(50) + "%"}
                stop-color="#53595F"
              />
              <stop
                offset={svgProps.setPercent(75) + "%"}
                stop-color="#25282B"
              />
              <stop offset="100%" stop-color="black" />
            </radialGradient>
          </defs>

          <mask id={svgProps.maskId} maskContentUnits="userSpaceOnUse">
            <circle
              name="OD"
              cx={svgCanvas.x / 2}
              cy={svgCanvas.y / 2}
              r={od / 2}
              fill="white"
              // height="60"
            />
            <circle
              name="ID"
              cx={svgCanvas.x / 2}
              cy={svgCanvas.y / 2}
              r={id / 2}
              fill="black"
              // height="50"
            />
          </mask>

          <circle
            name="OD"
            cx={svgCanvas.x / 2}
            cy={svgCanvas.y / 2}
            r={od / 2}
            // fill="#373B3F"
            fill={`url(#${svgProps.gradientId})`}
            stroke={svgProps.strokeColor}
            stroke-width={svgProps.stroke}
            mask={`url(#${svgProps.maskId})`}
            // height="60"
          />
          {/* <rect
            x={svgCanvas.x / 2 + cs}
            y={svgCanvas.y / 2 + od}
            width={cs}
            height={cs}
            fill="gray"
          /> */}
          {/*           
          <text
            x={textSvgPos.x}
            y={textSvgPos.y + 20}
            font-size={10}
            fill="black"
          >
            ID: {id} {unit}
          </text>
          <text
            x={textSvgPos.x}
            y={textSvgPos.y + 40}
            font-size={10}
            fill="black"
          >
            OD: {od} {unit}
          </text>
          <text
            x={textSvgPos.x}
            y={textSvgPos.y + 60}
            font-size={10}
            fill="black"
          >
            CS: {cs} {unit}
          </text> */}
        </svg>
      </div>
    </div>
  );
};

export default ModalContent;
