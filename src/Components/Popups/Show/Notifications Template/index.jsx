import Form from "../../Insert/Form";
import { useContext, useEffect, useState } from "react";
import { EnumsContext } from "../../../../context";

const ShowNotificationsTemplate = ({ show, setShow, selectedRow }) => {
  const [row, setRow] = useState([]);

  const [defaultTypeOption, setDefaultTypeOption] = useState("");

  const {
    enums: { NotificationType },
  } = useContext(EnumsContext);
  useEffect(() => {
    if (selectedRow) {
      setRow(selectedRow);
    }
  }, [selectedRow]);

  useEffect(() => {
    if (show) {
      Object.keys(NotificationType).forEach((item) => {
        if (NotificationType[item] === row.type) {
          setDefaultTypeOption(item);
        }
      });
    }
  }, [NotificationType, row, show]);

  return (
    <Form show={show} setShow={setShow}>
      <Form.Container>
        <Form.Content title={"Service Notifications Templates"}>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-12 gap-5 w-[20rem]">
              <div className="text-placeholder-color text-center col-span-1 sm:col-span-6 pt-2">
                {row?.title}
              </div>
              <div className="text-placeholder-color text-center col-span-1 sm:col-span-6 pt-2">
                {row?.message}
              </div>
              <Form.Row className="cols-span-6">
                <div className="col-span-1 sm:col-span-6 space-y-2 pt-5">
                  <div className="flex justify-between text-placeholder-color">
                    <span>Type</span>
                    <span>{defaultTypeOption}</span>
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
export default ShowNotificationsTemplate;
