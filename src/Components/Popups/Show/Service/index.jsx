import { useRef } from "react";
import { Checkbox, TextArea, TextInput } from "../../../common";
import Form from "../../Insert/Form";

const ShowService = ({ show, setShow, selectedRow }) => {
  const modalRef = useRef();
  return (
    <Form show={show} setShow={setShow}>
      <Form.Container ref={modalRef}>
        <Form.Content title={"Show Service"}>
          <Form.Row className="grid grid-cols-10 gap-5">
            <img
              id="myImg"
              className="w-[5rem] h-[4rem] rounded-[5px]"
              src={selectedRow.image}
              alt="Table Img"
            />
            <div className="col-span-3 sm:col-span-4">
              <TextInput
                key={selectedRow.name}
                name={"name"}
                label={"Name"}
                defaultValue={selectedRow.name}
                disabled
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-1 gap-5">
            <div className="col-span-3 sm:col-span-4">
              <TextArea
                key={selectedRow.description}
                name={"description"}
                label={"Description"}
                defaultValue={selectedRow.description}
                disabled
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-8 gap-5">
            <div className="col-span-3 sm:col-span-4">
              <TextInput
                key={selectedRow.orders}
                name={"orders"}
                label={"Orders"}
                defaultValue={selectedRow.orders}
                disabled
              />
            </div>
            <div className="col-span-3 sm:col-span-4">
              <TextInput
                key={selectedRow.workers}
                name={"workers"}
                label={"Workers"}
                defaultValue={selectedRow.workers}
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
export default ShowService;
