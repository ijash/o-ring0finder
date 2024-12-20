import React, { useContext, useCallback } from "react";
import { debounce } from "lodash";

import oringSpec from "assets/img/oring-spec.jpg";

import { FilterContext } from "components/context";
import { LabelWrapper, StandardElementProps } from "components/common";
import { IDataFilter, MeasurementUnit } from "data";
import {
  SelectInput,
  NumberInput,
  TextInput,
  ButtonInput,
} from "components/input/formInput";

interface props extends StandardElementProps {}

export const InputSection: React.FC<props> = () => {
  const filterContext = useContext(FilterContext);

  const updateContextDelay = 897; //milliseconds
  const setFilterDebounced = useCallback(
    debounce((filter) => {
      filterContext.setFilter(filter);
    }, updateContextDelay),
    [filterContext, updateContextDelay]
  );

  const handleFilter = (filterName: keyof IDataFilter) => {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const filterValue = {
        ...filterContext.filter,
        [filterName]: event.target.value,
      };

      setFilterDebounced(filterValue);
    };
  };

  const handleClear = () => {
    filterContext.setFilter({
      unit: filterContext.filter.unit,
    });
    // clear all inputs
    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });

    window.scrollTo(0, 0);
  };

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
                { name: "Metric(mm)", value: MeasurementUnit.MM },
                { name: "Imperial(Inch)", value: MeasurementUnit.INCH },
              ]}
              handleChange={handleFilter("unit")}
            ></SelectInput>
          </LabelWrapper>
          <LabelWrapper label="Code">
            <TextInput
              name="Ring Code"
              id="ringcode"
              handleChange={handleFilter("code")}
            ></TextInput>
          </LabelWrapper>
          <LabelWrapper label="Min ID">
            <NumberInput
              name="Min ID"
              id="minid"
              handleChange={handleFilter("minId")}
            ></NumberInput>
          </LabelWrapper>
          <LabelWrapper label="Max ID">
            <NumberInput
              name="Max ID"
              id="maxid"
              handleChange={handleFilter("maxId")}
            ></NumberInput>
          </LabelWrapper>
        </div>

        <div className="col-sm-4">
          <LabelWrapper label="Min OD">
            <NumberInput
              name="Min OD"
              id="minod"
              handleChange={handleFilter("minOd")}
            ></NumberInput>
          </LabelWrapper>
          <LabelWrapper label="Max OD">
            <NumberInput
              name="Max OD"
              id="maxod"
              handleChange={handleFilter("maxOd")}
            ></NumberInput>
          </LabelWrapper>
          <LabelWrapper label="Min CS">
            <NumberInput
              name="Min CS"
              id="mincs"
              handleChange={handleFilter("minCs")}
            ></NumberInput>
          </LabelWrapper>
          <LabelWrapper label="Max CS">
            <NumberInput
              name="Max CS"
              id="maxcs"
              handleChange={handleFilter("maxCs")}
            ></NumberInput>
          </LabelWrapper>
        </div>
      </div>
      <div className="mt-3 col-8 offset-2">
        <ButtonInput
          name="Clear"
          value="Clear Inputs"
          handleChange={handleClear}
        />
      </div>
    </div>
  );
};
