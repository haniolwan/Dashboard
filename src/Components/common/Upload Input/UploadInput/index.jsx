import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleArrowUp,
  faCircleCheck,
  faFileImage,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const UploadInput = ({grid}) => {
  const [fileName, setFileName] = useState();
  const [typeImg, setTypeImg] = useState();
  const handleChangeFile = ({ target: { files } }) => {
    const [name, icon] = files[0].name.split(".");
    setFileName(name + "." + icon);
    switch (icon) {
      case "pdf":
        return setTypeImg(faFilePdf);
      case "png":
      case "jpg":
      case "jpeg":
      case "svg":
        return setTypeImg(faFileImage);
      default:
        return setTypeImg(faFile);
    }
  };

  return (
    <label className={`${grid} rounded-[5px] bg-[#F4F5F7] dark:bg-gray-700`}>
      <div className="flex items-center cursor-pointer">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="flex items-center space-x-2 ml-3 rtl:mr-3">
            {!fileName && (
              <FontAwesomeIcon
                className="ml-2 h-5 text-[#ADB5BD]"
                icon={faCircleArrowUp}
              />
            )}
            <FontAwesomeIcon className="h-5 text-[#ADB5BD] ml-3" icon={typeImg} />
            <p className="text-placeholder-color text-[16px] leading-[21px] font-[400]">
              {fileName || "Upload File"}
            </p>
          </div>
          {fileName && (
            <FontAwesomeIcon className="text-[#ADB5BD]" icon={faCircleCheck} />
          )}
          <input
            type="file"
            className="opacity-0 cursor-pointer"
            onChange={handleChangeFile}
          />
        </div>
        <p className="text-[16px] leading-[21px] font-[600] rtl:border-l-0 rtl:border-r-2 border-l-2 px-[10px] text-placeholder-color">
          Choose File
        </p>
      </div>
    </label>
  );
};

export default UploadInput;
