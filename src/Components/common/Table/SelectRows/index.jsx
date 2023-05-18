const SelectRows = ({ setnRows, setLoading }) => {
  const handleChange = ({ target: { value } }) => {
    setLoading(true);
    setnRows(parseInt(value));
  };
  return (
    <select
      onChange={handleChange}
      id="numbers"
      className="cursor-pointer bg-[#ADB5BD]/[10%] border-none focus:outline-none focus:ring-2 focus:ring-primary-color  rounded-[5px] text-[14px] leading-[21px] 
        font-[500] text-[#00000080] dark:text-[white] dark:focus:text-[white]"
    >
      <option className="dark:text-[black]" value={10} defaultValue>
        10
      </option>
      <option className="dark:text-[black]" value={25}>
        25
      </option>
      <option className="dark:text-[black]" value={50}>
        50
      </option>
      <option className="dark:text-[black]" value={100}>
        100
      </option>
    </select>
  );
};
export default SelectRows;
