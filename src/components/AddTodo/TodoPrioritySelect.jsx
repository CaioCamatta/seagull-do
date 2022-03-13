import React from "react";
import chroma from "chroma-js";
import Select, { StylesConfig, components } from "react-select";
import { GrFlagFill } from "react-icons/gr";

const colourOptions = [
  { value: "low", label: "Low", color: "#FFC400" },
  { value: "medium", label: "Medium", color: "#FF8B00" },
  { value: "high", label: "High", color: "#FF5630" },
];

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <GrFlagFill />
    </components.DropdownIndicator>
  );
};

export default () => (
  <Select
    // defaultValue={colourOptions[0]}
    placeholder="Select Priority..."
    options={colourOptions}
    styles={colourStyles}
    components={{ DropdownIndicator, IndicatorSeparator: () => null }}
    isSearchable={false}
    styles={{
      container: (provided) => ({
        ...provided,
        width: "100%",
      }),
    }}
  />
);
