import { useContext, useEffect, useState } from "react";
import Form from "../../Insert/Form";
import { Checkbox } from "../../../common";
import { EnumsContext } from "../../../../context";

const ShowPlan = ({ show, setShow, selectedRow }) => {
  const [plan, setPlan] = useState([]);
  useEffect(() => {
    if (selectedRow) {
      setPlan(selectedRow);
    }
  }, [selectedRow]);
  const {
    enums: { PlanType },
  } = useContext(EnumsContext);
  return (
    <Form show={show} setShow={setShow}>
      <Form.Container>
        <Form.Content title={"Plan Info"}>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-12 gap-5 w-[20rem]">
              <div className="text-placeholder-color text-center col-span-1 sm:col-span-6 pt-2">
                {plan?.name}
              </div>
              <Form.Row className="cols-span-6">
                <div className="col-span-1 sm:col-span-6 space-y-2 pt-5">
                  <div className="flex justify-between text-placeholder-color">
                    <span>Billing days</span>
                    <span>{plan.billing_days}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Price</span>
                    <span>{plan.price}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Order price</span>
                    <span>{plan.order_price}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Order count</span>
                    <span>{plan.orders_count}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Type</span>
                    <span>
                      {Object.keys(PlanType).find(
                        (key) => PlanType[key] === plan.type
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Active</span>
                    <Checkbox
                      name={"is_active"}
                      defaultChecked={plan?.is_active}
                      disabled
                    />
                  </div>
                </div>
              </Form.Row>
              <Form.Row>
                <div className="text-placeholder-color text-center col-span-1 sm:col-span-6 pt-2">
                  Features
                </div>
                <div className="grid grid-cols-3 justify-items-center text-placeholder-color rounded gap-5 mt-2">
                  {plan.features &&
                    plan.features.map((feature) => {
                      return (
                        <button
                          disabled
                          className="border bg-transparent text-sm
                        font-semibold p-1 border-placeholder-color rounded"
                        >
                          {feature}
                        </button>
                      );
                    })}
                </div>
              </Form.Row>
            </div>
          </Form.Row>
        </Form.Content>
        <Form.Footer disabled />
      </Form.Container>
    </Form>
  );
};
export default ShowPlan;
