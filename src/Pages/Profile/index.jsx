import Settings from "../../Components/Settings";
import User from "../../Components/User";

const Profile = () => {
  return (
    <>
      <div className="grid grid-cols-4 grid-rows-1 space-x-8 w-full h-full">
        <User />
        <Settings />
      </div>
    </>
  );
};
export default Profile;
