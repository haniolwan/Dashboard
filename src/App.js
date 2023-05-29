import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import WebFont from "webfontloader";
import { useTranslation } from "react-i18next";
import axios from "axios";

import {
  NightModeContext,
  LanguageContext,
  UserInfoContext,
  LoadingContext,
  PermissionsContext,
  EnumsContext,
} from "./context";
import {
  Cities,
  Countries,
  Currencies,
  Employees,
  Locales,
  Page,
  Services,
  Sliders,
  NotificationsTemplates,
  Plans,
  Subscriptions,
  Users,
  Providers,
  Orders,
  NotificationsHistory,
  Roles,
  Dashboard,
  NotFound,
} from "./Pages";
import { Loading } from "./Components/common";
import Profile from "./Pages/Profile";
import RequireAuth from "./features/RequireAuth";
import "react-toastify/dist/ReactToastify.css";
import Container from "./Components/Container";
import useThemeDetector from "./hooks/useThemeDetector";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins", "Poppins:bold", "Poppins:SemiBold"],
        loadAllFonts: true,
      },
    });
  }, []);
  const { i18n } = useTranslation();
  const isDarkTheme = useThemeDetector();
  useEffect(() => {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      isDarkTheme ||
      (!("color-theme" in localStorage) &&
        !window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      localStorage.setItem("color-theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("color-theme", "light");
      document.documentElement.classList.remove("dark");
    }
    if (!localStorage.getItem("sidebar")) {
      localStorage.setItem("sidebar", "full");
    }
    if (localStorage.getItem("language")) {
      i18n.changeLanguage(localStorage.getItem("language"));
      document.getElementsByTagName("html")[0].setAttribute("dir", i18n.dir());
    } else {
      i18n.changeLanguage("en");
      localStorage.setItem("language", "en");
      document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
    }
  }, [i18n, isDarkTheme]);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/") {
      navigate("/dashboard");
    }
  }, [pathname, navigate]);

  const [nightMode, setNightMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [permissions, setPermissions] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [enums, setEnums] = useState([]);

  const [loading, setLoading] = useState(true);

  return (
    <>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <Loading />
        <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
          <EnumsContext.Provider value={{ enums, setEnums }}>
            <PermissionsContext.Provider value={{ permissions, setPermissions }}>
              <LanguageContext.Provider value={{ language, setLanguage }}>
                <NightModeContext.Provider value={{ nightMode, setNightMode }}>
                  <Routes>
                    <Route element={<RequireAuth />}>
                      <Route element={<Container />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/employee" element={<Employees />} />
                        <Route path="/slider" element={<Sliders />} />
                        <Route path="/page" element={<Page />} />
                        <Route path="/country" element={<Countries />} />
                        <Route path="/city" element={<Cities />} />
                        <Route path="/locale" element={<Locales />} />
                        <Route path="/currency" element={<Currencies />} />
                        <Route path="/service" element={<Services />} />
                        <Route path="/plan" element={<Plans />} />
                        <Route path="/subscription" element={<Subscriptions />} />
                        <Route path="/user" element={<Users />} />
                        <Route path="/order" element={<Orders />} />
                        <Route path="/provider" element={<Providers />} />
                        <Route path="/role" element={<Roles />} />
                        <Route
                          path="/notification/template"
                          element={<NotificationsTemplates />}
                        />
                        <Route
                          path="/notification/history"
                          element={<NotificationsHistory />}
                        />
                        <Route path="/profile" element={<Profile />} />
                      </Route>
                    </Route>
                  </Routes>
                </NightModeContext.Provider>
              </LanguageContext.Provider>
            </PermissionsContext.Provider>
          </EnumsContext.Provider>
        </UserInfoContext.Provider>
      </LoadingContext.Provider>
      <Routes>
        <Route component={<NotFound />} />
      </Routes>
    </>
  );

}

export default App;
