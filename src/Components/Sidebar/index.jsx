import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faArrowLeft,
  faArrowRight,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import useScrollPosition from "../../hooks/useScrollPosition";
import { saveSidebar } from "../../utils/saveSidebar";
import IMAGES from "./../../assets";

const Sidebar = ({ sidebarItems, setSideBarWidth }) => {
  const { pathname } = useLocation();
  const [type, setType] = useState("full");
  const scrollPosition = useScrollPosition();
  useEffect(() => {
    setType(localStorage.getItem("sidebar") || "full");
  }, []);

  const listClicked = (path) => {
    const list = document.getElementById(path);
    if (list.classList.contains("show-modal")) {
      list.classList.add("hide-modal");
      list.classList.remove("show-modal");
    } else {
      list.classList.add("show-modal");
      list.classList.remove("hide-modal");
    }
  };

  return (
    <>
      <aside
        className={`${
          scrollPosition >= 30 && "shadow-none"
        } z-30 transition-[width] ease-in-out fixed shadow-xl ${
          type === "full" && "w-[12rem]"
        } ${type === "collabsed" && "w-[4.2rem]"} float-left`}
        aria-label="Sidebar"
      >
        <div className="sidebar h-[100vh] overflow-y-scroll px-4 py-4 rounded-r bg-[white] dark:bg-gray-800">
          <Link
            to={"dashboard"}
            className="flex items-center mb-5 overflow-hidden"
          >
            {type === "full" ? (
              <img
                src={IMAGES.aside_full.src}
                className="delay-50 w-[9rem] max-w-none"
                alt={IMAGES.aside_full.alt}
              />
            ) : (
              <img
                src={IMAGES.aside_collabse.src}
                className="w-[2rem] max-w-none"
                alt={IMAGES.aside_collabse.alt}
              />
            )}
          </Link>
          <ul className="space-y-2">
            {Object.keys(sidebarItems).map((ele) => {
              const { path, label, tooltip, icon, children, hidden } =
                sidebarItems[ele];
              return !children ? (
                !hidden && (
                  <li key={path} className="group">
                    <Link
                      to={path}
                      className={`flex ${
                        type !== "full" && "justify-center"
                      } items-center p-2 rounded-lg text-[#ADB5BD] hover:text-primary-color hover:bg-hover-bg-color dark:hover:bg-primary-color dark:hover:text-[white]
                    ${
                      pathname === "/" + path &&
                      "text-primary-color bg-hover-bg-color dark:bg-primary-color dark:text-white"
                    }`}
                    >
                      {type === "full" ? (
                        <>
                          <FontAwesomeIcon icon={icon} />
                          <span className="capitalize ml-3 rtl:mr-3">
                            {label}
                          </span>
                        </>
                      ) : (
                        <div className=" flex items-center group">
                          <FontAwesomeIcon icon={icon} />
                          <div
                            role="tooltip"
                            className="absolute left-[4rem] rtl:left-auto rtl:right-10 max-w-auto hidden group-hover:flex
                          inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700"
                          >
                            {tooltip}
                          </div>
                        </div>
                      )}
                    </Link>
                  </li>
                )
              ) : (
                <li key={path}>
                  <button
                    type="button"
                    className={`dark:text-[#ADB5BD]
                        text-[#ADB5BD] rounded-lg 
                        group flex items-center hover:text-primary-color w-full p-2 text-base transition duration-75`}
                    aria-controls="dropdown-example"
                    data-collapse-toggle="dropdown-example"
                    onClick={() => listClicked(path)}
                  >
                    <FontAwesomeIcon
                      className="dark:group-hover:text-white group-hover:text-primary-color dark:group-hover:text-white"
                      icon={faGear}
                    />
                    {type === "full" ? (
                      <>
                        <span className="flex-1 ml-3 text-left group-hover:text-primary-color dark:group-hover:text-white">
                          {label}
                        </span>
                        <FontAwesomeIcon
                          className="group-hover:text-primary-color dark:group-hover:text-white"
                          icon={faAngleDown}
                        />
                      </>
                    ) : (
                      <div
                        role="tooltip"
                        className="absolute left-[4rem] rtl:left-auto rtl:right-10 max-w-auto hidden group-hover:flex
                          inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700"
                      >
                        {tooltip}
                      </div>
                    )}
                  </button>
                  <ul
                    id={path}
                    className={` hide-modal rounded-b-lg max-h-[30rem] w-full transition-all ease`}
                  >
                    {children.map(({ path, label, icon, hidden }) => {
                      return (
                        !hidden && (
                          <li key={path} className="group py-2 ">
                            <Link
                              to={path}
                              className={`flex items-center p-2 
                                  ${type === "full" && "pl-5"}
                                  rounded-lg text-[#ADB5BD] hover:text-primary-color hover:bg-hover-bg-color dark:hover:bg-primary-color dark:hover:text-[white] transition duration-75 hover:bg-hover-bg-color hover:text-primary-color dark:text-white
                          ${
                            pathname === "/" + path &&
                            "text-primary-color bg-hover-bg-color dark:bg-primary-color dark:text-white"
                          }`}
                            >
                              {type === "full" ? (
                                <>
                                  <FontAwesomeIcon icon={icon} />
                                  <span className="capitalize ml-3 rtl:mr-3">
                                    {label}
                                  </span>
                                </>
                              ) : (
                                <div className=" flex items-center group">
                                  <FontAwesomeIcon icon={icon} />
                                  <div
                                    role="tooltip"
                                    className="absolute left-[4rem] rtl:left-auto rtl:right-10 max-w-auto hidden group-hover:flex
                                    inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700"
                                  >
                                    {tooltip}
                                  </div>
                                </div>
                              )}
                            </Link>
                          </li>
                        )
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
          <div className="absolute bottom-[15px] left-[38%] flex justify-center">
            {type === "full" ? (
              <FontAwesomeIcon
                onClick={() => {
                  setSideBarWidth(true);
                  setType("collabsed");
                  saveSidebar("collabsed");
                }}
                className="text-[#ADB5BD] hover:text-primary-color h-[1.5rem] dark:text-white"
                icon={faArrowLeft}
              />
            ) : (
              <FontAwesomeIcon
                onClick={() => {
                  setSideBarWidth(false);
                  setType("full");
                  saveSidebar("full");
                }}
                className="text-[#ADB5BD] hover:text-primary-color h-[1.5rem] dark:text-white"
                icon={faArrowRight}
              />
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
