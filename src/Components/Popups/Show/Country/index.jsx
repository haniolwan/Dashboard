import Form from "../../Insert/Form";
import { Checkbox, UploadImage } from "../../../common";
import { useEffect, useState } from "react";

const ShowCountry = ({ show, setShow, selectedRow }) => {
  const [country, setCountry] = useState([]);
  useEffect(() => {
    if (selectedRow) {
      setCountry(selectedRow);
    }
  }, [selectedRow]);

  return (
    <Form show={show} setShow={setShow}>
      <Form.Container>
        <Form.Content title={"Page Info"}>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-12 gap-5 w-[20rem]">
              <div className="flex justify-center">
                <UploadImage
                  className="col-span-6 justify-center"
                  disabled
                  avatar
                  src={country?.flag}
                />
              </div>
              <div className="text-placeholder-color text-center col-span-1 sm:col-span-6 pt-2">
                {country?.name}
              </div>
              <Form.Row className="cols-span-6">
                <div className="col-span-1 sm:col-span-6 space-y-2 pt-5">
                  <div className="flex justify-between text-placeholder-color">
                    <span>Code</span>
                    <span>{country.code}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Currency</span>
                    <span className="text-end">{country?.Currency?.name}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Locale</span>
                    <span className="text-end">{country?.Locale?.name}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Active</span>
                    <Checkbox
                      name={"is_active"}
                      defaultChecked={country?.is_active}
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
export default ShowCountry;
