import Form from "../../Insert/Form";
import { Checkbox } from "../../../common";
import { useEffect, useState } from "react";

const Showlocale = ({ show, setShow, selectedRow }) => {
  const [locale, setLocale] = useState([]);

  useEffect(() => {
    if (selectedRow) {
      setLocale(selectedRow);
    }
  }, [selectedRow]);

  return (
    <Form show={show} setShow={setShow}>
      <Form.Container>
        <Form.Content title={"Locale Info"}>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-12 gap-5 w-[20rem]">
              <div className="text-placeholder-color text-center col-span-1 sm:col-span-6 pt-2">
                {locale?.name}
              </div>
              <Form.Row className="cols-span-6">
                <div className="col-span-1 sm:col-span-6 space-y-2 pt-5">
                  <div className="flex justify-between text-placeholder-color">
                    <span>Code</span>
                    <span>{locale.locale_code}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Active</span>
                    <Checkbox
                      name={"is_active"}
                      defaultChecked={locale?.is_active}
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
export default Showlocale;
