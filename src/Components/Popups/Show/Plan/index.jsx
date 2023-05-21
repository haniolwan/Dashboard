import { Checkbox, SelectInput, TextInput } from "../../../common";
import Form from "../../Insert/Form";

const ShowPlan = ({ show, setShow, selectedRow }) => {
  return (
    <Form show={show} setShow={setShow}>
      <Form.Container>
        <Form.Content title={"Show Plans"}>
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
                type="number"
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
                type="number"
                key={selectedRow.price}
                name={"price"}
                label={"Price"}
                defaultValue={selectedRow.price}
                disabled
              />
            </div>
            <div className="col-span-3 sm:col-span-6">
              <TextInput
                type="number"
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
                type="number"
                key={selectedRow.orders_count}
                name={"orders_count"}
                label={"Orders count"}
                defaultValue={selectedRow.orders_count}
                disabled
              />
            </div>
            <div className="col-span-3 sm:col-span-6">
              <SelectInput
                name={"features"}
                label={"Features"}
                options={selectedRow?.features?.map((item, i) => ({
                  label: item,
                  value: item,
                }))}
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="grid grid-cols-3 col-span-6 row-span-1 gap-3">
              <Checkbox
                name={"is_active"}
                afterLabel={"Is active"}
                defaultChecked={selectedRow.is_active}
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
export default ShowPlan;
