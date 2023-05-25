import { useCallback, useEffect, useRef, useState } from "react";
import Form from "../Form";
import { query } from "../../../../utils";
import { SelectCity, SelectCountry } from "../../../../classes";
import { Checkbox, SelectInput, TextInput, UploadImage } from "../../../common";
import { insertNewRow, updateNewRow } from "../../../common/Table/methods";

const AddUser = ({
  userId,
  selectedRow,
  show,
  setShow,
  updated,
  setUpdated,
  handleInputChange,
  setRefreshRows,
}) => {
  const [user, setUser] = useState([]);

  const [countrySearch, setCountrySearch] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [loadingCountry, setLoadingCountry] = useState(true);

  const [citySearch, setCitySearch] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [loadingCity, setLoadingCity] = useState(true);

  const countriesRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: {
            data: { Countries },
          },
        } = await query(`/api/dashboard/lists/countries?q=${countrySearch}`);
        const countriesArr = Countries.map((country) => {
          return new SelectCity(country);
        });
        setCountryOptions(countriesArr);
        setLoadingCountry(false);
      } catch (error) {
        console.log(error);
      }
    };
    let timer = setTimeout(() => {
      if (show) {
        fetchData();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [countrySearch, show]);

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
        setLoadingCity(false);
      } catch (error) {
        console.log(error);
      }
    };
    let timer = setTimeout(() => {
      if (show) {
        fetchData();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [countrySearch, user.Country, citySearch, updated.country_id, show]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (userId) {
        updateNewRow(updated, "users", userId);
      } else {
        insertNewRow(updated, "users");
      }
      setShow(false);
      setRefreshRows(true);
    },
    [userId, setShow, setRefreshRows, updated]
  );

  useEffect(() => {
    if (selectedRow.user) {
      setUser(selectedRow.user);
    }
  }, [selectedRow]);

  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content>
          <Form.Row className="grid grid-cols-3 gap-5">
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                key={user.name}
                name={"name"}
                label={"Name"}
                defaultValue={user.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                key={user.mobile}
                name={"mobile"}
                label={"Mobile"}
                defaultValue={user.mobile}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                key={user.email}
                name={"email"}
                label={"Email"}
                defaultValue={user.email}
                onChange={handleInputChange}
              />
            </div>
          </Form.Row>
          <Form.Row>
            <div className="grid grid-cols-2 gap-5">
              <SelectInput
                key={user.Country}
                ref={countriesRef}
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
                isLoading={loadingCountry}
              />
              <SelectInput
                name={"City"}
                label={"City"}
                options={cityOptions}
                onChange={(city) => {
                  setCitySearch(city.name);
                  setUpdated({
                    ...updated,
                    city_id: city.id,
                  });
                }}
                defaultValue={user?.City && new SelectCity(user?.City)}
                isLoading={loadingCity}
              />
            </div>
          </Form.Row>
          <Form.Row>
            <div className="grid grid-cols-2">
              <UploadImage
                id={"user_avatar"}
                label={"Photo"}
                name={"avatar"}
                onChange={handleInputChange}
              />
              <div className="grid grid-cols-2">
                <Checkbox
                  name={"is_suspended"}
                  beforeLabel={"Is Suspended"}
                  defaultChecked={user.is_suspended}
                  onChange={handleInputChange}
                />
                <Checkbox
                  name={"is_banned"}
                  beforeLabel={"Is Banned"}
                  defaultChecked={user.is_banned}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Form.Row>
        </Form.Content>
        <Form.Footer />
      </Form.Container>
    </Form>
  );
};
export default AddUser;
