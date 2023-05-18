import { useCallback, useEffect, useRef, useState } from "react";
import Form from "../../Insert/Form";
import { Button, TextInput } from "../../../common";
import { updateTranslation } from "../../../common/Table/methods";

const TranslateCity = ({
  cityId,
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
  const modalRef = useRef();
  const [city, setCity] = useState([]);

  useEffect(() => {
    if (selectedRow) {
      setCity(selectedRow);
    }
  }, [selectedRow]);

  useEffect(() => {
    setCity([]);
  }, [locale]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      updateTranslation("cities", cityId, locale, updated);
      setShow(false);
      setRefreshRows(true);
    },
    [cityId, locale, setRefreshRows, setShow, updated]
  );

  useEffect(() => {
    if (show) {
      setUpdated({
        ...selectedRow,
      });
    }
  }, [selectedRow, setUpdated, show]);

  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content title={"Translate City"}>
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
                      (id === city.locale_id || id === locale) &&
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
                key={city.name}
                name={"name"}
                label={"Name"}
                defaultValue={city.name}
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
export default TranslateCity;
