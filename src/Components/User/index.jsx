import { useContext, useState } from "react";
import { UserInfoContext } from "../../context";

const User = ({ user, setUser }) => {
  const {
    userInfo: { name, avatar },
  } = useContext(UserInfoContext);

  const [image, setImage] = useState(avatar);

  const handleInputChange = ({ target: { type, name, files, value } }) => {
    if (type === "file") {
      setUser({ ...user, [name]: files[0] });
      setImage(URL.createObjectURL(files[0]));
    }
  };

  return (
    <div className="flex flex-col items-center py-10 px-5 w-full bg-[#FFF] rounded-[10px] dark:bg-gray-800 text-placeholder-color">
      <div className="flex flex-col items-center gap-3 w-full">
        <div>
          <button
            id="dropdownUserAvatarButton"
            data-dropdown-toggle="dropdownAvatar"
            className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            type="button"
          >
            <div className="w-14 h-14">
              <label className="rounded-full cursor-pointer" htmlFor="avatar">
                <img
                  className="rounded-full h-full"
                  src={'https://media.licdn.com/dms/image/D4D03AQF3hGqw-Tqsng/profile-displayphoto-shrink_800_800/0/1671572480810?e=1692835200&v=beta&t=gDlFtql2FAJ7nXXxEzmlaFjjDlfSK4CV0a9xjiM8Y48'}
                  alt="profile"
                />
              </label>
              <input
                className="rounded-input hidden"
                id="avatar"
                type="file"
                onChange={handleInputChange}
              />
              <br />
            </div>
          </button>
        </div>
        <div className="flex flex-col gap-2 text-center px-4 py-3">
          <h1 className="text-[16px] leading-[24px] font-[500]">{name}</h1>
          <p className="text-[14px] leading-[21px] font-[400] opacity-[0.3]">
            Admin
          </p>
        </div>
      </div>
    </div>
  );
};
export default User;
