import i18next from "i18next";

export const changeLanguage = (lang) => {
  const direction = i18next.dir(lang);
  if (localStorage.getItem("language")) {
    localStorage.setItem("language", lang);
    document.getElementsByTagName("html")[0].setAttribute("dir", direction);
  } else {
    if (document.documentElement.classList.contains("language")) {
      localStorage.setItem("language", lang);
      document.getElementsByTagName("html")[0].setAttribute("dir", direction);
    }
  }
};
