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

  const currenciesRef = useRef();

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
      if (countryId && show) {
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
          `/api/dashboard/lists/locales?q=${localeSearch}&currency_id=${updated.country_id}`
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
      if (countryId && show) {
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

  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content>
          <Form.Row className="grid grid-cols-2 gap-5">
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                key={country.name}
                name={"name"}
                label={"Name"}
                defaultValue={country.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextInput
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
              key={country.Currency}
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
              name={"Locale"}
              label={"Locale"}
              options={localeOptions}
              onChange={(locale) => {
                setLocaleSearch(locale.name);
                setUpdated({
                  ...updated,
                  locale_id: locale.id,
                });
              }}
              defaultValue={
                country?.Locale && new SelectLocale(country?.Locale)
              }
              isLoading={loadingLocale}
            />
          </Form.Row>
          <Form.Row className="grid grid-cols-2">
            <UploadImage
              id={"flag"}
              label={"Photo"}
              name={"flag"}
              onChange={handleInputChange}
            />
            <div className="grid grid-cols-2">
              <Checkbox
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
