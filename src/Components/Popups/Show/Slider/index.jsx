import { useEffect, useState } from "react";
import Form from "../../Insert/Form";
import { Checkbox, UploadImage } from "../../../common";

const ShowSlider = ({ show, setShow, selectedRow }) => {
  const [slider, setSlider] = useState([]);
  useEffect(() => {
    if (selectedRow) {
      setSlider(selectedRow);
    }
  }, [selectedRow]);
  return (
    <Form show={show} setShow={setShow}>
      <Form.Container>
        <Form.Content title={"Slider Info"}>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-12 gap-5 w-[20rem]">
              <div className="flex justify-center">
                <UploadImage
                  className="col-span-6 justify-center"
                  disabled
                  avatar
                  src={slider?.image}
                />
              </div>
              <div className="text-placeholder-color text-center col-span-1 sm:col-span-6 pt-2">
                {slider?.name}
              </div>
              <Form.Row className="cols-span-6">
                <div className="col-span-1 sm:col-span-6 space-y-2 pt-5">
                  <div className="flex justify-between text-placeholder-color">
                    <span>Url</span>
                    <span>{slider.url}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Active</span>
                    <Checkbox
                      name={"is_active"}
                      defaultChecked={slider?.is_active}
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
export default ShowSlider;
