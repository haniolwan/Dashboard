import { forwardRef } from "react";
import Select from "@atlaskit/select";

import "./style.scss";

const SelectInput = forwardRef(
  (
    {
      id,
      label,
      placeholder,
      grid,
      onChange,
      options,
      defaultValue,
      isLoading,
      disabled,
      value,
    },
    ref
  ) => {
    return (
      <>
        <div className={`${grid} group select-input`}>
          {label && (
            <label
              htmlFor={id}
              className="text-sm font-medium text-[#ADB5BD] dark:text-placeholder-color 
              group-focus-within:text-primary-color text-placeholder-color"
            >
              {label}
            </label>
          )}
          <Select
            ref={ref}
            inputId={id}
            classNamePrefix="react-select"
            options={options}
            placeholder={placeholder}
            onChange={onChange}
            defaultValue={defaultValue}
            isLoading={isLoading}
            isDisabled={disabled}
            value={value}
          />
        </div>
      </>
    );
  }
);
export default SelectInput;
