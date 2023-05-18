const Toggle = ({
  id,
  name,
  defaultChecked,
  value,
  disabled,
  beforeLabel,
  afterLabel,
}) => {
  return (
    <>
      {beforeLabel && (
        <span class="text-[16px] leading-[24px] font-[500] ml-3">
          {beforeLabel}
        </span>
      )}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          id={id}
          className="sr-only peer"
          type="checkbox"
          name={name}
          value={value}
          disabled={disabled}
          defaultChecked={defaultChecked}
        />
        <div
          className={`${
            disabled && "opacity-50"
        } w-11 h-6 bg-gray-200 peer-focus:ring-hidden dark:peer-focus:ring-primary-color rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-color`}
        ></div>
      </label>
      {afterLabel && (
        <span class="text-[16px] leading-[24px] font-[500] ml-3">
          {afterLabel}
        </span>
      )}
    </>
  );
};
export default Toggle;
