import { useCallback, useEffect, useState } from "react";
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
    if (selectedRow && show) {
      setLocale(selectedRow);
    }
  }, [selectedRow, show]);

  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content>
          <Form.Row className="grid grid-cols-3 gap-5">
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                key={locale?.name}
                name={"name"}
                label={"Name"}
                defaultValue={locale?.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                key={locale?.locale_code}
                name={"locale"}
                label={"Code"}
                defaultValue={locale?.locale_code}
                onChange={handleInputChange}
              />
            </div>
          </Form.Row>
          <Form.Row>
            <div className="col-span-3 sm:col-span-1">
              <Checkbox
                name={"is_active"}
                beforeLabel={"Is Active"}
                defaultChecked={locale?.is_active}
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
