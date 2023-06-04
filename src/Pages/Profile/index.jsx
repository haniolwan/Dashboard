import { useState } from "react";
import Settings from "../../Components/Settings";
import User from "../../Components/User";

const Profile = () => {
  const [user, setUser] = useState([]);
  return (
    <>
      <div className="grid grid-cols-4 grid-rows-1 space-x-8 w-full h-full">
        <User user={user} setUser={setUser} />
        <Settings user={user} setUser={setUser} />
      </div>
    </>
  );
};
export default Profile;
