import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { UserInfoContext } from "../../context";
import { logout } from "../../utils/logout";

const User = () => {
  const {
    userInfo: { name, avatar },
  } = useContext(UserInfoContext);

  return (
    <div className="flex flex-col items-center py-10 px-5 w-full bg-[#FFF] rounded-[10px] dark:bg-gray-800 text-placeholder-color">
      <div className="flex flex-col items-center gap-3 border-b-2 w-full">
        <div>
          <button
            id="dropdownUserAvatarButton"
            data-dropdown-toggle="dropdownAvatar"
            className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            type="button"
          >
            <img
              className="w-14 h-14 rounded-full"
              src={avatar}
              alt="user photo"
            />
          </button>
        </div>
        <div className="flex flex-col gap-2 text-center px-4 py-3">
          <h1 className="text-[16px] leading-[24px] font-[500]">{name}</h1>
          <p className="text-[14px] leading-[21px] font-[400] opacity-[0.3]">
            Admin
          </p>
        </div>
      </div>
      <div
        onClick={logout}
        className="cursor-pointer rounded mt-5 flex items-center gap-2 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-placeholder-color"
      >
        <FontAwesomeIcon
          className="text-[#ADB5BD] h-5"
          icon={faRightFromBracket}
        />
        <span className="text-[16px] leading-[21px] font-[600] text-placeholder-color">
          Logout
        </span>
      </div>
    </div>
  );
};
export default User;
