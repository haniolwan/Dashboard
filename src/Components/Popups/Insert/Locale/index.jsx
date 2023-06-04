import { useCallback, useEffect, useRef, useState } from "react";
import Form from "../Form";
import { insertNewRow, updateNewRow } from "../../../common/Table/methods";
import { Checkbox, TextInput } from "../../../common";

const AddLocale = ({
  localeId,
  selectedRow,
  show,
  setShow,
  updated,
  setUpdated,
  handleInputChange,
  setRefreshRows,
}) => {
  const [locale, setLocale] = useState([]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (localeId) {
        updateNewRow(updated, "locales", localeId);
      } else {
        insertNewRow(updated, "locales");
      }
      setShow(false);
      setRefreshRows(true);
    },
    [localeId, setShow, updated, setRefreshRows]
  );
  useEffect(() => {
    if (selectedRow) {
      setLocale(selectedRow);
    }
  }, [selectedRow, show]);

  const nameRef = useRef();
  const codeRef = useRef();
  const activeRef = useRef();

  useEffect(() => {
    if (!show) {
      setUpdated([]);
      setLocale([]);
    }
  }, [setUpdated, show]);

  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content>
          <Form.Row className="grid grid-cols-2 gap-5">
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                ref={nameRef}
                key={locale?.name}
                name={"name"}
                label={"Name"}
                defaultValue={locale?.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                ref={codeRef}
                key={locale?.locale_code}
                name={"locale_code"}
                label={"Code"}
                defaultValue={locale?.locale_code}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <Checkbox
                ref={activeRef}
                name={"is_active"}
                beforeLabel={"Is Active"}
                defaultChecked={locale?.is_active}
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

export default AddLocale;
