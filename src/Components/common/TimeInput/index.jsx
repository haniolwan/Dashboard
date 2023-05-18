import "./style.css";
const TimeInput = ({ id, name, grid, min, max }) => {
  return (
    <input
      id={id}
      className={`${grid} cursor-pointer time-input dark:border-none dark:bg-gray-700 dark:text-placeholder-color focus:border-primary-color inline-flex border-[#D6DADE] border-2 rounded-[10px] 
        px-[20px] py-[10px] text-[20px] leading-[30px] bg-[#F7F8F8] font-[600]`}
      type="time"
      name={name}
      min={min}
      max={max}
    />
  );
};
export default TimeInput;
