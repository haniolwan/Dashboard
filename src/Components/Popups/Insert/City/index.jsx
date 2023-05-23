import { useCallback, useEffect, useRef, useState } from "react";
import { Checkbox, SelectInput, TextInput } from "../../../common";
import Form from "../Form";
import { insertNewRow, updateNewRow } from "../../../common/Table/methods";
import { SelectCountry } from "../../../../classes";
import { query } from "../../../../utils";

const AddCity = ({
  cityId,
  selectedRow,
  show,
  setShow,
  updated,
  setUpdated,
  handleInputChange,
  setRefreshRows,
}) => {
  const [city, setCity] = useState([]);
  // const [countryOptions, setCountryOptions] = useState([]);
  // const [countrySearch, setCountrySearch] = useState("");
  // const [loadingCountry, setLoadingCountry] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const {
  //         data: {
  //           data: { Countries },
  //         },
  //       } = await query(`/api/dashboard/lists/countries?q=${countrySearch}`);
  //       const countriesArr = Countries.map((country) => {
  //         return new SelectCountry(country);
  //       });
  //       setCountryOptions(countriesArr);
  //       setLoadingCountry(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   let timer = setTimeout(() => {
  //     if (show && cityId) {
  //       fetchData();
  //     }
  //   }, 300);
  //   return () => clearTimeout(timer);
  // }, [cityId, countrySearch, show]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (cityId) {
        updateNewRow(updated, "cities", cityId);
      } else {
        insertNewRow(updated, "cities");
      }
      setShow(false);
      setRefreshRows(true);
    },
    [cityId, setShow, setRefreshRows, updated]
  );

  useEffect(() => {
    if (selectedRow) {
      setCity(selectedRow);
    }
  }, [selectedRow]);

  useEffect(() => {
    if (!show) {
      setUpdated([]);
    }
  }, [setUpdated, show]);

  const nameRef = useRef();
  const activeRef = useRef();
  const countryRef = useRef();

  useEffect(() => {
    if (!show) {
      nameRef.current.value = "";
      activeRef.current.checked = false;
      // countryRef.current.select.setValue({});
    }
  }, [show]);

  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content>
          <Form.Row className="grid grid-cols-2 gap-5">
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                ref={nameRef}
                key={city.name}
                name={"name"}
                label={"City Name"}
                placeholder={"Name"}
                defaultValue={city.name}
                onChange={handleInputChange}
              />
            </div>
            {/* <SelectInput
              key={city.country_id}
              ref={countryRef}
              name={"Country"}
              label={"Country"}
              options={countryOptions}
              onChange={(country) => {
                setUpdated({
                  ...updated,
                  country_id: country.id,
                });
              }}
            /> */}
          </Form.Row>
          <Form.Row>
            <div className="grid grid-cols-2">
              <Checkbox
                ref={activeRef}
                name={"is_active"}
                beforeLabel={"Is Active"}
                defaultChecked={city.is_active}
                onChange={handleInputChange}
              />
            </div>
          </Form.Row>
        </Form.Content>
        <Form.Footer />
      </Form.Container>
    </Form>
  );
};
export default AddCity;
