import { useCallback, useEffect, useRef, useState } from "react";
import { Checkbox } from "../../../common";
import Form from "../Form";
import { updateNewRow } from "../../../common/Table/methods";

const AddUser = ({
  userId,
  selectedRow,
  show,
  setShow,
  updated,
  setUpdated,
  handleInputChange,
  setRefreshRows,
}) => {
  const [user, setUser] = useState([]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (userId) {
        updateNewRow(updated, "users", userId);
      }
      setShow(false);
      setRefreshRows(true);
    },
    [userId, setShow, setRefreshRows, updated]
  );

  useEffect(() => {
    if (selectedRow) {
      setUser(selectedRow?.user);
    }
  }, [selectedRow]);

  useEffect(() => {
    if (!show) {
      setUpdated([]);
    }
  }, [setUpdated, show]);

  const suspendedRef = useRef();
  const banedRef = useRef();

  useEffect(() => {
    if (!show) {
      suspendedRef.current.defaultChecked = false;
      banedRef.current.defaultChecked = false;
    }
  }, [show]);

  useEffect(() => {
    if (!show) {
      setUser([]);
      setUpdated([]);
    }
  }, [setUpdated, show]);

  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content title={"Edit user"}>
          <Form.Row className="cols-span-6">
            <div className="col-span-1 sm:col-span-6 space-y-2 pt-5">
              <div className="flex justify-between text-placeholder-color">
                <span>Suspended</span>
                <Checkbox
                  ref={suspendedRef}
                  name={"is_suspended"}
                  defaultChecked={user?.is_suspended}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between text-placeholder-color">
                <span>Baned</span>
                <Checkbox
                  ref={banedRef}
                  name={"is_baned"}
                  defaultChecked={user?.is_baned}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Form.Row>
        </Form.Content>
        <Form.Footer />
      </Form.Container>
    </Form>
  );
};
export default AddUser;
