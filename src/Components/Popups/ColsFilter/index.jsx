import { useRef } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { Checkbox } from "../../common";

const Filter = ({ tableCols, setTableCols, icon, show, setShow }) => {
  const onChange = ({ target: { name, checked, value } }) => {
    setTableCols({
      ...tableCols,
      [name]: { ...tableCols[name], hidden: !checked },
    });
  };
  const filterRef = useRef();
  useOnClickOutside(filterRef, icon, () => setShow(false));

  return (
    <ul
      ref={filterRef}
      className={`${
        show ? "show-modal" : "hide-modal"
      } flex flex-col items-center sidebar !overflow-auto max-h-[16rem] z-10 absolute px-6 rounded-lg top-14 rtl:right-auto rtl:left-2 right-2 w-[11rem] h-[15rem] gap-4 bg-white dark:bg-gray-800`}
    >
      {Object.keys(tableCols).map((col) => {
        const { label, value, hidden } = tableCols[col];
        return (
          value !== "actions" && (
            <li
              key={value}
              className="py-1 flex justify-between items-center gap-2 hover:bg-[#F6F4F3] w-full dark:hover:bg-gray-800 "
            >
              <Checkbox
                name={value}
                afterLabel={label}
                onChange={onChange}
                defaultChecked={!hidden}
              />
            </li>
          )
        );
      })}
    </ul>
  );
};
export default Filter;
