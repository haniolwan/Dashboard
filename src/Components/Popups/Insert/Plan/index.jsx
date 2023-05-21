import { useCallback, useEffect, useRef, useState } from "react";
import Form from "../Form";
import { Checkbox, TextInput } from "../../../common";
import { insertNewRow, updateNewRow } from "../../../common/Table/methods";

const AddPlan = ({
  planId,
  selectedRow,
  show,
  setShow,
  updated,
  setUpdated,
  handleInputChange,
  setRefreshRows,
}) => {
  const [plan, setPlan] = useState([]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (planId) {
        updateNewRow(updated, "plans", planId);
      } else {
        insertNewRow(updated, "plans");
      }
      setShow(false);
      setRefreshRows(true);
      event.target.reset();
    },
    [planId, setShow, setRefreshRows, updated]
  );

  useEffect(() => {
    if (selectedRow) {
      setPlan(selectedRow);
    }
  }, [selectedRow]);

  useEffect(() => {
    setPlan([]);
    setUpdated([]);
  }, [show, setUpdated]);

  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content>
          <Form.Row className="grid grid-cols-2 gap-5">
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                key={plan.name}
                name={"name"}
                label={"Name"}
                placeholder="Name"
                defaultValue={plan.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                key={plan.name}
                name={"billing_days"}
                label={"Billing days"}
                placeholder="Billing days"
                defaultValue={plan.billing_days}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-4">
              <TextInput
                key={plan.features}
                name={"features"}
                label={"Features"}
                placeholder="Features"
                defaultValue={plan.features}
                onChange={handleInputChange}
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-3 content-center gap-5">
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                key={plan.price}
                name={"price"}
                label={"Price"}
                placeholder="Price"
                defaultValue={plan.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                key={plan.price}
                name={"order_price"}
                label={"Order price"}
                placeholder="Order price"
                defaultValue={plan.order_price}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                key={plan.orders_count}
                name={"orders_count"}
                label={"Orders count"}
                placeholder="Orders count"
                defaultValue={plan.orders_count}
                onChange={handleInputChange}
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-2 gap-5" />
          <Form.Row className="grid grid-cols-4 gap-5">
            <div className="grid grid-cols-2">
              <Checkbox
                name={"is_active"}
                beforeLabel={"Is Active"}
                defaultChecked={plan.is_active}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2">
              <Checkbox
                name={"type"}
                beforeLabel={"Type"}
                defaultChecked={plan.is_active}
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
export default AddPlan;
