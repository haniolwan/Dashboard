/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext } from "react";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TabContext = createContext();

const Tab = ({ currentTab, onChange, children }) => {
  return (
    <TabContext.Provider value={{ currentTab, onChange, children }}>
      {children}
    </TabContext.Provider>
  );
};
Tab.Container = ({ children }) => {
  return (
    <nav className="col-span-3 row-span-2 bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded-[10px] dark:bg-gray-800">
      {children}
    </nav>
  );
};

Tab.Navigation = ({ nav, setNav, children }) => {
  return (
    <>
      <button
        onClick={() => setNav(!nav)}
        data-collapse-toggle="navbar-default"
        type="button"
        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <FontAwesomeIcon icon={faBurger} />
      </button>
      <div
        className={`${!nav && "hidden"} w-full md:block md:w-auto`}
        id="navbar-default"
      >
        <ul
          className="flex flex-col p-4 mt-4 border-b borde-[#ADB5BD33] md:flex-row md:space-x-8 md:mt-0
         md:text-sm md:font-medium border-0 dark:bg-gray-800"
        >
          {children}
        </ul>
      </div>
    </>
  );
};

Tab.NavItem = ({ index, label }) => {
  const { currentTab, onChange } = useContext(TabContext);
  return (
    <li
      onClick={() => onChange(index)}
      className={`${
        currentTab !== index && "text-[black] text-placeholder-color"
      }
      hover:text-primary-color text-primary-color
     cursor-pointer py-2 pl-3 pr-4 
         md:p-0`}
      aria-current="page"
    >
      {label}
    </li>
  );
};

Tab.ContentContainer = ({ children }) => {
  return <div>{children}</div>;
};

Tab.ContentItem = ({ index, children }) => {
  const { currentTab } = useContext(TabContext);
  return currentTab === index ? <div>{children}</div> : null;
};

export default Tab;
