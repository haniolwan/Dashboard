import "./style.css";
const Radio = ({
  id,
  name,
  value,
  disabled,
  onChange,
  defaultChecked,
  beforeLabel,
  afterLabel,
}) => {
  return (
    <div className="flex items-center">
      <label className="cursor-pointer flex items-center" htmlFor={id}>
        {beforeLabel && (
          <span className="text-[16px] leading-[24px] font-[500] mr-3 dark:text-white">
            {beforeLabel}
          </span>
        )}
        <input
          id={id}
          name={name}
          type="radio"
          value={value}
          className={`${disabled && " opacity-50"} link-radio w-5 h-5 
          border-none
          bg-gray
          accent-primary-color
          checked:text-primary-color
          bg-gray-200
          focus:ring-primary-color 
          checked:ring-2
          checked:ring-primary-color	
          dark:text-primary-color`}
          disabled={disabled}
          onChange={onChange}
          defaultChecked={defaultChecked}
        />
        {afterLabel && (
          <span className="text-[16px] leading-[24px] font-[500] ml-3 dark:text-white">
            {beforeLabel}
          </span>
        )}
      </label>
    </div>
  );
};
export default Radio;
