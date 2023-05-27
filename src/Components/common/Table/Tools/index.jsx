import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBars,
  faCloudArrowDown,
  faFilter,
  faMagnifyingGlass,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import TextInput from "../../TextInput";
import { ColsFilter, Download } from "../../../Popups";

const Tools = ({
  tools,
  path,
  tableCols,
  setTableCols,
  filterBySearch,
  showFilter,
  setShowFilter,
  setShowAddModal,
  setModalType,
}) => {
  const downloadRef = useRef();
  const colsRef = useRef();
  const searchRef = useRef(null);

  const [showSearch, setShowSearch] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [showFilterCols, setShowFilterCols] = useState(false);

  return (
    <div className="dark:bg-gray-800 relative bg-white flex items-center justify-between lg:w-auto rounded-t">
      <div className="flex items-center">
        <h1 className="capitalize text-[#000] pl-6 pr-3 text-[20px] leading-[30px] font-[700] text-placeholder-color">
          {path.split("/").join(" ")}
        </h1>
        {tools && tools.add && (
          <FontAwesomeIcon
            onClick={() => {
              setShowAddModal((show) => !show);
              setModalType("add");
            }}
            className="cursor-pointer h-5 text-primary-color"
            icon={faSquarePlus}
          />
        )}
      </div>
      <div className="flex items-center">
        {tools && tools.search && (
          <fieldset className="flex justify-center items-center gap-2">
            <TextInput
              ref={searchRef}
              id={"search"}
              name={"search"}
              label={""}
              type={"text"}
              flex={""}
              placeholder={"Search user"}
              error={false}
              errorMsg={""}
              disabled={false}
              onChange={filterBySearch}
              classes={showSearch ? "show-search" : "hide-search"}
            />
            <FontAwesomeIcon
              onClick={() => {
                searchRef.current.focus();
                setShowSearch(!showSearch);
              }}
              className={`${
                showSearch && "text-primary-color"
              } cursor-pointer h-4 text-[#ADB5BD] hover:text-primary-color`}
              icon={faMagnifyingGlass}
            />
          </fieldset>
        )}
        <div className="flex p-6 gap-5">
          <Download
            icon={downloadRef}
            show={showDownload}
            setShow={setShowDownload}
          />
          {tools && tools.download && (
            <FontAwesomeIcon
              ref={downloadRef}
              onClick={() => setShowDownload(!showDownload)}
              className={`${
                showDownload && "text-primary-color"
              } cursor-pointer h-4 text-[#ADB5BD] hover:text-primary-color`}
              icon={faCloudArrowDown}
            />
          )}
          {tools && tools.filter && (
            <FontAwesomeIcon
              onClick={() => setShowFilter(!showFilter)}
              className={`${
                showFilter && "text-primary-color"
              } cursor-pointer h-4 text-[#ADB5BD] hover:text-primary-color`}
              icon={faFilter}
            />
          )}
          <ColsFilter
            icon={colsRef}
            show={showFilterCols}
            setShow={setShowFilterCols}
            tableCols={tableCols}
            setTableCols={setTableCols}
          />
          {tools && tools.filter_cols && (
            <FontAwesomeIcon
              ref={colsRef}
              onClick={() => setShowFilterCols(!showFilterCols)}
              className={`${
                showFilterCols && "text-primary-color"
              } cursor-pointer h-4 text-[#ADB5BD] hover:text-primary-color`}
              icon={faBars}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tools;
