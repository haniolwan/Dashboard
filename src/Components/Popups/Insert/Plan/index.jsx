import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Form from "../Form";
import { Checkbox, SelectInput, TextInput } from "../../../common";
import { insertNewRow, updateNewRow } from "../../../common/Table/methods";
import { EnumsContext } from "../../../../context";

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

  const {
    enums: { PlanType },
  } = useContext(EnumsContext);
  const [typeOptions, setTypeOptions] = useState([]);
  const [defaultTypeOption, setDefaultTypeOption] = useState([]);
  const [loadingType, setLoadingType] = useState(true);

  useEffect(() => {
    if (show) {
      const options = Object.keys(PlanType).map((type) => {
        if (plan.type === PlanType[type])
          setDefaultTypeOption({ label: type, value: PlanType[type] });
        return { label: type, value: PlanType[type] };
      });
      setTypeOptions(options);
      setLoadingType(false);
    }
  }, [show, PlanType, plan.type]);

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
    },
    [planId, setShow, setRefreshRows, updated]
  );

  useEffect(() => {
    if (selectedRow) {
      setPlan(selectedRow);
    }
  }, [selectedRow]);

  const nameRef = useRef();
  const billingRef = useRef();
  const featuresRef = useRef();
  const priceRef = useRef();
  const orderRef = useRef();
  const countRef = useRef();
  const activeRef = useRef();
  const typeRef = useRef();

  useEffect(() => {
    if (!show) {
      nameRef.current.value = "";
      billingRef.current.value = "";
      featuresRef.current.value = "";
      priceRef.current.value = "";
      orderRef.current.value = "";
      countRef.current.value = "";
      activeRef.current.checked = false;
      typeRef.current.select.setValue({});
    }
  }, [show]);
  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content>
          <Form.Row className="grid grid-cols-2 gap-5">
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                ref={nameRef}
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
                ref={billingRef}
                key={plan.billing_days}
                name={"billing_days"}
                label={"Billing days"}
                placeholder="Billing days"
                defaultValue={plan.billing_days}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-4">
              <TextInput
                ref={featuresRef}
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
                ref={priceRef}
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
                ref={orderRef}
                key={plan.order_price}
                name={"order_price"}
                label={"Order price"}
                placeholder="Order price"
                defaultValue={plan.order_price}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                ref={countRef}
                key={plan.orders_count}
                name={"orders_count"}
                label={"Orders count"}
                placeholder="Orders count"
                defaultValue={plan.orders_count}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2">
              <SelectInput
                ref={typeRef}
                key={plan?.type}
                name={"type"}
                label={"Type"}
                options={typeOptions}
                onChange={(type) => {
                  setUpdated({
                    ...updated,
                    type: type.value,
                  });
                }}
                defaultValue={defaultTypeOption}
                isLoading={loadingType}
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-2 gap-5" />
          <Form.Row className="grid grid-cols-4 gap-5">
            <div className="grid grid-cols-2">
              <Checkbox
                ref={activeRef}
                name={"is_active"}
                beforeLabel={"Is Active"}
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
