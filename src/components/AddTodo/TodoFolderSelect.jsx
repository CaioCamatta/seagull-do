import React from "react";
import Select from "react-select";

const TodoFolderSelect = () => {
  // for now hardcoded
  const folders = [
    { value: "folder1", label: "Folder 1 " },
    { value: "folder2", label: "Folder 2" },
    { value: "folder3", label: "Folder 3 " },
    { value: "folder4", label: "Folder 4" },
  ];

  return (
    <Select
      options={folders}
      placeholder="Folder"
      components={{ IndicatorSeparator: () => null }}
      isSearchable={false}
      styles={{
        container: (provided) => ({
          ...provided,
          width: "100%",
        }),
      }}
    />
  );
};

export default TodoFolderSelect;
