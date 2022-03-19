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
    border: "black 1px solid",
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 17,
    width: 17,
  },
});

const colourStyles = {
  container: (provided) => ({
    ...provided,
    width: "100%",
  }),
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
  // dropDown
};

const DropdownIndicator = (props) => {
  let color;

  if (props.hasValue) {
    color = props.getValue()[0].color;
  }

  return (
    <components.DropdownIndicator {...props}>
      <GrFlagFill color={color} />
    </components.DropdownIndicator>
  );
};

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "red" : "blue",
    padding: 20,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 200,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

export default ({ setPriority }) => (
  <Select
    // defaultValue={colourOptions[0]}
    placeholder="Select Priority..."
    options={colourOptions}
    styles={colourStyles}
    components={{ DropdownIndicator, IndicatorSeparator: () => null }}
    isSearchable={false}
    onChange={({ value }) => {
      setPriority(value);
    }}
  />
);
