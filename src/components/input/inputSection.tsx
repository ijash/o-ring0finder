import React from "react";
import { LabelWrapper, StandardElementProps } from "components/common";
import oringSpec from "assets/img/oring-spec.jpg";
import {} from "components";
import {
  SelectInput,
  NumberInput,
  TextInput,
} from "components/input/formInput";

interface props extends StandardElementProps {}

export const InputSection: React.FC<props> = () => {
  return (
    <div>
      <div className="row text-start">
        <div
          className="
              col-sm-4
              order-sm-last"
        >
          <img
            src={oringSpec}
            alt="O-ring Specifications"
            className="
                shadow-sm
                d-flex
                mx-auto
                rounded-3
                h-100
                "
          />
        </div>

        <div className="col-sm-4">
          <LabelWrapper label="Unit">
            <SelectInput
              name="Unit"
              options={[
                { name: "Metric(mm)", value: "mm" },
                { name: "Imperial(Inch)", value: "inch" },
              ]}
            ></SelectInput>
          </LabelWrapper>
          <LabelWrapper label="Code">
            <TextInput name="Ring Code" id="ringcode"></TextInput>
          </LabelWrapper>
          <LabelWrapper label="Min ID">
            <NumberInput name="Min ID" id="minid"></NumberInput>
          </LabelWrapper>
          <LabelWrapper label="Max ID">
            <NumberInput name="Max ID" id="maxid"></NumberInput>
          </LabelWrapper>
        </div>
        <div className="col-sm-4">
          <LabelWrapper label="Min OD">
            <NumberInput name="Min OD" id="minod"></NumberInput>
          </LabelWrapper>
          <LabelWrapper label="Max OD">
            <NumberInput name="Max OD" id="maxod"></NumberInput>
          </LabelWrapper>
          <LabelWrapper label="Min CS">
            <NumberInput name="Min CS" id="mincs"></NumberInput>
          </LabelWrapper>
          <LabelWrapper label="Max CS">
            <NumberInput name="Max CS" id="maxcs"></NumberInput>
          </LabelWrapper>
        </div>
      </div>
    </div>
  );
};
