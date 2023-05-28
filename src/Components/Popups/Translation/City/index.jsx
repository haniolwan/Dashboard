import { useCallback, useEffect, useState } from "react";
import { Button, Checkbox, TextInput, UploadImage } from "../../../common";
import Form from "../../Insert/Form";
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
  const [city, setCity] = useState([]);
  const [showTranslate, setShowTranslate] = useState(true);

  useEffect(() => {
    if (selectedRow) {
      setCity(selectedRow);
    } else {
      setCity([]);
    }
  }, [selectedRow]);

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
    if (show && cityId) {
      setUpdated({
        ...selectedRow,
      });
    }
  }, [cityId, selectedRow, setUpdated, show]);

  return (
    <Form
      show={show}
      setShow={setShow}
      showTranslate={showTranslate}
      setShowTranslate={setShowTranslate}
      onSubmit={onSubmit}
    >
      <Form.Container>
        <Form.Content path={"city"} title={"City Translate"}>
          <Form.Row className="grid grid-cols-6 justify-items-center gap-5">
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
                    classes={id === locale && "bg-primary-color text-white"}
                    onClick={changeLocale}
                  />
                </div>
              );
            })}
          </Form.Row>
          {showTranslate ? (
            <Form.Row className="grid gap-5">
              <div className="col-span-12 gap-5 w-[20rem]">
                <div className="flex justify-between text-placeholder-color">
                  <span>Name</span>
                  <span>{city.name}</span>
                </div>
              </div>
            </Form.Row>
          ) : (
            <>
              <Form.Row className="grid grid-cols-1 gap-5">
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
            </>
          )}
        </Form.Content>
        <Form.Footer disabled={showTranslate} />
      </Form.Container>
    </Form>
  );
};
export default TranslateCity;
