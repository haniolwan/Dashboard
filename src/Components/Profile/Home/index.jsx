import { useContext, useEffect, useState } from "react";
import {
  TextInput,
  TextArea,
  Checkbox,
  Button,
  UploadImage,
  SelectInput,
} from "./../../common";
import { query } from "./../../../utils/query";
import { toast } from "react-toastify";
import { UserInfoContext } from "../../../context";
import { SelectCity, SelectCountry, SelectLocale } from "../../../classes";
import Swal from "sweetalert2";
const Home = ({ user, setUser }) => {
  const [updated, setUpdated] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [localeOptions, setLocaleOptions] = useState([]);

  const [countrySearch, setCountrySearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [localeSearch, setLocaleSearch] = useState("");

  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  const onSubmit = async () => {
    try {
      const form = new FormData();
      form.append("_method", "put");
      for (const name in updated) {
        form.append(name, updated[name]);
      }
      await query(
        `/api/dashboard/employees/${userInfo.id}`,
        "post",
        form,
        "multipart/form-data"
      );
      Swal.fire("Row updated successfully!", "", "success");
    } catch ({
      response: {
        data: { message },
      },
    }) {
      toast.error(<span>{message.join("\r\n")}</span>);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await query(`/api/dashboard/employees/${userInfo.id}`);
        setUser(data.Employee);
      } catch ({
        response: {
          data: { message },
        },
      }) {
        toast.error(<span>{message.join("\r\n")}</span>);
      }
    };

    fetchData();
  }, [userInfo.id]);

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
    const fetchData = async () => {
      try {
        const {
          data: {
            data: { Countries },
          },
        } = await query(
          `/api/dashboard/lists/countries?q=${countrySearch}&is_active=1`
        );
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
      fetchData();
    }, 300);
    return () => clearTimeout(timer);
  }, [countrySearch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: {
            data: { Cities },
          },
        } = await query(
          `/api/dashboard/lists/cities?q=${citySearch}&country_id=${user.country_id}&is_active=1`
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
      fetchData();
    }, 100);
    return () => clearTimeout(timer);
  }, [countrySearch, citySearch, user.country_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: {
            data: { Locales },
          },
        } = await query(
          `/api/dashboard/lists/locales?q=${localeSearch}&is_active=1`
        );
        const localesArr = Locales.map((locale) => {
          return new SelectLocale(locale);
        });
        setLocaleOptions(localesArr);
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
    }, 100);
    return () => clearTimeout(timer);
  }, [localeSearch]);

  console.log(user.Country);

  return (
    <div className="grid grid-cols-1">
      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1 ">
          <TextInput
            key={user.name}
            name={"name"}
            label={"Name"}
            placeholder={"Enter name"}
            defaultValue={user.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1 ">
          <TextInput
            key={user.email}
            name={"email"}
            label={"Email"}
            placeholder={"Enter email"}
            defaultValue={user.email}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-2 gap-5">
          <TextInput
            key={user.mobile}
            name={"mobile"}
            label={"Mobile"}
            placeholder={"Enter mobile"}
            defaultValue={user.mobile}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <SelectInput
          key={user?.Country && new SelectCountry(user?.Country)}
          name={"Country"}
          label={"Country"}
          options={countryOptions}
          onChange={(country) => {
            setUpdated({
              ...updated,
              country_id: country.id,
            });
          }}
          defaultValue={user?.Country && new SelectCountry(user?.Country)}
        />
        <SelectInput
          key={user?.City && new SelectCity(user?.City)}
          name={"City"}
          label={"City"}
          options={cityOptions}
          onChange={(city) => {
            setUpdated({
              ...updated,
              city_id: city.id,
            });
          }}
          defaultValue={user?.City && new SelectCity(user?.City)}
        />
      </div>
      <SelectInput
        key={user?.Locale && new SelectLocale(user?.Locale)}
        name={"Locale"}
        label={"Locale"}
        options={localeOptions}
        onChange={(locale) => {
          setUpdated({
            ...updated,
            locale_id: locale.value,
          });
        }}
        defaultValue={user?.Locale && new SelectLocale(user?.Locale)}
      />
      <div className="grid grid-cols-2 mt-5" />
      <div className="flex justify-end">
        <Button
          type={"submit"}
          label={"Apply"}
          padding={"px-5 py-3"}
          bgColor={"bg-[#DF8D6233]"}
          textColor={"text-primary-color"}
          hoverBgColor={"hover:bg-primary-color hover:border-primary-color"}
          hoverTextColor={"hover:text-white"}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};
export default Home;
