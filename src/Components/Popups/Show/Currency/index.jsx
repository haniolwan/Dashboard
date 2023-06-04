import { useEffect, useRef, useState } from "react";
import { Checkbox, TextInput } from "../../../common";
import Form from "../../Insert/Form";

const ShowCurrency = ({ show, setShow, selectedRow }) => {
  const [currency, setCurrency] = useState([]);
  useEffect(() => {
    if (selectedRow) {
      setCurrency(selectedRow);
    }
  }, [selectedRow]);
  return (
    <Form show={show} setShow={setShow}>
      <Form.Container>
        <Form.Content title={"Currency Info"}>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-12 gap-5 w-[20rem]">
              <div className="text-placeholder-color text-center col-span-1 sm:col-span-6 pt-2">
                {currency?.name}
              </div>
              <Form.Row className="cols-span-6">
                <div className="col-span-1 sm:col-span-6 space-y-2 pt-5">
                  <div className="flex justify-between text-placeholder-color">
                    <span>Code</span>
                    <span>{currency.code}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Symbol</span>
                    <span>{currency.symbol}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Active</span>
                    <Checkbox
                      name={"is_active"}
                      defaultChecked={currency?.is_active}
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
export default ShowCurrency;
