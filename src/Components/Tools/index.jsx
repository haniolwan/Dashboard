import { useState, useContext, useRef } from "react";
import { useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as regularFaMoon } from "@fortawesome/free-regular-svg-icons";
import {
  faGlobe,
  faGreaterThan,
  faSun,
  faMoon as solidFaMoon,
} from "@fortawesome/free-solid-svg-icons";
import { NightModeContext } from "../../context";
import useScrollPosition from "../../hooks/useScrollPosition";
import useWindowSize from "../../hooks/useWindowSize";
import Avatar from "../Avatar";
import LanguageModal from "../LanguageModal";
import { Link } from "react-router-dom";
import NotificationBell from "../NotificationBell";
import { enableDarkMode } from "../../utils/enableDarkMode";

const Tools = ({ sideBarWidth }) => {
  const { nightMode, setNightMode } = useContext(NightModeContext);
  const [showLanguage, setShowLanguage] = useState(false);
  const { pathname } = useLocation();
  const path = pathname.substring(1);
  const paths = path.split("/");
  const scrollPosition = useScrollPosition();
  const { width } = useWindowSize();
  const languageIconRef = useRef();
  return (
    <div
      className={`${scrollPosition >= 30 && width > 768 && "bg-white"} ${
        width <= 768 && "relative"
      } h-[65px] fixed z-20 sm:w-full flex flex-col-reverse gap-5 p-4
    md:items-center sm:flex-row sm:justify-between sm:p-4 dark:bg-gray-800`}
    >
      <div
        className={`${
          sideBarWidth
            ? "pl-[4rem] rtl:pr-[5rem] rtl:pl-0"
            : "pl-[12rem] rtl:pr-[12rem] rtl:pl-0"
        } transition-all ease-in-out flex items-center gap-2 text-[16px] leading-[27px] font-[400] text-[#ADB5BD] whitespace-nowrap ml-4 md:ml-3`}
      >
        {paths.map((link, i) => {
          return (
            <div key={i}>
              {i !== paths.length - 1 ? (
                <Link to={`/${link}`} className="capitalize">
                  {link}
                </Link>
              ) : (
                <span className="capitalize">{link}</span>
              )}
              {i !== paths.length - 1 && (
                <FontAwesomeIcon className="h-2" icon={faGreaterThan} />
              )}
            </div>
          );
        })}
      </div>
      <div
        className="flex flex-row-reverse w-full justify-between 
            md:justify-end items-center gap-5 sm:flex-row lg:mr-5"
      >
        <div className="flex flex-wrap gap-6 transition ease-in">
          <div className="dark:hidden relative items-center group">
            <FontAwesomeIcon
              className="cursor-pointer h-5 text-gray-500 text-primary-color dark:text-gray-400 mr-3 mt-1 rtl:ml-3 rtl:mr-0 transition ease-in"
              icon={solidFaMoon}
              data-tooltip-target="tooltip-theams-regular"
              data-tooltip-placement="bottom"
              onClick={() => {
                enableDarkMode();
                setNightMode(!nightMode);
              }}
            />
            <div
              id="tooltip-theams-regular"
              role="tooltip"
              className="absolute left-[-25px] top-7 max-w-auto hidden group-hover:flex 
                          inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700"
            >
              Theme
            </div>
          </div>
          <div className="hidden dark:block relative items-center group">
            <FontAwesomeIcon
              className="cursor-pointer h-5 text-[#263238] dark:text-primary-color hover:text-primary-color dark:text-gray-400 mt-1 mr-3 rtl:ml-3 rtl:ml-0"
              icon={faSun}
              data-tooltip-target="tooltip-theams-solid"
              data-tooltip-placement="bottom"
              onClick={() => {
                enableDarkMode();
                setNightMode(!nightMode);
              }}
            />
            <div
              id="tooltip-theams-solid"
              role="tooltip"
              className="absolute  left-[-25px] top-7 max-w-auto hidden group-hover:flex
                          inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700"
            >
              Theme
            </div>
          </div>

          <NotificationBell />

          <div className="mt-1 relative items-center group">
            <FontAwesomeIcon
              ref={languageIconRef}
              onClick={() => setShowLanguage(!showLanguage)}
              className={`${
                showLanguage && "text-primary-color dark:text-primary-color"
              }
            cursor-pointer h-5 text-gray-400 dark:text-gray-400 hover:text-primary-color dark:hover:text-primary-color transition ease-in`}
              icon={faGlobe}
              data-tooltip-target="tooltip-language"
              data-tooltip-placement="bottom"
            />
            <div
              id="tooltip-language"
              role="tooltip"
              className="absolute left-[-25px] top-7 max-w-auto hidden group-hover:flex
                          inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700"
            >
              Language
            </div>
          </div>
        </div>
        <Avatar />
      </div>
      <LanguageModal
        iconRef={languageIconRef}
        show={showLanguage}
        setShow={setShowLanguage}
      />
    </div>
  );
};
export default Tools;
