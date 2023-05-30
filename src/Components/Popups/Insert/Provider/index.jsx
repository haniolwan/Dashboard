import { useCallback, useEffect, useRef, useState } from "react";
import { Checkbox } from "../../../common";
import Form from "../Form";
import { updateNewRow } from "../../../common/Table/methods";

const AddProvider = ({
  providerId,
  selectedRow,
  show,
  setShow,
  updated,
  setUpdated,
  handleInputChange,
  setRefreshRows,
}) => {
  const [provider, setProvider] = useState([]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (providerId) {
        updateNewRow(updated, "providers", providerId);
      }
      setShow(false);
      setRefreshRows(true);
    },
    [providerId, setShow, setRefreshRows, updated]
  );

  useEffect(() => {
    if (selectedRow) {
      setProvider(selectedRow?.provider);
    }
  }, [selectedRow]);

  const verifiedRef = useRef();
  const suspendedRef = useRef();
  const banedRef = useRef();
  const availableRef = useRef();

  useEffect(() => {
    if (!show) {
      verifiedRef.current.defaultChecked = false;
      suspendedRef.current.defaultChecked = false;
      banedRef.current.defaultChecked = false;
      availableRef.current.defaultChecked = false;
    }
  }, [show]);

  useEffect(() => {
    if (!show) {
      setProvider([]);
      setUpdated([]);
    }
  }, [setUpdated, show]);

  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content title={"Edit provider"}>
          <Form.Row className="cols-span-6">
            <div className="col-span-1 sm:col-span-6 space-y-2 pt-5">
              <div className="flex justify-between text-placeholder-color">
                <span>Verified</span>
                <Checkbox
                  ref={verifiedRef}
                  name={"is_verified"}
                  defaultChecked={provider?.is_verified}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between text-placeholder-color">
                <span>Suspended</span>
                <Checkbox
                  ref={suspendedRef}
                  name={"is_suspended"}
                  defaultChecked={provider?.is_suspended}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between text-placeholder-color">
                <span>Baned</span>
                <Checkbox
                  ref={banedRef}
                  name={"is_baned"}
                  defaultChecked={provider?.is_baned}
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
export default AddProvider;
