import { useRef } from "react";
import { Checkbox, TextInput } from "../../../common";
import Form from "../../Insert/Form";

const ShowCurrency = ({ show, setShow, selectedRow }) => {
  const modalRef = useRef();
  return (
    <Form show={show} setShow={setShow}>
      <Form.Container ref={modalRef}>
        <Form.Content title={"Show Currency"}>
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
                key={selectedRow.code}
                name={"code"}
                label={"Code"}
                defaultValue={selectedRow.code}
                disabled
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-8 gap-5">
            <div className="col-span-3 sm:col-span-4">
              <TextInput
                key={selectedRow.symbol}
                name={"Symbol"}
                label={"symbol"}
                defaultValue={selectedRow.symbol}
                disabled
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
export default ShowCurrency;
