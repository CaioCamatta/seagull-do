import React, { useEffect, useState } from "react";
import Select from "react-select";

const TodoFolderSelect = ({ setFolder, folders, hideBorder, defaultValue }) => {
  const [folderOptions, setFolderOptions] = useState();

  useEffect(() => {
    const temp = [];

    for (let key of Object.keys(folders)) {
      temp.push({ value: key, label: folders[key].name });
    }

    setFolderOptions(temp);
  }, [folders]);

  console.log({ folderOptions });

  const defaultOption = folderOptions?.find(
    (element) => element.value === defaultValue
  );

  if (folderOptions === undefined) return "...";

  return (
    <Select
      options={folderOptions}
      placeholder="Folder"
      components={{ IndicatorSeparator: () => null }}
      isSearchable={false}
      styles={{
        container: (provided) => ({
          ...provided,
          width: "100%",
        }),
        control: (base, state) => ({
          ...base,
          border: hideBorder ? (state.isFocused ? 0 : 0) : base.border,
        }),
      }}
      onChange={({ value }) => {
        setFolder(value);
      }}
      // defaultInputValue={"3"}
      defaultValue={defaultOption}
    />
  );
};

export default TodoFolderSelect;
