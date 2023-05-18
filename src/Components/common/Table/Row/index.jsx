import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faEye,
  faGlobe,
  faPenToSquare,
  faTrash,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { PermissionsContext } from "../../../../context";
const Row = ({
  id,
  code,
  Currency,
  flag,
  Locale,
  name,
  email,
  online,
  country,
  city,
  Country,
  City,
  mobile,
  image,
  url,
  is_active,
  _key,
  content,
  description,
  locale,
  symbol,
  type,
  billing_days,
  price,
  features,
  order_price,
  orders_count,
  setUpdateRow,
  avatar,
  balance,
  started_at,
  expire_at,
  app_mode,
  city_id,
  country_id,
  is_baned,
  is_suspended,
  is_verified,
  locale_id,
  subscription_status,
  User,
  provider_id,
  Provider,
  service_id,
  Service,
  date,
  time,
  status,
  rate,
  review,
  hourly_rate,
  latitude,
  longitude,
  title,
  message,
  removeRow,
  translateRow,
  showRow,
  permissionsRow,
  cols,
}) => {
  const rowRef = useRef();
  const { name: nameCol, actions: actionsCol } = cols;

  const handleImgClick = ({ target }) => {
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    modal.style.display = "block";
    modalImg.src = target.src;
  };

  const { permissions } = useContext(PermissionsContext);
  const [actionsLoading, setActionsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setActionsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [permissions]);

  function SwitchComponent({ option }) {
    switch (option) {
      case "title":
        return (
          <td className="px-6">
            <span>{title}</span>
          </td>
        );
      case "image":
        return (
          <td className="px-6">
            <img
              id="myImg"
              className="w-[34px] h-[34px] rounded-[5px]"
              src={image}
              alt="Table Img"
              onClick={handleImgClick}
            />
          </td>
        );
      case "service":
        return (
          <td className="px-6">
            <span>{Service?.name}</span>
          </td>
        );
      case "name":
        return (
          <th scope="row" className="px-6 dark:text-[white]">
            <div className="flex items-center gap-2">
              {nameCol.label === "Username" && (
                <img
                  id="myImg"
                  className="w-[34px] h-[34px] rounded-[5px]"
                  src={avatar}
                  alt="Table Img"
                  onClick={handleImgClick}
                />
              )}
              <span>{name}</span>
            </div>
          </th>
        );
      case "key":
        return (
          <td className="px-6">
            <span>{_key}</span>
          </td>
        );
      case "billing_days":
        return (
          <td className="px-6">
            <span>{billing_days}</span>
          </td>
        );
      case "price":
        return (
          <td className="px-6">
            <span>{price}</span>
          </td>
        );
      case "features":
        return (
          <td className="px-6">
            <span>{features[0]}</span>
          </td>
        );
      case "order_price":
        return (
          <td className="px-6">
            <span>{order_price}</span>
          </td>
        );
      case "balance":
        return (
          <td className="px-6">
            <span>{balance}</span>
          </td>
        );
      case "orders_count":
        return (
          <td className="px-6">
            <span>{orders_count}</span>
          </td>
        );
      case "started_at":
        return (
          <td className="px-6">
            <span>{started_at.split(" ")[0]}</span>
          </td>
        );
      case "expire_at":
        return (
          <td className="px-6">
            <span>{expire_at.split(" ")[0]}</span>
          </td>
        );
      case "description":
      case "message":
        return (
          <td className="group px-6">
            <p>{(description || message).slice(0, 50) + " ..."}</p>
            <div
              id="tooltip-default"
              role="tooltip"
              className="group-hover:visible group-hover:opacity-1 absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm  tooltip dark:bg-gray-700"
            >
              {description || message}
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </td>
        );
      case "type":
        return (
          <td className="px-6">
            <div className="flex items-center justify-start gap-2 h-[3rem]">
              <FontAwesomeIcon
                className={`${
                  type ? "text-[#14FF00]" : "text-[#CCC] dark:text-[white]"
                }  w-[10px] h-[10px]`}
                icon={faCircle}
              />
              <span className="text-[14px] leading-[21px] font-[500]">
                {type ? "Active" : "Not Active"}
              </span>
            </div>
          </td>
        );
      case "content":
        return (
          <td className="px-6">
            <span>{content}</span>
          </td>
        );
      case "url":
        return (
          <td className="px-6">
            <span>{url}</span>
          </td>
        );
      case "active":
        return (
          <td className="px-6">
            <div className="flex items-center justify-start gap-2 h-[3rem]">
              <FontAwesomeIcon
                className={`${
                  is_active ? "text-[#14FF00]" : "text-[#CCC] dark:text-[white]"
                }  w-[10px] h-[10px]`}
                icon={faCircle}
              />
              <span className="text-[14px] leading-[21px] font-[500]">
                {is_active ? "Active" : "Not Active"}
              </span>
            </div>
          </td>
        );
      case "email":
        return (
          <td className="px-6">
            <span>{email}</span>
          </td>
        );
      case "mobile":
        return (
          <td className="px-6">
            <span>{mobile}</span>
          </td>
        );
      case "Country":
      case "country":
        return (
          <td className="px-6">
            <span>{Country?.name || country?.name}</span>
          </td>
        );
      case "City":
      case "city":
        return (
          <td className="px-6">
            <span>{City?.name || city?.name}</span>
          </td>
        );
      case "code":
        return (
          <td className="px-6">
            <span>{code}</span>
          </td>
        );
      case "symbol":
        return (
          <td className="px-6">
            <span>{symbol}</span>
          </td>
        );
      case "flag":
        return (
          <td className="px-6">
            <img
              id="myImg"
              className="w-[34px] h-[34px] rounded-[5px]"
              src={flag}
              alt="Table Img"
              onClick={handleImgClick}
            />
          </td>
        );
      case "Currency":
      case "currency":
        return (
          <td className="px-6">
            <span>{Currency.name}</span>
          </td>
        );
      case "locale":
      case "Locale":
        return (
          <td className="px-6">
            <span>{locale || Locale.name}</span>
          </td>
        );
      case "hourly_rate":
        return (
          <td className="px-6">
            <span>{hourly_rate}</span>
          </td>
        );
      case "latitude":
        return (
          <td className="px-6">
            <span>{latitude}</span>
          </td>
        );
      case "longitude":
        return (
          <td className="px-6">
            <span>{longitude}</span>
          </td>
        );
      case "User":
      case "user":
        return (
          <td className="px-6">
            <span>{User?.name}</span>
          </td>
        );
      case "Provider":
      case "provider":
        return (
          <td className="px-6">
            <span>{Provider?.name}</span>
          </td>
        );
      case "date":
        return (
          <td className="px-6">
            <span>{date}</span>
          </td>
        );
      case "time":
        return (
          <td className="px-6">
            <span>{time}</span>
          </td>
        );
      case "status":
      case "online":
        return (
          <td className="px-6">
            <div className="flex items-center justify-start gap-2 h-[3rem]">
              <FontAwesomeIcon
                className={`${
                  online ? "text-[#14FF00]" : "text-[#CCC] dark:text-[white]"
                }  w-[10px] h-[10px]`}
                icon={faCircle}
              />
              <span className="text-[14px] leading-[21px] font-[500]">
                {online ? "Online" : "Offline"}
              </span>
            </div>
          </td>
        );
      case "rate":
        return (
          <td className="px-6">
            <span>{rate}</span>
          </td>
        );
      case "review":
        return (
          <td className="group px-6">
            <p>{review.slice(0, 50) + " ..."}</p>
            <div
              id="tooltip-default"
              role="tooltip"
              className="group-hover:visible group-hover:opacity-1 absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm  tooltip dark:bg-gray-700"
            >
              {review}
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </td>
        );
      case "is_suspended":
        return (
          <td className="px-6">
            <div className="flex items-center justify-start gap-2 h-[3rem]">
              <FontAwesomeIcon
                className={`${
                  online ? "text-[#14FF00]" : "text-[#CCC] dark:text-[white]"
                }  w-[10px] h-[10px]`}
                icon={faCircle}
              />
              <span className="text-[14px] leading-[21px] font-[500]">
                {is_suspended ? "Suspended" : "Not Suspended"}
              </span>
            </div>
          </td>
        );
      case "is_baned":
        return (
          <td className="px-6">
            <div className="flex items-center justify-start gap-2 h-[3rem]">
              <FontAwesomeIcon
                className={`${
                  online ? "text-[#14FF00]" : "text-[#CCC] dark:text-[white]"
                }  w-[10px] h-[10px]`}
                icon={faCircle}
              />
              <span className="text-[14px] leading-[21px] font-[500]">
                {is_baned ? "Baned" : "Not Baned"}
              </span>
            </div>
          </td>
        );
      case "avatar":
        return (
          <td className="px-6">
            <img
              id="myImg"
              className="w-[34px] h-[34px] rounded-[5px]"
              src={avatar}
              alt="Table Img"
              onClick={handleImgClick}
            />
          </td>
        );
      case "actions":
        return (
          <td className="flex items-center justify-end text-center gap-2 px-6 py-2">
            {actionsLoading ? (
              <>
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
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
                  <span className="sr-only">Loading...</span>
                </div>
              </>
            ) : (
              <>
                {actionsCol.actions.delete && (
                  <button
                    data-remove={id}
                    onClick={removeRow}
                    className="group rtl:ml-2 rtl:mr-0 dark:text-[white] dark:bg-gray-800 "
                  >
                    <FontAwesomeIcon
                      data-edit={id}
                      className="group-hover:text-white group-hover:bg-primary-color pointer-events-none h-[16px] rounded-[5px] p-2 text-primary-color bg-[#DF8D621A]"
                      icon={faTrash}
                    />
                  </button>
                )}
                {actionsCol.actions.edit && (
                  <button
                    className="group rtl:ml-2 rtl:mr-0 dark:text-[white] dark:bg-gray-800 "
                    data-edit={id}
                    onClick={setUpdateRow}
                  >
                    <FontAwesomeIcon
                      data-edit={id}
                      className="group-hover:text-white group-hover:bg-primary-color pointer-events-none h-[16px] rounded-[5px] p-2 text-primary-color bg-[#DF8D621A]"
                      icon={faPenToSquare}
                    />
                  </button>
                )}
                {actionsCol.actions.translate && (
                  <button
                    className="group rtl:ml-2 rtl:mr-0 dark:text-[white] dark:bg-gray-800 "
                    data-translate={id}
                    onClick={translateRow}
                  >
                    <FontAwesomeIcon
                      data-edit={id}
                      className="group-hover:text-white group-hover:bg-primary-color pointer-events-none h-[16px] rounded-[5px] p-2 text-primary-color bg-[#DF8D621A]"
                      icon={faGlobe}
                    />
                  </button>
                )}
                {actionsCol.actions.show && (
                  <button
                    className="group rtl:ml-2 rtl:mr-0 dark:text-[white] dark:bg-gray-800 "
                    data-show={id}
                    onClick={showRow}
                  >
                    <FontAwesomeIcon
                      data-show={id}
                      className="group-hover:text-white group-hover:bg-primary-color pointer-events-none h-[16px] rounded-[5px] p-2 text-primary-color bg-[#DF8D621A]"
                      icon={faEye}
                    />
                  </button>
                )}
                {actionsCol.actions.permission && (
                  <button
                    className="group rtl:ml-2 rtl:mr-0 dark:text-[white] dark:bg-gray-800 "
                    data-permission={id}
                    onClick={permissionsRow}
                  >
                    <FontAwesomeIcon
                      data-show={id}
                      className="group-hover:text-white group-hover:bg-primary-color pointer-events-none h-[16px] rounded-[5px] p-2 text-primary-color bg-[#DF8D621A]"
                      icon={faUserShield}
                    />
                  </button>
                )}
              </>
            )}
          </td>
        );
      default:
        return <></>;
    }
  }

  return (
    <tr
      ref={rowRef}
      className="show-element text-[#000] bg-white border-t text-[14px] leading-[24px] font-[400] whitespace-normal dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
    >
      {Object.keys(cols).map((col) => {
        const { hidden } = cols[col];
        return !hidden && <SwitchComponent key={col} option={col} />;
      })}
    </tr>
  );
};

export default Row;
