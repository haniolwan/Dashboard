import { useCallback, useEffect, useRef, useState } from "react";
import { Checkbox, SelectInput, TextInput } from "../../../common";
import Form from "../Form";
import { insertNewRow, updateNewRow } from "../../../common/Table/methods";
import { SelectCountry } from "../../../../classes";
import { query } from "../../../../utils";
import { toast } from "react-toastify";

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
  const [countryOptions, setCountryOptions] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");
  const [loadingCountry, setLoadingCountry] = useState(true);

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
      if (show) {
        // fetchData();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [cityId, countrySearch, show]);

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

  const nameRef = useRef();
  const countryRef = useRef();
  const activeRef = useRef();

  useEffect(() => {
    if (!show) {
      setUpdated([]);
      setCity([]);
    }
  }, [setUpdated, show]);

  return (
    <Form show={show} setShow={setShow} onSubmit={() => {}}>
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
            <div className="col-span-3 sm:col-span-1">
              <SelectInput
                key={city?.country_id}
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
                defaultValue={city.Country && new SelectCountry(city.Country)}
              />
            </div>
          </Form.Row>
          <Form.Row>
            <div className="grid grid-cols-2">
              <Checkbox
                ref={activeRef}
                name={"is_active"}
                beforeLabel={"Is Active"}
                defaultChecked={city?.is_active}
                checked={updated.is_active}
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
