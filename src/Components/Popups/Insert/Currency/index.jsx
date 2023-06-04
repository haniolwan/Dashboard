import { useCallback, useEffect, useRef, useState } from "react";
import Form from "../Form";
import { Checkbox, TextInput } from "../../../common";
import { insertNewRow, updateNewRow } from "../../../common/Table/methods";

const AddCurrency = ({
  currencyId,
  selectedRow,
  show,
  setShow,
  updated,
  setUpdated,
  handleInputChange,
  setRefreshRows,
}) => {
  const [currency, setCurrency] = useState([]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (currencyId) {
        updateNewRow(updated, "currencies", currencyId);
      } else {
        insertNewRow(updated, "currencies");
      }
      setShow(false);
      setRefreshRows(true);
    },
    [currencyId, setShow, setRefreshRows, updated]
  );

  useEffect(() => {
    if (selectedRow) {
      setCurrency(selectedRow);
    }
  }, [selectedRow]);

  const nameRef = useRef();
  const codeRef = useRef();
  const symbolRef = useRef();
  const activeRef = useRef();

  useEffect(() => {
    if (!show) {
      setUpdated([]);
      setCurrency([]);
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
                key={currency.name}
                name={"name"}
                label={"Name"}
                defaultValue={currency.name}
                placeholder={"Name"}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                ref={codeRef}
                key={currency.code}
                name={"code"}
                label={"Code"}
                defaultValue={currency.code}
                placeholder={"Code"}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                ref={symbolRef}
                key={currency.symbol}
                name={"symbol"}
                label={"Symbol"}
                defaultValue={currency.symbol}
                placeholder={"Symbol"}
                onChange={handleInputChange}
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-2">
            <div>
              <Checkbox
                ref={activeRef}
                name={"is_active"}
                beforeLabel={"Is Active"}
                defaultChecked={currency?.is_active}
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
export default AddCurrency;
