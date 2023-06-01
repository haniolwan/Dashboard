import { useContext, useEffect, useState } from "react";
import Form from "../../Insert/Form";
import { query } from "../../../../utils";
import { toast } from "react-toastify";
import { EnumsContext } from "../../../../context";

const ShowNotificationsHistory = ({ show, setShow, selectedRow }) => {
  const [row, setRow] = useState([]);

  useEffect(() => {
    if (selectedRow) {
      setRow(selectedRow);
    }
  }, [selectedRow]);

  const {
    enums: { NotificationFilter, NotificationTargetType, NotificationType },
  } = useContext(EnumsContext);

  console.log(selectedRow);

  return (
    <Form show={show} setShow={setShow}>
      <Form.Container>
        <Form.Content title={"Notifications History Info"}>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-12 gap-5 w-[20rem]">
              <div className="text-placeholder-color text-center col-span-1 sm:col-span-6 pt-2">
                {row?.title}
              </div>
              <Form.Row className="cols-span-6">
                <div className="col-span-1 sm:col-span-6 space-y-2 pt-5">
                  <div className="flex justify-between text-placeholder-color">
                    <span>Filter</span>
                    <span>
                      {Object.keys(NotificationFilter).find(
                        (key) => NotificationFilter[key] === row?.filter
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Target type</span>
                    <span className="text-end">
                      {Object.keys(NotificationTargetType).find(
                        (key) => NotificationTargetType[key] === row.target_type
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Target count</span>
                    <span className="text-end">{row.target_count}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Notification template</span>
                    <span className="text-end">
                      {row?.NotificationTemplate?.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Type</span>
                    <span className="text-end">
                      {Object.keys(NotificationType).find(
                        (key) => NotificationType[key] === row.type
                      )}
                    </span>
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
export default ShowNotificationsHistory;
