import {
  faCircleArrowUp,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Upload = ({ uploaded, grid, fileSize, supportedFiles }) => {
  const handleChangeFile = ({ target: { files } }) => {
    console.log(files[0]);
  };

  return (
    <div
      className={`${grid} rounded-lg shadow-xl bg-gray-50 w-full
        dark:placeholder-gray-400 dark:bg-gray-700 text-placeholder-color dark:focus:outline-primary-color dark:focus:border-primary-color`}
    >
      <div className="m-4">
        <label className="inline-block mb-2 text-gray-500">Upload Files</label>
        <div className="flex items-center justify-center w-full">
          <label className="cursor-pointer flex flex-col w-full border-2 border-dashed rounded-[10px] hover:bg-gray-100 hover:border-gray-300 dark:hover:bg-gray-600">
            <div className="flex items-center justify-center pt-6 gap-2">
              <FontAwesomeIcon
                className="text-[#ADB5BD]"
                icon={faCircleArrowUp}
              />
              <p className="text-[16px] leading-[21px] font-[400] text-gray-400 group-hover:text-gray-600">
                Drag and drop files here or
                <span className="text-primary-color"> Choose file</span>
              </p>
            </div>
            <input
              type="file"
              className="cursor-pointer opacity-0"
              onChange={handleChangeFile}
            />
          </label>
        </div>
        <div className="flex justify-between pt-2 text-[12px] font-[500] leading-[18px] text-[#ADB5BD]">
          <p>File supported: {supportedFiles}</p>
          <p>Maximum size: {fileSize}</p>
        </div>
        {uploaded && (
          <>
            <div className="flex items-center gap-5">
              <h1 className="text-[16px] leading-[24px] font-[500]">File1</h1>
              <p className="text-[14px] leading-[21px] font-[500] text-[#ADB5BD]">
                File uploaded
              </p>
              <FontAwesomeIcon
                className="text-[#ADB5BD]"
                icon={faCircleCheck}
              />
              <button className="w-[83px] h-[28px] text-[#ADB5BD] bg-[#ADB5BD1A]">
                Remove
              </button>
            </div>
            <div className="flex items-center gap-5">
              <h1 className="text-[16px] leading-[24px] font-[500]">File2</h1>
              <div className="w-[20rem] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className={`bg-primary-color h-2.5 rounded-full w-[75%]`}
                ></div>
              </div>
              <p className="text-[14px] leading-[21px] font-[500] text-[#ADB5BD]">
                75%
              </p>
              <button className="w-[83px] h-[28px] text-[#ADB5BD] bg-[#ADB5BD1A]">
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Upload;
