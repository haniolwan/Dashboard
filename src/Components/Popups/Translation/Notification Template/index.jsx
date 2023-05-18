import { useCallback, useEffect, useRef, useState } from "react";
import Form from "../../Insert/Form";
import { Button, TextArea, TextInput } from "../../../common";
import { updateTranslation } from "../../../common/Table/methods";

const TranslateNotificationTemplate = ({
  rowId,
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
  const [row, setRow] = useState([]);

  useEffect(() => {
    if (selectedRow) {
      setRow(selectedRow);
    }
  }, [selectedRow]);

  useEffect(() => {
    setRow([]);
  }, [locale]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      updateTranslation("notifications_templates", rowId, locale, updated);
      setShow(false);
      setRefreshRows(true);
    },
    [locale, rowId, setRefreshRows, setShow, updated]
  );

  useEffect(() => {
    setUpdated({
      ...selectedRow,
    });
  }, [selectedRow, setUpdated]);

  return (
    <Form show={show} setShow={setShow}>
      <Form.Container ref={modalRef} onSubmit={onSubmit}>
        <Form.Content title={"Translate Notifications Templates"}>
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
                      (id === row.locale_id || id === locale) &&
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
                key={row.title}
                name={"title"}
                label={"Title"}
                defaultValue={row.title}
                onChange={handleInputChange}
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-2 gap-5">
            <div className="col-span-3 sm:col-span-1">
              <TextArea
                key={row.message}
                name={"message"}
                label={"Message"}
                defaultValue={row.message}
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
export default TranslateNotificationTemplate;
