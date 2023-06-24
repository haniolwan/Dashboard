import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  faGear,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { UserInfoContext } from "../../context";
import { logout } from "./../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const Avatar = () => {
  const [show, setShow] = useState(false);
  const profileRef = useRef();
  const iconRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    setShow(false);
  }, [pathname]);

  useOnClickOutside(profileRef, iconRef, () => setShow(false));
  const { t } = useTranslation();
  const {
    userInfo: { name, avatar },
  } = useContext(UserInfoContext);
  return (
    <>
      <button
        id="dropdownUserAvatarButton"
        data-dropdown-toggle="dropdownAvatar"
        className="mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        type="button"
        onClick={() => setShow(!show)}
      >
        <img
          ref={iconRef}
          className="w-12 h-12 rounded-full"
          src={'https://media.licdn.com/dms/image/D4D03AQF3hGqw-Tqsng/profile-displayphoto-shrink_800_800/0/1671572480810?e=1692835200&v=beta&t=gDlFtql2FAJ7nXXxEzmlaFjjDlfSK4CV0a9xjiM8Y48'}
          alt="user avatar"
        />
      </button>

      <div
        ref={profileRef}
        id="dropdownAvatar"
        className={`${
          show ? "show-modal" : "hide-modal"
        } max-h-[19rem] absolute right-[.5rem] rtl:right-auto rtl:left-[.5rem] top-[4.5rem] z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-800 dark:divide-gray-600`}
      >
        <div className="text-center px-4 py-3">
          <h1 className="text-[16px] leading-[21px] font-[700] text-placeholder-color">
            {name}
          </h1>
        </div>
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownUserAvatarButton"
        >
          <li>
            <Link
              to={"/profile"}
              className="grid grid-cols-5 gap-5 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-placeholder-color rounded-lg"
            >
              <FontAwesomeIcon className="text-[#ADB5BD] h-5" icon={faUser} />
              <span className="col-span-4 text-placeholder-color text-[14px] leading-[21px] font-[600] text-placeholder-color">
                {t("avatar.tab1")}
              </span>
            </Link>
          </li>
          {/* <li>
            <Link
              to={"/settings"}
              className="grid grid-cols-5 gap-5 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-placeholder-color rounded-lg"
            >
              <FontAwesomeIcon className="text-[#ADB5BD] h-5" icon={faGear} />
              <span className="col-span-4 text-placeholder-color text-[14px] leading-[21px] font-[600] text-placeholder-color">
                {t("avatar.tab2")}
              </span>
            </Link>
          </li> */}
          <li
            onClick={logout}
            className="cursor-pointer grid grid-cols-5 gap-5 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-placeholder-color rounded-lg"
          >
            <FontAwesomeIcon
              className="text-[#ADB5BD] h-5"
              icon={faRightFromBracket}
            />
            <span className="col-span-4 text-placeholder-color text-[14px] leading-[21px] font-[600] text-placeholder-color">
              {t("avatar.tab3")}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Avatar;
