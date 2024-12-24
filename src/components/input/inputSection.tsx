import React, { useContext, useCallback } from "react";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("global");

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
          <LabelWrapper label={t("inputForms.unit.label")}>
            <SelectInput
              name={t("inputForms.unit.label")}
              options={[
                {
                  name: t("inputForms.unit.placeholder.metric"),
                  value: MeasurementUnit.MM,
                },
                {
                  name: t("inputForms.unit.placeholder.imperial"),
                  value: MeasurementUnit.INCH,
                },
              ]}
              handleChange={handleFilter("unit")}
            ></SelectInput>
          </LabelWrapper>
          <LabelWrapper label={t("inputForms.code.label")}>
            <TextInput
              name={t("inputForms.code.placeholder")}
              id="ringcode"
              handleChange={handleFilter("code")}
            ></TextInput>
          </LabelWrapper>
          <LabelWrapper label={t("inputForms.minId.label")}>
            <NumberInput
              name={t("inputForms.minId.placeholder")}
              id="minid"
              handleChange={handleFilter("minId")}
            ></NumberInput>
          </LabelWrapper>
          <LabelWrapper label={t("inputForms.maxId.label")}>
            <NumberInput
              name={t("inputForms.maxId.placeholder")}
              id="maxid"
              handleChange={handleFilter("maxId")}
            ></NumberInput>
          </LabelWrapper>
        </div>

        <div className="col-sm-4">
          <LabelWrapper label={t("inputForms.minOd.label")}>
            <NumberInput
              name={t("inputForms.minOd.placeholder")}
              id="minod"
              handleChange={handleFilter("minOd")}
            ></NumberInput>
          </LabelWrapper>
          <LabelWrapper label={t("inputForms.maxOd.label")}>
            <NumberInput
              name={t("inputForms.maxOd.placeholder")}
              id="maxod"
              handleChange={handleFilter("maxOd")}
            ></NumberInput>
          </LabelWrapper>
          <LabelWrapper label={t("inputForms.minCs.label")}>
            <NumberInput
              name={t("inputForms.minCs.placeholder")}
              id="mincs"
              handleChange={handleFilter("minCs")}
            ></NumberInput>
          </LabelWrapper>
          <LabelWrapper label={t("inputForms.maxCs.label")}>
            <NumberInput
              name={t("inputForms.maxCs.placeholder")}
              id="maxcs"
              handleChange={handleFilter("maxCs")}
            ></NumberInput>
          </LabelWrapper>
        </div>
      </div>
      <div className="mt-3 col-8 offset-2">
        <ButtonInput
          name="Clear"
          value={t("inputForms.clear")}
          handleChange={handleClear}
        />
      </div>
    </div>
  );
};
