import { useEffect, useRef, useState } from "react";
import { SelectCurrency, SelectLocale } from "../../../../classes";
import { query } from "../../../../utils";
import { Button, SelectInput } from "../../../common";
import { toast } from "react-toastify";

const FilterCountries = ({ show, filter, setFilter }) => {
  const [updated, setUpdated] = useState({});

  const [currenciesOptions, setCurrencyOptions] = useState([]);
  const [currenySearch] = useState("");

  const [localeOptions, setLocaleOptions] = useState([]);
  const [localeSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: {
            data: { Currencies },
          },
        } = await query(
          `/api/dashboard/lists/currencies?q=${currenySearch}&is_active=1`
        );
        const currenciesArr = Currencies.map((currency) => {
          return new SelectCurrency(currency);
        });
        setCurrencyOptions(currenciesArr);
      } catch ({
        response: {
          data: { message },
        },
      }) {
        toast.error(<span>{message.join("\r\n")}</span>);
      }
    };
    let timer = setTimeout(() => {
      if (show) {
        fetchData();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [currenySearch, show]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: {
            data: { Locales },
          },
        } = await query(
          `/api/dashboard/lists/locales?q=${localeSearch}&currency_id=${updated.country_id}&is_active=1`
        );
        const localeArr = Locales.map((locale) => {
          return new SelectLocale(locale);
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
      if (show) {
        fetchData();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [currenySearch, updated.country_id, localeSearch, show]);

  const currencyRef = useRef(null);
  const localeRef = useRef(null);

  const reset = () => {
    setUpdated({});
    setFilter({
      is_suspended: 0,
      is_baned: 0,
      city_id: "",
      country_id: "",
      currency_id: "",
      locale_id: "",
    });
    currencyRef.current.select.setValue({});
    localeRef.current.select.setValue({});
  };

  return (
    <div
      className={`${
        !show ? "p-0 w-0 h-0" : "h-[20rem] pb-15 p-5 w-full"
      } pt-0 transition-all ease-in-out lg:w-auto bg-[white] dark:bg-gray-800`}
    >
      <div
        className={`${
          !show && "hidden"
        } grid grid-rows-3 gap-y-6 p-5 gap-10 flex flex-col rounded-[5px] bg-[#FBFBFC] dark:bg-gray-800 text-placeholder-color`}
      >
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-1 text-[16px] leading-[24px] font-[500] text-placeholder-color">
            Filter
          </p>
          <div className="grid grid-cols-2 col-span-11 gap-5 content-center	">
            <SelectInput
              ref={currencyRef}
              name={"Currency"}
              label={"Currency"}
              options={currenciesOptions}
              onChange={(currency) => {
                setUpdated({
                  ...updated,
                  currency_id: currency.id,
                });
              }}
            />
            <SelectInput
              ref={localeRef}
              name={"Locale"}
              label={"Locale"}
              options={localeOptions}
              onChange={(locale) => {
                setUpdated({
                  ...updated,
                  locale_id: locale.value,
                });
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-1 text-[16px] leading-[24px] font-[500]"></p>
          <div className="grid grid-cols-3 col-span-6 row-span-1 gap-3"></div>
        </div>
        <div className="grid grid-cols-12 gap-4 h-5">
          <Button
            type={"button"}
            label={"Reset"}
            padding={"px-4 py-2"}
            bgColor={"bg-[#ADB5BD33]"}
            textColor={"text-[#ADB5BD]"}
            hoverBgColor={"hover:bg-[gray]"}
            hoverTextColor={"hover:text-placeholder-color"}
            classes={"dark:hover:border-[gray] col-start-11"}
            onClick={reset}
          />
          <Button
            type={"button"}
            label={"Apply"}
            padding={"px-6 py-2"}
            bgColor={"bg-[#DF8D6233]"}
            textColor={"text-primary-color"}
            hoverBgColor={"hover:bg-primary-color"}
            hoverTextColor={"hover:text-placeholder-color"}
            classes={"dark:hover:border-primary-color col-start-12"}
            onClick={() => setFilter({ ...filter, ...updated })}
          />
        </div>
      </div>
    </div>
  );
};
export default FilterCountries;
