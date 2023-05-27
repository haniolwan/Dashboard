import { useEffect, useState } from "react";
import Form from "../../Insert/Form";

const ShowSubscription = ({ show, setShow, selectedRow }) => {
  const [subscription, setSubscription] = useState([]);
  useEffect(() => {
    if (selectedRow) {
      setSubscription(selectedRow);
    }
  }, [selectedRow]);

  return (
    <Form show={show} setShow={setShow}>
      <Form.Container>
        <Form.Content title={"Page Info"}>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-12 gap-5 w-[20rem]">
              <div className="text-placeholder-color text-center col-span-1 sm:col-span-6 pt-2">
                {subscription?.name}
              </div>
              <Form.Row className="cols-span-6">
                <div className="col-span-1 sm:col-span-6 space-y-2 pt-5">
                  <div className="flex justify-between text-placeholder-color">
                    <span>Plan</span>
                    <span>{subscription?.Plan?.name}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Balance</span>
                    <span className="text-end">{subscription.balance}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Billing days</span>
                    <span className="text-end">
                      {subscription.billing_days}
                    </span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Price</span>
                    <span className="text-end">{subscription.price}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Orders count</span>
                    <span className="text-end">
                      {subscription.orders_count}
                    </span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Orders price</span>
                    <span className="text-end">{subscription.order_price}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Started at</span>
                    <span className="text-end">{subscription.started_at}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Expire at</span>
                    <span className="text-end">{subscription.expire_at}</span>
                  </div>
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
export default ShowSubscription;
