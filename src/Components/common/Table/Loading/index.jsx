import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loading = ({ cols }) => {
  return (
    <tr className="show-element text-[#000] bg-white border-b text-[14px] leading-[24px] font-[400] whitespace-nowrap dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
      {Object.keys(cols).map((ele) => {
        const { label, value } = cols[ele];
        return (() => {
          switch (value) {
            case "name":
              return label === "Username" ? (
                <td key={value} className="pl-6 pr-12 dark:text-[white] w-5">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="text-gray-200 w-14 h-14 dark:text-gray-700"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <div>
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                      <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                  </div>
                </td>
              ) : (
                <td key={value} className="p-6 pr-12 dark:text-[white] w-50">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600"></div>
                </td>
              );
            case "image":
            case "flag":
              return (
                <td key={value} className="px-6 dark:text-[white]">
                  <div className="flex items-center justify-center rounded sm:w-10 dark:bg-gray-700 bg-gray-300">
                    <FontAwesomeIcon
                      className="text-[#ededed] w-5 h-10"
                      icon={faImage}
                    />
                  </div>
                </td>
              );
            case "actions":
              return (
                <td
                  key={value}
                  className="text-center space-x-2 flex items-center justify-end p-6"
                >
                  <button className="group mr-2 rtl:ml-2 rtl:mr-0 dark:text-[white] dark:bg-gray-800 ">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                  </button>
                  <button className="group mr-2 rtl:ml-2 rtl:mr-0 dark:text-[white] dark:bg-gray-800 ">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                  </button>
                </td>
              );
            default:
              return (
                <td key={value} className="p-6 pr-12 dark:text-[white] w-50">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600"></div>
                </td>
              );
          }
        })();
      })}
    </tr>
  );
};

export default Loading;
