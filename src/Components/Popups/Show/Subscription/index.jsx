import { useRef } from "react";
import { TextInput } from "../../../common";
import Form from "../../Insert/Form";

const ShowSubscription = ({ show, setShow, selectedRow }) => {
  const modalRef = useRef();
  return (
    <Form show={show} setShow={setShow}>
      <Form.Container ref={modalRef}>
        <Form.Content title={"Show Subscription"}>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-3 sm:col-span-6">
              <TextInput
                key={selectedRow.name}
                name={"name"}
                label={"Name"}
                defaultValue={selectedRow.name}
                disabled
              />
            </div>
            <div className="col-span-3 sm:col-span-6">
              <TextInput
                key={selectedRow.billing_days}
                name={"billing_days"}
                label={"Billing days"}
                defaultValue={selectedRow.billing_days}
                disabled
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-3 sm:col-span-6">
              <TextInput
                key={selectedRow.price}
                name={"price"}
                label={"Price"}
                defaultValue={selectedRow.price}
                disabled
              />
            </div>
            <div className="col-span-3 sm:col-span-6">
              <TextInput
                key={selectedRow.orders_count}
                name={"orders_count"}
                label={"Orders count"}
                defaultValue={selectedRow.orders_count}
                disabled
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-3 sm:col-span-6">
              <TextInput
                key={selectedRow.balance}
                name={"balance"}
                label={"Balance"}
                defaultValue={selectedRow.balance}
                disabled
              />
            </div>
            <div className="col-span-3 sm:col-span-6">
              <TextInput
                key={selectedRow.order_price}
                name={"order_price"}
                label={"Order price"}
                defaultValue={selectedRow.order_price}
                disabled
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-3 sm:col-span-6">
              <TextInput
                key={selectedRow.started_at}
                name={"started_at"}
                label={"Started at"}
                defaultValue={selectedRow.started_at}
                disabled
              />
            </div>
            <div className="col-span-3 sm:col-span-6">
              <TextInput
                key={selectedRow.expire_at}
                name={"expire_at"}
                label={"Expire at"}
                defaultValue={selectedRow.expire_at}
                disabled
              />
            </div>
          </Form.Row>
        </Form.Content>
        <Form.Footer disabled />
      </Form.Container>
    </Form>
  );
};
export default ShowSubscription;
