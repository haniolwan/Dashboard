import { useEffect, useState } from "react";
import Form from "../../Insert/Form";
import { Checkbox } from "../../../common";

const ShowCity = ({ show, setShow, selectedRow }) => {
  const [city, setCity] = useState([]);

  useEffect(() => {
    if (selectedRow) {
      setCity(selectedRow);
    }
  }, [selectedRow]);

  return (
    <Form show={show} setShow={setShow}>
      <Form.Container>
        <Form.Content title={"City Info"}>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-12 gap-5 w-[20rem]">
              <div className="text-placeholder-color text-center col-span-1 sm:col-span-6 pt-2">
                {city?.name}
              </div>
              <Form.Row className="cols-span-6">
                <div className="col-span-1 sm:col-span-6 space-y-2 pt-5">
                  <div className="flex justify-between text-placeholder-color">
                    <span>Country</span>
                    <span>{city?.Country?.name}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Active</span>
                    <Checkbox
                      name={"is_active"}
                      defaultChecked={city?.is_active}
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
export default ShowCity;
