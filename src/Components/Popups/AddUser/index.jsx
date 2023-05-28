import { useEffect, useRef, useState } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { query } from "../../../utils";
import { Button, Checkbox, SelectInput, TextInput } from "../../common";
import Employee from "../../../classes/Employee";
import { Country, SelectCountry } from "../../../classes/Country";
import City from "../../../classes/City";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AddUser = ({ show, setShow, id }) => {
  const modalRef = useRef();
  useOnClickOutside(modalRef, () => setShow(false));
  const [user, setUser] = useState([]);
  const [updated, setUpdated] = useState([]);

  const [countrySearch, setCountrySearch] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);

  const [citySearch, setCitySearch] = useState("");
  const [cityOptions, setCityOptions] = useState([]);

  const [avatarSrc, setAvatarScr] = useState("");
  const [loadingCountry, setLoadingCountry] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await query(`/api/dashboard/employees/${id}`, "get");
        setUser(new Employee(data.Employee));
      } catch ({
        response: {
          data: { message },
        },
      }) {
        toast.error(<span>{message.join("\r\n")}</span>);
      }
    };
    if (show) {
      fetchData();
    }
  }, [id, show]);

  const handleChange = ({ target: { type, name, value, checked, files } }) => {
    if (type === "file") {
      const avatar = URL.createObjectURL(files[0]);
      setUpdated({ ...updated, [name]: files[0] });
      setAvatarScr(avatar);
    } else if (type === "checkbox") {
      setUpdated({ ...updated, [name]: checked });
    } else {
      setUpdated({ ...updated, [name]: value });
    }
  };

  const uploadEmployee = async () => {
    try {
      const form = new FormData();
      form.append("_method", "put");
      for (const name in updated) {
        form.append(name, updated[name]);
      }
      await query(
        `/api/dashboard/employees/${id}`,
        "post",
        form,
        "multipart/form-data"
      );
      Swal.fire("User updated successfully!", "", "success");
      setShow(false);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      toast.error(<span>{message.join("\r\n")}</span>);
    }
  };

  const countriesRef = useRef();

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
          return new Country(country);
        });
        setCountryOptions(countriesArr);
        setLoadingCountry(false);
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
          `/api/dashboard/lists/cities?q=${citySearch}&country_id=${updated.country_id}&is_active=1`
        );
        const cityArr = Cities.map((city) => {
          return new City(city);
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
  }, [countrySearch, user.Country, citySearch, updated.country_id]);

  return (
    show && (
      <div
        ref={modalRef}
        className="fixed top-[50%] left-[50%] flex justify-center items-center z-50 p-6 overflow-x-hidden overflow-y-auto md:inset-0 bg-[#0000007F] rounded h-full"
      >
        <div className="mt-5 md:mt-0 md:col-span-2 w-[70%]">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="bg-white space-x-6 space-y-3 sm:p-6 dark:bg-gray-900 h-[30rem]">
              <div className="px-4 py-2">
                <h1 className="text-placeholder-color mt-1 text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </h1>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <div className="col-span-3 sm:col-span-1">
                  <TextInput
                    key={user.name}
                    name={"name"}
                    label={"Name"}
                    defaultValue={user.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-3 sm:col-span-1">
                  <TextInput
                    key={user.mobile}
                    name={"mobile"}
                    label={"Mobile"}
                    defaultValue={user.mobile}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-3 sm:col-span-1">
                  <TextInput
                    key={user.email}
                    name={"email"}
                    label={"Email"}
                    defaultValue={user.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <SelectInput
                  key={user.Country}
                  ref={countriesRef}
                  name={"Country"}
                  label={"Country"}
                  options={countryOptions}
                  defaultValue={
                    new SelectCountry({ label: "sss", value: "palestine" })
                  }
                  onChange={(country) => {
                    setUpdated({
                      ...updated,
                      country_id: country.id,
                    });
                  }}
                  isLoading={loadingCountry}
                />
                <SelectInput
                  name={"City"}
                  label={"City"}
                  // defaultValue={user.City}
                  options={cityOptions}
                  onChange={(city) => {
                    setCitySearch(city.name);
                    setUpdated({
                      ...updated,
                      city_id: city.id,
                    });
                  }}
                />
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Photo
                  </label>
                  <div className="flex items-center space-x-2 mt-1 rtl:gap-2">
                    <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      <img src={avatarSrc || user.avatar} alt="avatar img" />
                    </span>
                    <input
                      id="img"
                      className="dark:text-placeholder-color"
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <Checkbox
                    name={"is_suspended"}
                    beforeLabel={"Is Suspended"}
                    defaultChecked={user.is_suspended}
                    onChange={handleChange}
                  />
                  <Checkbox
                    name={"is_banned"}
                    beforeLabel={"Is Banned"}
                    defaultChecked={user.is_banned}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 px-4 py-3 bg-gray-50 text-right sm:px-6 dark:bg-gray-800 rtl:gap-2">
              <Button
                label={"Cancel"}
                padding={"px-4 py-2"}
                bgColor={"bg-[#ADB5BD33]"}
                textColor={"text-[#ADB5BD]"}
                hoverBgColor={"hover:bg-[gray]"}
                hoverTextColor={"text-placeholder-color"}
                onClick={() => setShow(false)}
              />
              <Button
                label={"Apply"}
                padding={"px-6 py-2"}
                bgColor={"bg-[#DF8D6233]"}
                textColor={"text-primary-color"}
                hoverBgColor={"hover:bg-primary-color"}
                hoverTextColor={"text-placeholder-color"}
                onClick={uploadEmployee}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default AddUser;
