import { useCallback, useEffect, useState } from "react";
import Form from "../../Insert/Form";
import { Button, TextInput } from "../../../common";
import { updateTranslation } from "../../../common/Table/methods";

const TranslateCurrency = ({
  currencyId,
  show,
  setShow,
  selectedRow,
  updated,
  setUpdated,
  localeOptions,
  handleInputChange,
  setRefreshRows,
  locale,
  changeLocale,
}) => {
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    if (selectedRow) {
      setCurrency(selectedRow);
    }
  }, [selectedRow]);

  useEffect(() => {
    setCurrency([]);
  }, [locale]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      updateTranslation("currencies", currencyId, locale, updated);
      setShow(false);
      setRefreshRows(true);
    },
    [currencyId, locale, setRefreshRows, setShow, updated]
  );

  useEffect(() => {
    if (show && currencyId) {
      setUpdated({
        ...selectedRow,
      });
    }
  }, [currencyId, selectedRow, setUpdated, show]);

  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content title={"Translate Currency"}>
          <Form.Row className="grid grid-cols-12 gap-5">
            {localeOptions.map(({ id, name }) => {
              return (
                <div key={id} className="col-span-3">
                  <Button
                    type={"button"}
                    data={id}
                    label={name}
                    padding={"px-6 py-2"}
                    bgColor={"bg-[#DF8D6233]"}
                    textColor={"text-primary-color"}
                    hoverBgColor={
                      "hover:bg-primary-color hover:text-white dark:hover:text-white"
                    }
                    hoverTextColor={"text-placeholder-color"}
                    classes={
                      (id === currency.locale_id || id === locale) &&
                      "bg-primary-color text-white"
                    }
                    onClick={changeLocale}
                  />
                </div>
              );
            })}
          </Form.Row>
          <Form.Row className="grid grid-cols-2 gap-5">
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                key={currency.name}
                name={"name"}
                label={"Name"}
                defaultValue={currency.name}
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
export default TranslateCurrency;
