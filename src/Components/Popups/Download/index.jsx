import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import IMAGES from "./../../../assets";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const Download = ({ icon, show, setShow }) => {
  const downloadRef = useRef();
  useOnClickOutside(downloadRef, icon, () => setShow(false));
  return (
    <ul
      ref={downloadRef}
      className={`${
        show ? "show-modal" : "hide-modal"
      } max-h-[16rem] z-20 absolute rounded-lg top-14 rtl:right-auto rtl:left-8 right-8 w-[8rem] flex flex-col items-center justify-center gap-2 bg-white dark:bg-gray-800`}
    >
      <li className="flex justify-center items-center gap-2 hover:bg-[#F6F4F3] py-3 w-full cursor-pointer dark:hover:bg-gray-600 text-placeholder-color dark:hover:text-placeholder-color rounded-lg">
        <img
          className="mr-2 w-[25px] h-[25px]"
          src={IMAGES.pdf.src}
          alt={IMAGES.pdf.alt}
        />
        <span className="text-[14px] leading-[21px] font-[500]">PDF</span>
      </li>
      <li className="flex justify-center items-center gap-2 hover:bg-[#F6F4F3] p-3 w-full cursor-pointer dark:hover:bg-gray-600 text-placeholder-color dark:hover:text-placeholder-color rounded-lg">
        <img
          className="w-[25px] h-[25px]"
          src={IMAGES.excel.src}
          alt={IMAGES.excel.alt}
        />
        <span className="text-[14px] leading-[21px] font-[500]">Excel</span>
      </li>
      <li className="flex justify-center items-center gap-2 hover:bg-[#F6F4F3] p-3 w-full cursor-pointer dark:hover:bg-gray-600 text-placeholder-color dark:hover:text-placeholder-color rounded-lg">
        <FontAwesomeIcon
          className="w-[25px] h-[25px] text-[#ADB5BD]"
          icon={faPrint}
        />
        <span className="text-[14px] leading-[21px] font-[500]">Print</span>
      </li>
    </ul>
  );
};
export default Download;
