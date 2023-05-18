import { useRef } from "react";
import { useTranslation } from "react-i18next";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { changeLanguage } from "../../utils/changeLanguague";

const LanguageModal = ({ iconRef, show, setShow }) => {
  const languages = [
    { name: "English", value: "en" },
    { name: "Arabic", value: "ar" },
  ];
  const languageRef = useRef();
  useOnClickOutside(languageRef, iconRef, () => setShow(false));
  const { i18n } = useTranslation();
  const selectedLang = i18n.language;
  return (
    <div
      ref={languageRef}
      className={`${show ? "show-modal" : "hide-modal"}
         max-h-[20vh] lg:absolute lg:top-[4.5rem]
     lg:right-[4rem] lg:rtl:right-auto lg:rtl:left-[2rem] lg:mt-0 mt-2 ml-2
        w-[8rem] h-[6rem] z-10
       rounded-lg grid content-center justify-items-center	bg-[#ffffff] dark:bg-gray-800`}
    >
      <ul className="space-y-[30px]">
        {languages.map(({ name, value }) => {
          return (
            <li
              key={value}
              className={`${
                selectedLang === value &&
                "dark:text-primary-color text-primary-color"
              }
               hover:text-primary-color
                         font-[500] text-[16px] leading-[24px]
                        cursor-pointer text-placeholder-color dark:hover:text-primary-color`}
              onClick={() => {
                changeLanguage(value);
                i18n.changeLanguage(value);
                setShow(false);
              }}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageModal;
