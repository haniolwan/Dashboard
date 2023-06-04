import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import {
  faBell,
  faBellConcierge,
  faChartSimple,
  faCity,
  faClockRotateLeft,
  faCoins,
  faDice,
  faEnvelopeOpen,
  faGlobe,
  faHammer,
  faHouse,
  faLanguage,
  faLeaf,
  faPager,
  faPenNib,
  faRodAsclepius,
  faSliders,
  faSquarePollVertical,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import useWindowSize from "../../hooks/useWindowSize";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Tools from "../Tools";
import { LoadingContext, PermissionsContext } from "../../context";

const Container = () => {
  const { width } = useWindowSize();
  const [sideBarWidth, setSideBarWidth] = useState(false);
  const { permissions } = useContext(PermissionsContext);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (localStorage.getItem("sidebar") === "collabsed") {
      setSideBarWidth(true);
    } else {
      setSideBarWidth(false);
    }
  }, []);
  const { t } = useTranslation();

  const sidebarItems = [
    {
      path: "dashboard",
      label: t("sidebar.tab1"),
      tooltip: t("sidebar.tab1"),
      icon: faHouse,
      hidden: false,
    },
    {
      path: "employee",
      label: t("sidebar.tab4"),
      tooltip: t("sidebar.tab4"),
      icon: faUsers,
      hidden: !permissions.includes("employee"),
    },
    {
      path: "role",
      label: "Roles",
      tooltip: "Roles",
      icon: faDice,
      hidden: !permissions.includes("role"),
    },
    {
      path: "subscription",
      label: "Subscriptions",
      tooltip: "Subscriptions",
      icon: faHammer,
      hidden: !permissions.includes("subscription"),
    },
    {
      path: "user",
      label: "Users",
      tooltip: "Users",
      icon: faUsers,
      hidden: !permissions.includes("user"),
    },
    {
      path: "order",
      label: "Order",
      tooltip: "Order",
      icon: faRodAsclepius,
      hidden: !permissions.includes("order"),
    },
    {
      path: "provider",
      label: "Provider",
      tooltip: "Provider",
      icon: faSquarePollVertical,
      hidden: !permissions.includes("provider"),
    },
    {
      path: "plan",
      label: t("sidebar.tab9"),
      tooltip: t("sidebar.tab9"),
      icon: faLeaf,
      hidden: !permissions.includes("plan"),
    },
    {
      path: "notification",
      label: t("sidebar.tab8"),
      tooltip: t("sidebar.tab8"),
      icon: faBell,
      hidden: !permissions.includes("notification"),
      children: [
        {
          path: "notification/template",
          label: "Templates",
          tooltip: "Notifications templates",
          icon: faEnvelopeOpen,
          hidden: !permissions.includes("notification.template"),
        },
        {
          path: "notification/history",
          label: "History",
          tooltip: "Notifications history",
          icon: faClockRotateLeft,
          hidden: !permissions.includes("notification.history"),
        },
        {
          path: "notification/actions",
          label: "Actions",
          tooltip: "Notifications actions",
          icon: faPenNib,
          hidden: false,
        },
      ],
    },
    {
      path: "settings",
      label: "Settings",
      tooltip: "Settings",
      icon: faChartSimple,
      children: [
        {
          path: "settings",
          label: "Settings",
          tooltip: "Settings",
          icon: faGlobe,
          hidden: false,
        },
        {
          path: "country",
          label: t("sidebar.tab5"),
          tooltip: t("sidebar.tab5"),
          icon: faGlobe,
          hidden: !permissions.includes("country"),
        },
        {
          path: "city",
          label: t("sidebar.tab6"),
          tooltip: t("sidebar.tab6"),
          icon: faCity,
          hidden: !permissions.includes("city"),
        },
        {
          path: "slider",
          label: "sliders",
          tooltip: "sliders",
          icon: faSliders,
          hidden: !permissions.includes("slider"),
        },
        {
          path: "page",
          label: "page",
          tooltip: "page",
          icon: faPager,
          hidden: !permissions.includes("page"),
        },
        {
          path: "locale",
          label: "Locales",
          tooltip: "locales",
          icon: faLanguage,
          hidden: !permissions.includes("locale"),
        },
        {
          path: "currency",
          label: "Currencies",
          tooltip: "currencies",
          icon: faCoins,
          hidden: !permissions.includes("currency"),
        },
        {
          path: "service",
          label: "Services",
          tooltip: "services",
          icon: faBellConcierge,
          hidden: !permissions.includes("service"),
        },
      ],
    },
  ];

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <>
      {width <= 768 ? (
        <Navbar navbarItems={sidebarItems} />
      ) : (
        <Sidebar
          sidebarItems={sidebarItems}
          setSideBarWidth={setSideBarWidth}
        />
      )}
      <Tools sideBarWidth={sideBarWidth} />
      <div
        className={`dark:bg-gray-900 flex md:pt-[6rem] transition-all ease-in-out
             ${
               !sideBarWidth
                 ? "md:ml-[12rem] md:rtl:mr-[12rem] md:rtl:ml-0"
                 : "md:ml-[4rem] md:rtl:mr-[4rem] rtl:ml-0"
             } px-8`}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Container;
