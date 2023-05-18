import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Button, TextInput } from "../../Components/common";
import { validateInput, query } from "./../../utils";
import { UserInfoContext } from "../../context";
import { LoginEmployee } from "../../classes";
import IMAGES from "./../../assets";
import useThemeDetector from "../../hooks/useThemeDetector";

const Login = () => {
  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserInfoContext);
  const loginUser = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = user;
      let validEmail = validateInput("email", email);
      if (!validEmail) {
        setError((error) => {
          return { ...error, email: true };
        });
      }
      let validPassword = validateInput("password", password);
      if (!validPassword) {
        setError((error) => {
          return { ...error, password: true };
        });
      }
      if (validEmail && validPassword) {
        const {
          data: {
            success,
            message,
            data: {
              Employee: { id, name, email, avatar },
              Login: { access_token },
            },
          },
        } = await query("/api/dashboard/auth/login", "post", user);
        if (success) {
          const employeelogin = new LoginEmployee({
            id,
            name,
            email,
            avatar,
            access_token,
          });
          setUserInfo({ ...employeelogin });
          localStorage.setItem("access_token", access_token);
          navigate("/dashboard");
          return;
        }
        toast.error(
          <span className="capitalize">{message[0].split(".").join(" ")}</span>
        );
      }
      return;
    } catch ({
      response: {
        data: { message },
      },
    }) {
      toast.error(
        <span className="capitalize">{message[0].split(".").join(" ")}</span>
      );
    }
  };

  useEffect(() => {
    setError({
      email: false,
      password: false,
    });
  }, [user.name, user.password]);

  const isDarkTheme = useThemeDetector();

  useEffect(() => {
    if (!isDarkTheme) {
      document.documentElement.classList.add("dark");
    }
  }, [isDarkTheme]);

  return (
    <section
      id="login-layout"
      className="dark:bg-gray-900 text-[blue] flex justify-center md:block bg-[#F5F5F5]"
    >
      <img
        className="absolute md:left-[9%]"
        src={IMAGES.login_logo.src}
        alt={IMAGES.login_logo.alt}
      />
      <div
        className="pt-[8rem] sm:pt-[4rem] flex justify-center flex-col-reverse items-center md:grid 
                md:grid-cols-2 justify-center justify-items-center"
      >
        <div className="flex flex-col justify-center items-center md:items-start w-[60%] gap-5">
          <form onSubmit={loginUser}>
            <h1 className="text-placeholder-color text-[35px] leading-[52px] font-[600] pb-[50px] whitespace-nowrap">
              Login To
              <span className="text-primary-color"> Dashboard</span>
            </h1>
            <div className="w-full flex flex-col gap-5 relative">
              <TextInput
                id={"email"}
                type={"text"}
                name={"email"}
                placeholder={"Email"}
                error={error.email}
                errorMsg={"Invalid email"}
                onChange={handleChange}
                disabled={false}
              />
              <TextInput
                id={"password"}
                name={"password"}
                placeholder={"Password"}
                errorMsg={"Invalid password"}
                type={"password"}
                error={error.password}
                onChange={handleChange}
                disabled={false}
              />
            </div>
            <div className="flex justify-center pt-5">
              <Button
                type={"submit"}
                label={"Login"}
                padding={"py-[1rem] px-[5rem] md:px-[6rem]"}
                bgColor={"bg-[#DF8D6233]"}
                textColor={"text-primary-color"}
                hoverBgColor={
                  "hover:bg-primary-color hover:border-primary-color"
                }
                hoverTextColor={"hover:text-white"}
              />
            </div>
          </form>
        </div>
        <div className="c2 flex flex-col justify-center items-center">
          <img
            className="md:w-full h-full w-[80%]"
            src={IMAGES.login_col_2.src}
            alt={IMAGES.login_col_2.alt}
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
