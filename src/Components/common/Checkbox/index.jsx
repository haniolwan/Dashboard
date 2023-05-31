import { forwardRef } from "react";

const Checkbox = forwardRef(
  (
    {
      id,
      name,
      value,
      beforeLabel,
      afterLabel,
      disabled,
      defaultChecked,
      checked,
      onChange,
      onClick,
      readOnly,
    },
    ref
  ) => {
    return (
      <div className="flex items-center">
        <label className="cursor-pointer flex items-center" htmlFor={id}>
          {beforeLabel && (
            <span className="text-[14px] leading-[21px] font-[500] mr-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {beforeLabel}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            name={name}
            type="checkbox"
            className={`${
              disabled && "opacity-50"
            } cursor-pointer w-4 h-4 invert-1 accent-primary-color bg-gray-100 border-gray-300 rounded 
          focus:ring-primary-color dark:focus:ring-primary-color dark:ring-offset-gray-800 
          focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-primary-color text-primary-color`}
            disabled={disabled}
            defaultChecked={defaultChecked}
            checked={checked}
            onChange={onChange}
            value={value}
            onClick={onClick}
            readOnly={readOnly}
          />
          {afterLabel && (
            <span className="text-[14px] leading-[21px] font-[500] ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {afterLabel}
            </span>
          )}
        </label>
      </div>
    );
  }
);
export default Checkbox;
