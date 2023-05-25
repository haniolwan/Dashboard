import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Column = ({ label, value, hidden, orderBy, orderType, handleSort }) => {
  const NOT_ORDER = [
    "image",
    "avatar",
    "url",
    "active",
    "status",
    "symbol",
    "features",
    "order_price",
    "actions",
    "city",
    "country",
    "locale",
    "is_baned",
    "is_suspended",
    "page",
    "user",
    "provider",
    "service",
    "description",
    "key",
    "content",
    "message",
    "type",
    "latitude",
    "longitude",
    "hourly_rate",
    "is_active",
  ];
  const orderTypeComponent = () => {
    const iconClassName = `text-[#000] dark:text-gray-400 ${
      orderBy === value ? "text-primary-color dark:text-primary-color" : ""
    }`;
    if (orderBy === value && orderType === "asc") {
      return <FontAwesomeIcon className={iconClassName} icon={faSortUp} />;
    }
    if (orderBy === value && orderType === "desc") {
      return <FontAwesomeIcon className={iconClassName} icon={faSortDown} />;
    } else {
      return <FontAwesomeIcon className={iconClassName} icon={faSort} />;
    }
  };
  return !hidden && !NOT_ORDER.includes(value) ? (
    <th
      className="group cursor-pointer px-6 space-x-1"
      scope="col"
      onClick={() => handleSort(value)}
    >
      <span className={orderBy === value ? "text-primary-color" : ""}>
        {label}
      </span>
      {orderTypeComponent()}
    </th>
  ) : (
    <th
      className={`group px-6 space-x-1 ${value === "actions" && "text-end"}`}
      scope="col"
    >
      <span>{label}</span>
    </th>
  );
};

export default Column;
