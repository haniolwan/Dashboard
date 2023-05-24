import { useCallback, useEffect, useRef, useState } from "react";
import { query } from "../../../../utils";
import { SelectCurrency, SelectLocale } from "../../../../classes";
import { insertNewRow, updateNewRow } from "../../../common/Table/methods";
import Form from "../Form";
import { Checkbox, SelectInput, TextInput, UploadImage } from "../../../common";

const AddCountry = ({
  countryId,
  selectedRow,
  show,
  setShow,
  updated,
  setUpdated,
  handleInputChange,
  setRefreshRows,
}) => {
  const [country, setCountry] = useState([]);

  const [currencySearch] = useState("");
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const [localeSearch, setLocaleSearch] = useState("");
  const [localeOptions, setLocaleOptions] = useState([]);

  const [loadingCurrency, setLoadingCurrency] = useState(true);
  const [loadingLocale, setLoadingLocale] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: {
            data: { Currencies },
          },
        } = await query(`/api/dashboard/lists/currencies?q=${currencySearch}`);
        const currenciesArr = Currencies.map((currency) => {
          return new SelectCurrency(currency);
        });
        setCurrencyOptions(currenciesArr);
        setLoadingCurrency(false);
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
  }, [countryId, currencySearch, show]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: {
            data: { Locales },
          },
        } = await query(
          `/api/dashboard/lists/locales?${localeSearch && "q=" + localeSearch}`
        );
        const localesArr = Locales.map((locale) => {
          return new SelectLocale(locale);
        });
        setLocaleOptions(localesArr);
        setLoadingLocale(false);
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
  }, [
    currencySearch,
    country.Currency,
    localeSearch,
    updated.country_id,
    countryId,
    show,
  ]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (countryId) {
        updateNewRow(updated, "countries", countryId);
      } else {
        insertNewRow(updated, "countries");
      }
      setShow(false);
      setRefreshRows(true);
    },
    [countryId, setShow, updated, setRefreshRows]
  );

  useEffect(() => {
    if (selectedRow) {
      setCountry(selectedRow);
    }
  }, [selectedRow]);

  useEffect(() => {
    setCountry([]);
  }, [show]);

  const nameRef = useRef();
  const codeRef = useRef();
  const flagRef = useRef();
  const activeRef = useRef();
  const currenciesRef = useRef();
  const localeRef = useRef();

  useEffect(() => {
    if (!show) {
      nameRef.current.value = "";
      codeRef.current.value = "";
      flagRef.current.value = "";
      currenciesRef.current.select.setValue({});
      localeRef.current.select.setValue({});
      activeRef.current.checked = false;
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
                key={country.name}
                name={"name"}
                label={"Name"}
                defaultValue={country.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                ref={codeRef}
                key={country.code}
                name={"code"}
                label={"Code"}
                defaultValue={country.code}
                onChange={handleInputChange}
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-2 gap-5">
            <SelectInput
              key={country?.Currency?.name}
              ref={currenciesRef}
              name={"Currency"}
              label={"Currency"}
              options={currencyOptions}
              onChange={(currency) => {
                setUpdated({
                  ...updated,
                  currency_id: currency.id,
                });
              }}
              defaultValue={
                country?.Currency && new SelectCurrency(country?.Currency)
              }
              isLoading={loadingCurrency}
            />
            <SelectInput
              key={country?.Locale?.name}
              ref={localeRef}
              name={"Locale"}
              label={"Locale"}
              options={localeOptions}
              onChange={(locale) => {
                setUpdated({
                  ...updated,
                  locale_id: locale.id,
                });
              }}
              defaultValue={
                country?.Locale && new SelectLocale(country?.Locale)
              }
              // isLoading={loadingLocale}
            />
          </Form.Row>
          <Form.Row className="grid grid-cols-2">
            <UploadImage
              ref={flagRef}
              id={"flag"}
              label={"Photo"}
              name={"flag"}
              onChange={handleInputChange}
            />
          </Form.Row>
          <Form.Row className="grid grid-cols-2">
            <div className="grid grid-cols-2">
              <Checkbox
                ref={activeRef}
                name={"is_active"}
                beforeLabel={"Is Active"}
                defaultChecked={country.is_active}
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
export default AddCountry;
