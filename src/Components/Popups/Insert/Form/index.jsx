/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useEffect, useRef } from "react";
import { Button } from "../../../common";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { PermissionsContext } from "../../../../context";

const FormContext = createContext();

const Form = ({
  children,
  show,
  setShow,
  isLoading,
  setIsLoading,
  onSubmit,
  showTranslate,
  setShowTranslate,
}) => {
  const ref = useRef();
  return (
    <FormContext.Provider
      value={{
        show,
        setShow,
        isLoading,
        setIsLoading,
        ref,
        onSubmit,
        showTranslate,
        setShowTranslate,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

Form.Container = ({ children }) => {
  const { ref, show, isLoading, onSubmit, setShow } = useContext(FormContext);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter" && show && onSubmit) {
        event.preventDefault();
        onSubmit(event);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [onSubmit, show]);

  useOnClickOutside(ref, "", () => setShow(false));

  return (
    <>
      <div
        className={`${
          !show && "hidden"
        } fixed top-[50%] left-[50%] flex justify-center items-center z-50 p-6 overflow-x-hidden overflow-y-auto md:inset-0 bg-[#0000007F] rounded h-full`}
      >
        <form ref={ref} onSubmit={onSubmit}>
          <div className="relative md:mt-0 md:col-span-2">
            {isLoading && (
              <>
                <div
                  className={`absolute top-0 right-0 bg-white dark:bg-gray-900 opacity-75 h-full w-full`}
                >
                  <div className="absolute top-[50%] right-[50%]" role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                </div>
                <div className="shadow sm:rounded-md sm:overflow-hidden" />
              </>
            )}
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              {children}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

Form.Row = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

Form.Content = ({ title, children, path }) => {
  const { isLoading, setShowTranslate, showTranslate } =
    useContext(FormContext);
  const { permissions } = useContext(PermissionsContext);

  const translate = () => {
    if (showTranslate && permissions.includes(path + ".translate.update")) {
      return (
        <button
          className="group rtl:ml-2 rtl:mr-0 dark:text-[white]"
          onClick={(e) => {
            e.preventDefault();
            setShowTranslate(false);
          }}
        >
          <FontAwesomeIcon
            className="group-hover:text-white group-hover:bg-primary-color pointer-events-none h-[16px] rounded-[5px] p-2 text-primary-color bg-[#DF8D621A]"
            icon={faEdit}
          />
        </button>
      );
    }
    if (!showTranslate && permissions.includes(path + ".translate.update")) {
      return (
        <button
          className="group rtl:ml-2 rtl:mr-0 dark:text-[white]"
          onClick={(e) => {
            e.preventDefault();
            setShowTranslate(true);
          }}
        >
          <FontAwesomeIcon
            className="group-hover:text-white group-hover:bg-primary-color pointer-events-none h-[16px] rounded-[5px] p-2 text-primary-color bg-[#DF8D621A]"
            icon={faEye}
          />
        </button>
      );
    }
  };
  return (
    <>
      <div className="bg-white space-y-3 sm:p-6 dark:bg-gray-900 max-h-[30rem] w-full sidebar overflow-auto">
        <div className="flex justify-between">
          <h1 className="text-placeholder-color mt-1 text-gray-600">{title}</h1>
          {translate()}
        </div>
        {isLoading ? <div /> : children}
      </div>
    </>
  );
};

Form.Footer = ({ disabled }) => {
  const { setShow } = useContext(FormContext);
  return disabled ? (
    <div className="flex justify-end space-x-2 px-4 py-3 bg-gray-50 text-right sm:px-6 dark:bg-gray-800 rtl:gap-2 z-200 h-10">
      <Button
        type={"button"}
        label={"Cancel"}
        padding={"px-4 py-2"}
        bgColor={"bg-[#ADB5BD33]"}
        textColor={"text-[#ADB5BD]"}
        hoverBgColor={"invisible hover:bg-[gray]"}
        hoverTextColor={"text-placeholder-color"}
        onClick={() => setShow(false)}
      />
      <Button
        type={"button"}
        label={"Apply"}
        padding={"px-6 py-2"}
        bgColor={"bg-[#DF8D6233]"}
        textColor={"text-primary-color"}
        hoverBgColor={"invisible hover:bg-primary-color"}
        hoverTextColor={"text-placeholder-color dark:hover:text-white"}
        disabled
      />
    </div>
  ) : (
    <div className="flex justify-end space-x-2 px-4 py-3 bg-gray-50 text-right sm:px-6 dark:bg-gray-800 rtl:gap-2">
      <Button
        type={"button"}
        label={"Cancel"}
        padding={"px-4 py-2"}
        bgColor={"bg-[#ADB5BD33]"}
        textColor={"text-[#ADB5BD]"}
        hoverBgColor={"hover:bg-[gray]"}
        hoverTextColor={"text-placeholder-color"}
        onClick={() => setShow(false)}
      />
      <Button
        type={"submit"}
        label={"Apply"}
        padding={"px-6 py-2"}
        bgColor={"bg-[#DF8D6233]"}
        textColor={"text-primary-color"}
        hoverBgColor={"hover:bg-primary-color"}
        hoverTextColor={
          "text-placeholder-color dark:hover:text-placeholder-color"
        }
      />
    </div>
  );
};

export default Form;
