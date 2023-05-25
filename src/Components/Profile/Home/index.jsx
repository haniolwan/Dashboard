import { useContext, useState } from "react";
import { TextInput, TextArea, Checkbox, Button } from "./../../common";
import { query } from "./../../../utils/query";
import { toast } from "react-toastify";
import { UserInfoContext } from "../../../context";
const Home = () => {
  const [data, setData] = useState();

  const { setUserInfo } = useContext(UserInfoContext);

  const onChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };
  const updateUser = () => {
    const {
      data: {
        success,
        message,
        data: {
          Employee: { name, email: empEmail, avatar },
          Login: { access_token },
        },
      },
    } = query("/dashboard/auth/update", "put", data);
    setUserInfo({
      user: {
        name,
        empEmail,
        avatar,
      },
      token: access_token,
    });
    if (success) {
      toast.success(<span className="capitalize">{message.join("\r\n")}</span>);
    }
  };

  return (
    <div className="flex gap-5 flex-col mt-2 w-full">
      <TextInput
        id={"name"}
        name={"name"}
        label={"Name"}
        type={"text"}
        placeholder={"Enter name"}
        error={false}
        errorMsg={"Invalid name"}
        disabled={false}
        onChange={onChange}
      />
      <TextInput
        id={"mobile"}
        name={"mobile"}
        label={"Mobile"}
        type={"text"}
        placeholder={"Enter mobile"}
        error={false}
        errorMsg={"Invalid mobile"}
        disabled={false}
        onChange={onChange}
      />
      <TextInput
        id={"email"}
        name={"email"}
        label={"Email"}
        type={"text"}
        placeholder={"Enter email"}
        error={false}
        errorMsg={"Invalid email"}
        disabled={false}
        onChange={onChange}
      />
      <TextArea
        name={"description"}
        label={"Description"}
        placeholder={"Enter description"}
        rows={"5"}
        cols={"40"}
        error={false}
        errorMsg={"Please fill input"}
        disabled={false}
        onChange={onChange}
      />
      <Checkbox
        id={"agree"}
        afterLabel={"I agree to the terms and conditions"}
        disabled={false}
        onChange={onChange}
      />
      <div className="flex justify-end">
        <Button
          label={"Apply"}
          padding={"px-6 py-3"}
          bgColor={"bg-primary-color"}
          textColor={"text-placeholder-color"}
          hoverBgColor={"hover:bg-white"}
          hoverTextColor={"hover:text-primary-color"}
          onClick={updateUser}
        />
      </div>
    </div>
  );
};
export default Home;
