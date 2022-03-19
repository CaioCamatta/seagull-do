import React, { useEffect, useState } from "react";
import Select from "react-select";

const TodoFolderSelect = ({ setFolder, folders, hideBorder }) => {
  const [folderOptions, setFolderOptions] = useState();

  useEffect(() => {
    const temp = [];

    for (let key of Object.keys(folders)) {
      temp.push({ value: key, label: folders[key].name });
    }

    setFolderOptions(temp);
  }, [folders]);

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
    />
  );
};

export default TodoFolderSelect;
