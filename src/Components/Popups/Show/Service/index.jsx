import { useEffect, useState } from "react";
import { Checkbox, TextArea, TextInput } from "../../../common";
import Form from "../../Insert/Form";

const ShowService = ({ show, setShow, selectedRow }) => {
  const [service, setService] = useState([]);
  useEffect(() => {
    if (selectedRow) {
      setService(selectedRow);
    }
  }, [selectedRow]);

  return (
    <Form show={show} setShow={setShow}>
      <Form.Container>
        <Form.Content title={"Show Service"}>
          <Form.Row className="grid grid-cols-10 gap-5">
            <img
              id="myImg"
              className="w-[5rem] h-[4rem] rounded-[5px]"
              src={service?.image}
              alt="Table Img"
            />
            <div className="col-span-3 sm:col-span-4">
              <TextInput
                key={service?.name}
                name={"name"}
                label={"Name"}
                defaultValue={service.name}
                disabled
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-1 gap-5">
            <div className="col-span-3 sm:col-span-4">
              <TextArea
                key={service.description}
                name={"description"}
                label={"Description"}
                defaultValue={service.description}
                disabled
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-8 gap-5">
            <div className="col-span-3 sm:col-span-4">
              <TextInput
                key={service.orders}
                name={"orders"}
                label={"Orders"}
                defaultValue={service.orders}
                disabled
              />
            </div>
            <div className="col-span-3 sm:col-span-4">
              <TextInput
                key={service.workers}
                name={"workers"}
                label={"Workers"}
                defaultValue={service.workers}
                disabled
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="grid grid-cols-3 col-span-6 row-span-1 gap-3">
              <Checkbox
                name={"is_active"}
                afterLabel={"Is active"}
                defaultChecked={service.is_active}
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
