import { useEffect, useState } from "react";
import Form from "../../Insert/Form";
import { Checkbox, UploadImage } from "../../../common";

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
        <Form.Content title={"Service Info"}>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-12 gap-5 w-[20rem]">
              <UploadImage
                className="col-span-6 justify-center"
                disabled
                avatar
                src={service?.image}
              />
              <div className="text-placeholder-color text-center col-span-1 sm:col-span-6 pt-2">
                {service?.name}
              </div>
              <div className="text-placeholder-color text-center col-span-1 sm:col-span-6 pt-2">
                {service?.description}
              </div>
              <Form.Row className="cols-span-6">
                <div className="col-span-1 sm:col-span-6 space-y-2 pt-5">
                  <div className="flex justify-between text-placeholder-color">
                    <span>Orders</span>
                    <span>{service.orders}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Workers</span>
                    <span>{service.workers}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Active</span>
                    <Checkbox
                      name={"is_active"}
                      defaultChecked={service?.is_active}
                      disabled
                    />
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
export default ShowService;
