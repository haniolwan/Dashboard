import { useCallback, useEffect, useState } from "react";
import Form from "../../Insert/Form";
import { Button, TextArea, TextInput } from "../../../common";
import { updateTranslation } from "../../../common/Table/methods";

const TranslateService = ({
  serviceId,
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
  const [service, setService] = useState([]);

  useEffect(() => {
    if (selectedRow) {
      setService(selectedRow);
    }
  }, [selectedRow]);

  useEffect(() => {
    setService([]);
  }, [locale]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      updateTranslation("services", serviceId, locale, updated);
      setShow(false);
      setRefreshRows(true);
    },
    [locale, serviceId, setRefreshRows, setShow, updated]
  );

  useEffect(() => {
    if (show && serviceId) {
      setUpdated({
        ...selectedRow,
      });
    }
  }, [serviceId, selectedRow, setUpdated, show]);

  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content title={"Translate Service"}>
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
                      (id === service.locale_id || id === locale) &&
                      "bg-primary-color text-white"
                    }
                    onClick={changeLocale}
                  />
                </div>
              );
            })}
          </Form.Row>
          <Form.Row>
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                key={service.name}
                name={"name"}
                label={"Name"}
                defaultValue={service.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextArea
                key={service.description}
                name={"description"}
                label={"Description"}
                defaultValue={service.description}
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
export default TranslateService;
