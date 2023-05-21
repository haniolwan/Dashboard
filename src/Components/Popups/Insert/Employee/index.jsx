import { useCallback, useEffect, useRef, useState } from "react";
import { query } from "../../../../utils";
import { Checkbox, SelectInput, TextInput, UploadImage } from "../../../common";
import { Employee, SelectCity, SelectCountry } from "../../../../classes";
import Form from "../Form";
import { insertNewRow, updateNewRow } from "../../../common/Table/methods";

const AddEmployee = ({
  employeeId,
  selectedRow,
  show,
  setShow,
  updated,
  setUpdated,
  handleInputChange,
  setRefreshRows,
}) => {
  const [user, setUser] = useState({});

  const [countrySearch] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);

  const [citySearch, setCitySearch] = useState("");
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await query(`/api/dashboard/employees/${employeeId}`, "get");
        setUser(new Employee(data.Employee));
      } catch (error) {
        console.log(error);
      }
    };
    if (employeeId && show) {
      fetchData();
    }
  }, [employeeId, show]);

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
          return new SelectCountry(country);
        });
        setCountryOptions(countriesArr);
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
  }, [show, countrySearch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: {
            data: { Cities },
          },
        } = await query(
          `/api/dashboard/lists/cities?q=${citySearch}&country_id=${
            updated.country_id || user.country_id
          }`
        );
        const cityArr = Cities.map((city) => {
          return new SelectCity(city);
        });
        setCityOptions(cityArr);
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
  }, [show, countrySearch, user, user.Country, citySearch, updated.country_id]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (employeeId) {
        updateNewRow(updated, "employees", employeeId);
      } else {
        insertNewRow(updated, "employees");
      }
      setShow(false);
      setRefreshRows(true);
    },
    [employeeId, setShow, updated, setRefreshRows]
  );

  useEffect(() => {
    if (selectedRow) {
      setUser(selectedRow);
    }
  }, [selectedRow]);

  useEffect(() => {
    setUser([]);
    setUpdated([]);
  }, [show, setUpdated]);

  const cityRef = useRef();
  // useEffect(() => {
  //   if (updated.country_id) {
  //     if (updated.country_id !== user.country_id) {
  //       // console.log(cityRef?.current?.select?.clearValue);
  //       console.log(cityRef.current.props.value);
  //     }
  //   }
  // }, [updated.country_id, user.country_id]);

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
              />
              <SelectInput
                id={"city_input"}
                key={user.City}
                ref={cityRef}
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
                defaultValue={
                  (user?.City && new SelectCity(user?.City)) ||
                  (updated?.City?.country_id && new SelectCity(updated?.City))
                }
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

export default AddEmployee;
