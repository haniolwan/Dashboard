/* eslint-disable react-hooks/rules-of-hooks */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Locale } from "../../../classes";
import { deleteRow, query } from "../../../utils";
import Pagination from "../../Pagination";
import {
  AddCity,
  AddCountry,
  AddCurrency,
  AddService,
  AddUser,
  Filter,
  TranslatePage,
  TranslateSlider,
  TranslateService,
  TranslateCurrency,
  TranslateCity,
  TranslateCountry,
  AddPlan,
  ShowOrder,
  AddRole,
  AddEmployee,
  ShowUser,
  ShowSubscription,
  ShowEmployee,
  ShowCountry,
  ShowCity,
  ShowSlider,
  ShowPage,
  ShowService,
  ShowCurrency,
  ShowPlan,
  AddNotificationTemplate,
  ShowNotificationsHistory,
  TranslatePlan,
  TranslateNotificationTemplate,
  SetPermissions,
  ShowProvider,
  AddLocale,
} from "../../Popups";
import FilterCountries from "../../Popups/Filter/FilterCountries";
import AddPage from "../../Popups/Insert/Page";
import AddSlider from "../../Popups/Insert/Slider";
import Column from "./Column";
import Loading from "./Loading";
import Row from "./Row";
import ImageModal from "./Row/ImageModal";
import SelectRows from "./SelectRows";
import Tools from "./Tools";
import {
  getDataClass,
  getDataCollection,
  getTranslationClass,
} from "./methods";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const TableContext = createContext();

const Table = ({ children, path, tools, cols }) => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState({ selected: 1 });
  const [total, setTotal] = useState();
  const [lastPage, setLastPage] = useState(1);

  const [nRows, setnRows] = useState(10);
  const [search, setSearch] = useState("");

  const [orderBy, setOrderBy] = useState("");
  const [orderType, setOrderType] = useState("");
  const [loading, setLoading] = useState(true);

  const [showFilter, setShowFilter] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [showTranslateModal, setShowTranslateModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);

  const [userId, setUserId] = useState();

  const [tableCols, setTableCols] = useState(cols);

  const [filter, setFilter] = useState({
    is_suspended: 0,
    is_baned: 0,
    city_id: null,
    country_id: null,
    currency_id: null,
    locale_id: null,
    is_active: 0,
  });

  const [typeModal, setModalType] = useState("");

  const [localeOptions, setLocaleOptions] = useState([]);
  const [locale, setLocale] = useState();

  const [updated, setUpdated] = useState([]);

  const [selectedRow, setSelectedRow] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [refreshRows, setRefreshRows] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const apiPath = useCallback(() => {
    let api = `/api/dashboard/${path}/?q=${search}`;
    if (location.state && location.state.userId) {
      api += `&user_id=${location.state.userId}`;
      navigate(location.pathname, { replace: true });
    }
    if (filter.country_id) {
      api += `&country_id=${filter.country_id}`;
      if (filter.city_id) {
        api += `&city_id=${filter.city_id}`;
      }
    }
    if (filter.is_baned) {
      api += `&is_baned=${filter.is_baned}`;
    }
    if (filter.is_suspended) {
      api += `&is_suspended=${filter.is_suspended}`;
    }
    if (filter.is_active) {
      api += `&is_active=${filter.is_active}`;
    }
    if (filter.currency_id) {
      api += `&currency_id=${filter.currency_id}`;
      if (filter.locale_id) {
        api += `&locale_id=${filter.locale_id}`;
      }
    }
    if (orderBy) {
      api += `&order_by=${orderBy}&order_type=${orderType}`;
    }
    api += `&per_page=${nRows}`;
    return api;
  }, [
    filter.city_id,
    filter.country_id,
    filter.currency_id,
    filter.is_active,
    filter.is_baned,
    filter.is_suspended,
    filter.locale_id,
    location.pathname,
    location.state,
    nRows,
    navigate,
    orderBy,
    orderType,
    path,
    search,
  ]);

  const isFetched = useRef(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = apiPath();
        const {
          data: { data },
        } = await query(api);
        const { collection, pagination } = getDataCollection(data, path);
        setRows(collection);
        setCurrentPage({ selected: pagination.current_page });
        setLastPage(pagination.last_page);
        setTotal(pagination.total);
        setLoading(false);
        setRefreshRows(false);
      } catch ({
        response: {
          data: { message },
        },
      }) {
        toast.error(<span>{message.join("\r\n")}</span>);
      }
    };
    let timer = setTimeout(() => {
      fetchData();
      isFetched.current = true;
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [
    search,
    nRows,
    orderBy,
    orderType,
    loading,
    filter,
    apiPath,
    path,
    refreshRows,
    currentPage.selected,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await query(`/api/dashboard/${path}/${userId}`);
        setSelectedRow(getDataClass(data, path));
      } catch ({
        response: {
          data: { message },
        },
      }) {
        toast.error(<span>{message.join("\r\n")}</span>);
      }
    };
    if (
      (userId && showAddModal) ||
      (userId && showModal) ||
      (userId && showPermissionsModal)
    ) {
      fetchData();
    }
  }, [userId, showModal, path, showPermissionsModal, showAddModal]);

  useEffect(() => {
    setFilter({
      is_suspended: 0,
      is_baned: 0,
      city_id: "",
      country_id: "",
    });
  }, [showFilter]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: {
            data: { Locales },
          },
        } = await query(`/api/dashboard/lists/locales/`);
        const localeArr = Locales.map((locale) => {
          return new Locale(locale);
        });
        setLocaleOptions(localeArr);
      } catch ({
        response: {
          data: { message },
        },
      }) {
        toast.error(<span>{message.join("\r\n")}</span>);
      }
    };
    let timer = setTimeout(() => {
      if (showTranslateModal) {
        fetchData();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [showTranslateModal]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await query(
          `/api/dashboard/${path}/${userId}/translation/?locale_id=${locale}`
        );
        setSelectedRow(getTranslationClass(data, path));
      } catch ({
        response: {
          data: { message },
        },
      }) {
        toast.error(<span>{message.join("\r\n")}</span>);
      }
    };
    if (userId && showTranslateModal) {
      fetchData();
    }
  }, [locale, userId, showTranslateModal, path]);

  return (
    <TableContext.Provider
      value={{
        path,
        tools,
        rows,
        setRows,
        search,
        setSearch,
        showFilter,
        setShowFilter,
        orderBy,
        setOrderBy,
        orderType,
        setOrderType,
        nRows,
        setnRows,
        loading,
        setLoading,
        total,
        setTotal,
        lastPage,
        setLastPage,
        currentPage,
        setCurrentPage,
        userId,
        setUserId,
        showAddModal,
        setShowAddModal,
        tableCols,
        setTableCols,
        filter,
        setFilter,
        typeModal,
        setModalType,
        showTranslateModal,
        setShowTranslateModal,
        localeOptions,
        setLocaleOptions,
        updated,
        setUpdated,
        setSelectedRow,
        selectedRow,
        showModal,
        setShowModal,
        refreshRows,
        setRefreshRows,
        isFetched,
        locale,
        setLocale,
        showPermissionsModal,
        setShowPermissionsModal,
        showEditModal,
        setShowEditModal,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

Table.OuterContainer = ({ children }) => {
  return <div className="w-full">{children}</div>;
};

Table.InnerContainer = ({ children }) => {
  return <div className="relative shadow-md sm:rounded-lg">{children}</div>;
};

Table.HeadContainer = ({ children }) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      {children}
    </table>
  );
};

Table.Tools = () => {
  const {
    path,
    tools,
    setSearch,
    showFilter,
    setShowFilter,
    tableCols,
    setTableCols,
    filter,
    setFilter,
    setShowAddModal,
    setModalType,
    isFetched,
  } = useContext(TableContext);
  const filterBySearch = ({ target: { value } }) => {
    setSearch(value);
    isFetched.current = false;
  };

  const FilterComponent = () => {
    switch (path) {
      case "employees":
        return (
          <Filter show={showFilter} filter={filter} setFilter={setFilter} />
        );
      case "countries":
        return (
          <FilterCountries
            show={showFilter}
            filter={filter}
            setFilter={setFilter}
          />
        );
      default:
        <></>;
    }
  };
  return (
    <>
      <Tools
        tools={tools}
        path={path}
        filterBySearch={filterBySearch}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        tableCols={tableCols}
        setTableCols={setTableCols}
        setShowAddModal={setShowAddModal}
        setModalType={setModalType}
        isFetched={isFetched}
      />
      {FilterComponent()}
    </>
  );
};

Table.Head = () => {
  const {
    orderBy,
    orderType,
    setOrderBy,
    setOrderType,
    setLoading,
    tableCols,
  } = useContext(TableContext);

  const handleSort = (column) => {
    setOrderBy(column);
    setLoading(true);
    if (!orderType) {
      setOrderType("asc");
    } else if (orderType === "asc") {
      setOrderType("desc");
    } else {
      setOrderBy("");
      setOrderType("");
    }
  };

  return (
    <thead className="uppercase bg-[white] dark:bg-gray-800">
      <tr className="dark:border-gray-700 dark:text-gray-400 border-b text-[#000] text-[14px] leading-[24px] font-[600]">
        {Object.keys(tableCols).map((col) => {
          const { label, value, hidden } = tableCols[col];
          return (
            !hidden && (
              <Column
                key={value}
                label={label}
                value={value}
                hidden={hidden}
                orderBy={orderBy}
                orderType={orderType}
                handleSort={handleSort}
              />
            )
          );
        })}
      </tr>
    </thead>
  );
};

Table.Body = () => {
  const {
    path,
    rows,
    setRows,
    nRows,
    loading,
    setUserId,
    setShowAddModal,
    tableCols,
    setModalType,
    setShowTranslateModal,
    setShowModal,
    setShowPermissionsModal,
  } = useContext(TableContext);

  const setUpdateRow = ({
    target: {
      dataset: { edit },
    },
  }) => {
    setUserId(edit);
    setShowAddModal(true);
    setModalType("update");
  };

  const removeRow = ({
    target: {
      dataset: { remove },
    },
  }) => {
    deleteRow(path, remove, setRows);
  };

  const translateRow = ({
    target: {
      dataset: { translate },
    },
  }) => {
    setUserId(translate);
    setShowTranslateModal(true);
  };

  const showRow = ({
    target: {
      dataset: { show },
    },
  }) => {
    setUserId(show);
    setShowModal(true);
  };

  const permissionsRow = ({
    target: {
      dataset: { permission },
    },
  }) => {
    setUserId(permission);
    setShowPermissionsModal(true);
  };
  return (
    <tbody>
      {loading
        ? new Array(nRows)
            .fill("")
            .map((ele, i) => <Loading key={i} cols={tableCols} />)
        : rows.map(
            ({
              id,
              code,
              Currency,
              flag,
              Locale,
              name,
              value,
              avatar,
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
              key,
              description,
              content,
              locale,
              symbol,
              type,
              billing_days,
              price,
              features,
              order_price,
              orders_count,
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
            }) => {
              return (
                <Row
                  key={id}
                  id={id}
                  code={code}
                  Currency={Currency}
                  flag={flag}
                  Locale={Locale}
                  name={name}
                  value={value}
                  avatar={avatar}
                  email={email}
                  online={online}
                  country={country}
                  city={city}
                  Country={Country}
                  City={City}
                  mobile={mobile}
                  image={image}
                  url={url}
                  is_active={is_active}
                  _key={key}
                  description={description}
                  content={content}
                  locale={locale}
                  symbol={symbol}
                  type={type}
                  billing_days={billing_days}
                  price={price}
                  features={features}
                  order_price={order_price}
                  orders_count={orders_count}
                  balance={balance}
                  started_at={started_at}
                  expire_at={expire_at}
                  app_mode={app_mode}
                  city_id={city_id}
                  country_id={country_id}
                  is_baned={is_baned}
                  is_suspended={is_suspended}
                  is_verified={is_verified}
                  locale_id={locale_id}
                  subscription_status={subscription_status}
                  User={User}
                  provider_id={provider_id}
                  Provider={Provider}
                  service_id={service_id}
                  Service={Service}
                  date={date}
                  time={time}
                  status={status}
                  rate={rate}
                  review={review}
                  hourly_rate={hourly_rate}
                  latitude={latitude}
                  longitude={longitude}
                  title={title}
                  message={message}
                  setUpdateRow={setUpdateRow}
                  removeRow={removeRow}
                  translateRow={translateRow}
                  showRow={showRow}
                  permissionsRow={permissionsRow}
                  cols={tableCols}
                />
              );
            }
          )}
    </tbody>
  );
};

Table.Footer = () => {
  const {
    path,
    nRows,
    total,
    setnRows,
    lastPage,
    setCurrentPage,
    currentPage,
    setLoading,
    userId,
    showAddModal,
    setShowAddModal,
    showTranslateModal,
    setShowTranslateModal,
    localeOptions,
    updated,
    setUpdated,
    selectedRow,
    showModal,
    setShowModal,
    setRefreshRows,
    locale,
    setLocale,
    showPermissionsModal,
    setShowPermissionsModal,
    setUserId,
    setSelectedRow,
  } = useContext(TableContext);

  const handleInputChange = ({
    target: { type, name, value, checked, files },
  }) => {
    if (type === "file") {
      setUpdated({ ...updated, [name]: files[0] });
    } else if (type === "checkbox") {
      setUpdated({ ...updated, [name]: checked ? 1 : 0 });
    } else {
      if (name === "country_id") {
        delete updated["city_id"];
      }
      setUpdated({ ...updated, [name]: value });
    }
  };
  useEffect(() => {
    if (userId && !showAddModal) {
      setUserId();
      setSelectedRow();
    }
  }, [setSelectedRow, setUserId, userId, showAddModal]);

  const changeLocale = ({
    target: {
      dataset: { data },
    },
  }) => {
    setLocale(parseInt(data));
  };

  useEffect(() => {
    if (localeOptions && !locale) {
      setLocale(localeOptions[0]?.id);
    }
  }, [locale, localeOptions, setLocale]);

  useEffect(() => {
    if (!showAddModal) {
      setUpdated([]);
    }
  }, [setUpdated, showAddModal]);

  return (
    <>
      <div className="relative bottom-0  flex justify-between items-center flex-col mt-5 sm:mt-0 sm:flex-row pb-2">
        <div className="flex items-center justify-between gap-4">
          <p className="w-full text-[14px] leading-[21px] font-[400] text-[#00000080] dark:text-[white]">
            Showing {nRows} of {total} rows
          </p>
          <SelectRows setnRows={setnRows} setLoading={setLoading} />
        </div>
        <Pagination
          totalCount={lastPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage.selected}
          setLoading={setLoading}
        />
        <ImageModal />
      </div>
      {
        {
          employees: (
            <>
              <AddEmployee
                employeeId={userId}
                selectedRow={selectedRow}
                show={showAddModal}
                setShow={setShowAddModal}
                updated={updated}
                setUpdated={setUpdated}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
              />
              <ShowEmployee
                selectedRow={selectedRow}
                show={showModal}
                setShow={setShowModal}
              />
              <SetPermissions
                userId={userId}
                selectedRow={selectedRow}
                show={showPermissionsModal}
                setShow={setShowPermissionsModal}
                updated={updated}
                setUpdated={setUpdated}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
              />
            </>
          ),
          countries: (
            <>
              <AddCountry
                countryId={userId}
                selectedRow={selectedRow}
                show={showAddModal}
                setShow={setShowAddModal}
                updated={updated}
                setUpdated={setUpdated}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
              />
              <TranslateCountry
                countryId={userId}
                selectedRow={selectedRow}
                show={showTranslateModal}
                setShow={setShowTranslateModal}
                updated={updated}
                setUpdated={setUpdated}
                localeOptions={localeOptions}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
                locale={locale}
                changeLocale={changeLocale}
              />
              {/* <ShowCountry
                selectedRow={selectedRow}
                show={showModal}
                setShow={setShowModal}
              /> */}
            </>
          ),
          cities: (
            <>
              <AddCity
                cityId={userId}
                selectedRow={selectedRow}
                show={showAddModal}
                setShow={setShowAddModal}
                updated={updated}
                setUpdated={setUpdated}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
              />
              <TranslateCity
                cityId={userId}
                selectedRow={selectedRow}
                show={showTranslateModal}
                setShow={setShowTranslateModal}
                updated={updated}
                setUpdated={setUpdated}
                localeOptions={localeOptions}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
                locale={locale}
                changeLocale={changeLocale}
              />
              <ShowCity
                selectedRow={selectedRow}
                show={showModal}
                setShow={setShowModal}
              />
            </>
          ),
          sliders: (
            <>
              <AddSlider
                sliderId={userId}
                selectedRow={selectedRow}
                show={showAddModal}
                setShow={setShowAddModal}
                updated={updated}
                setUpdated={setUpdated}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
              />
              <TranslateSlider
                sliderId={userId}
                selectedRow={selectedRow}
                show={showTranslateModal}
                setShow={setShowTranslateModal}
                updated={updated}
                setUpdated={setUpdated}
                localeOptions={localeOptions}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
                locale={locale}
                changeLocale={changeLocale}
              />
              <ShowSlider
                selectedRow={selectedRow}
                show={showModal}
                setShow={setShowModal}
              />
            </>
          ),
          pages: (
            <>
              <AddPage
                pageId={userId}
                selectedRow={selectedRow}
                show={showAddModal}
                setShow={setShowAddModal}
                updated={updated}
                setUpdated={setUpdated}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
              />
              <TranslatePage
                pageId={userId}
                selectedRow={selectedRow}
                show={showTranslateModal}
                setShow={setShowTranslateModal}
                updated={updated}
                setUpdated={setUpdated}
                localeOptions={localeOptions}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
                locale={locale}
                changeLocale={changeLocale}
              />
              <ShowPage
                selectedRow={selectedRow}
                show={showModal}
                setShow={setShowModal}
              />
            </>
          ),
          services: (
            <>
              <AddService
                serviceId={userId}
                selectedRow={selectedRow}
                show={showAddModal}
                setShow={setShowAddModal}
                updated={updated}
                setUpdated={setUpdated}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
              />
              <TranslateService
                serviceId={userId}
                selectedRow={selectedRow}
                show={showTranslateModal}
                setShow={setShowTranslateModal}
                updated={updated}
                setUpdated={setUpdated}
                localeOptions={localeOptions}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
                locale={locale}
                changeLocale={changeLocale}
              />
              <ShowService
                selectedRow={selectedRow}
                show={showModal}
                setShow={setShowModal}
              />
            </>
          ),
          currencies: (
            <>
              <AddCurrency
                currencyId={userId}
                selectedRow={selectedRow}
                show={showAddModal}
                setShow={setShowAddModal}
                updated={updated}
                setUpdated={setUpdated}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
              />
              <TranslateCurrency
                currencyId={userId}
                selectedRow={selectedRow}
                show={showTranslateModal}
                setShow={setShowTranslateModal}
                updated={updated}
                setUpdated={setUpdated}
                localeOptions={localeOptions}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
                locale={locale}
                changeLocale={changeLocale}
              />
              <ShowCurrency
                selectedRow={selectedRow}
                show={showModal}
                setShow={setShowModal}
              />
            </>
          ),
          users: (
            <>
              <AddUser
                userId={userId}
                selectedRow={selectedRow}
                show={showAddModal}
                setShow={setShowAddModal}
                updated={updated}
                setUpdated={setUpdated}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
              />
              {/* <ShowUser
                selectedRow={selectedRow}
                show={showModal}
                setShow={setShowModal}
                handleInputChange={handleInputChange}
              /> */}
            </>
          ),
          plans: (
            <>
              <AddPlan
                planId={userId}
                selectedRow={selectedRow}
                show={showAddModal}
                setShow={setShowAddModal}
                updated={updated}
                setUpdated={setUpdated}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
              />
              <TranslatePlan
                planId={userId}
                selectedRow={selectedRow}
                show={showTranslateModal}
                setShow={setShowTranslateModal}
                updated={updated}
                setUpdated={setUpdated}
                localeOptions={localeOptions}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
                locale={locale}
                changeLocale={changeLocale}
              />
              {/* <ShowPlan
                selectedRow={selectedRow}
                show={showModal}
                setShow={setShowModal}
                handleInputChange={handleInputChange}
              /> */}
            </>
          ),
          orders: (
            <>
              <ShowOrder
                show={showModal}
                setShow={setShowModal}
                selectedRow={selectedRow}
              />
            </>
          ),
          roles: (
            <>
              <AddRole
                roleId={userId}
                selectedRow={selectedRow}
                show={showAddModal}
                setShow={setShowAddModal}
                updated={updated}
                setUpdated={setUpdated}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
              />
            </>
          ),
          subscriptions: (
            <>
              <ShowSubscription
                show={showModal}
                setShow={setShowModal}
                selectedRow={selectedRow}
              />
            </>
          ),
          providers: (
            <>
              <ShowProvider
                show={showModal}
                setShow={setShowModal}
                selectedRow={selectedRow}
              />
            </>
          ),
          notifications_templates: (
            <>
              <AddNotificationTemplate
                rowId={userId}
                selectedRow={selectedRow}
                show={showAddModal}
                setShow={setShowAddModal}
                updated={updated}
                setUpdated={setUpdated}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
              />
              <TranslateNotificationTemplate
                rowId={userId}
                selectedRow={selectedRow}
                show={showTranslateModal}
                setShow={setShowTranslateModal}
                updated={updated}
                setUpdated={setUpdated}
                localeOptions={localeOptions}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
                locale={locale}
                changeLocale={changeLocale}
              />
            </>
          ),
          notifications_history: (
            <>
              <ShowNotificationsHistory
                show={showModal}
                setShow={setShowModal}
                selectedRow={selectedRow}
              />
            </>
          ),
          locales: (
            <>
              <AddLocale
                localeId={userId}
                selectedRow={selectedRow}
                show={showAddModal}
                setShow={setShowAddModal}
                updated={updated}
                setUpdated={setUpdated}
                handleInputChange={handleInputChange}
                setRefreshRows={setRefreshRows}
              />
            </>
          ),
        }[path]
      }
    </>
  );
};

export default Table;
