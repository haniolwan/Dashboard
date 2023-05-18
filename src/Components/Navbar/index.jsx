import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import IMAGES from "../../assets";

const Navbar = ({ navbarItems }) => {
  const [navbar, setNavbar] = useState();
  const { pathname } = useLocation();
  const navbarRef = useRef();
  useOnClickOutside(navbarRef, "", () => setNavbar(false));
  return (
    <nav
      ref={navbarRef}
      className="dark:bg-gray-800 w-full px-[2rem] lg:px-[6rem]
                    shadow-[0_4px_20px_rgba(0,0,0,0.05)]
                    lg:fixed lg:bg-white lg:z-10"
    >
      <div className="lg:max-w-7xl lg:items-center lg:flex lg:max-h-[5rem]">
        <div className="flex items-center justify-between py-3 lg:py-5 lg:block">
          <img
            className="nav-logo w-[2rem]"
            src={IMAGES.aside_collabse.src}
            alt={IMAGES.aside_collabse.alt}
          />
          <div className="lg:hidden">
            <button
              className="p-2 text-gray-700 rounded-md
                            outline-none focus:border-none focus:border dark:text-gray-400 sm:focus:border-none"
              onClick={() => setNavbar(!navbar)}
            >
              {navbar ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>
          </div>
        </div>
        <div
          className={`pb-[2rem] flex-1 items-center 
            pb-3 mt-8 lg:block lg:pb-0 lg:mt-0 
              ${navbar ? "block" : "hidden"}`}
        >
          <ul className="space-y-2">
            {navbarItems.map(({ path, label, icon }, i) => {
              return (
                <li key={i}>
                  <Link
                    to={path}
                    className={`flex items-center p-2 rounded-lg text-[#ADB5BD] hover:text-primary-color hover:bg-[#DF8D621A] rtl:gap-2 ${
                      pathname === "/" + path &&
                      "text-primary-color bg-[#DF8D621A] text-placeholder-color dark:bg-gray-700"
                    }`}
                  >
                    <FontAwesomeIcon icon={icon} />
                    <span className="ml-3">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
