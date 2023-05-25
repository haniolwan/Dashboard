import { useEffect, useRef, useState } from "react";
import { SelectCity, SelectCountry } from "../../../../classes";
import { query } from "../../../../utils";
import { Button, Checkbox, SelectInput } from "../../../common";
import { toast } from "react-toastify";

const Filter = ({ show, filter, setFilter }) => {
  const [updated, setUpdated] = useState({});

  const [countriesOptions, setCountryOptions] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");

  const [citiesOptions, setCityOptions] = useState([]);
  const [citySearch, setCitySearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: {
            data: { Countries },
          },
        } = await query(`/api/dashboard/lists/countries?q=${countrySearch}`);
        const countriesArr = Countries.map((country) => {
          return new SelectCountry(country);
        });
        setCountryOptions(countriesArr);
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
  }, [show, countrySearch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: {
            data: { Cities },
          },
        } = await query(
          `/api/dashboard/lists/cities?q=${citySearch}&country_id=${updated.country_id}`
        );
        const cityArr = Cities.map((city) => {
          return new SelectCity(city);
        });
        setCityOptions(cityArr);
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
  }, [show, countrySearch, updated.country_id, citySearch]);

  const onChange = ({ target: { name, checked } }) => {
    setUpdated({ ...updated, [name]: checked === true ? 1 : 0 });
  };

  const countryRef = useRef(null);
  const cityRef = useRef(null);

  const bannedRef = useRef(null);
  const suspendedRef = useRef(null);

  const reset = () => {
    setUpdated({});
    setFilter({ is_suspended: 0, is_baned: 0, city_id: "", country_id: "" });
    countryRef.current.select.setValue({});
    cityRef.current.select.setValue({});
    bannedRef.current.checked = false;
    suspendedRef.current.checked = false;
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
              ref={countryRef}
              name={"Country"}
              label={"Country"}
              options={countriesOptions}
              onChange={(country) => {
                setUpdated({
                  ...updated,
                  country_id: country.id,
                });
              }}
            />
            <SelectInput
              ref={cityRef}
              name={"City"}
              label={"City"}
              options={citiesOptions}
              onChange={(city) => {
                setUpdated({
                  ...updated,
                  city_id: city.id,
                });
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-1 text-[16px] leading-[24px] font-[500]"></p>
          <div className="grid grid-cols-3 col-span-6 row-span-1 gap-3">
            <Checkbox
              ref={suspendedRef}
              name={"is_suspended"}
              afterLabel={"Is suspended"}
              onChange={onChange}
            />
            <Checkbox
              ref={bannedRef}
              name={"is_baned"}
              afterLabel={"Is baned"}
              onChange={onChange}
              value={updated.is_baned}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 h-5">
          <Button
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
export default Filter;
