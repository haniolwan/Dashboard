import { useCallback, useEffect, useRef, useState } from "react";
import Form from "../Form";
import { TextArea, TextInput } from "../../../common";
import { insertNewRow, updateNewRow } from "../../../common/Table/methods";

const AddNotificationTemplate = ({
  rowId,
  selectedRow,
  show,
  setShow,
  updated,
  setUpdated,
  handleInputChange,
  setRefreshRows,
}) => {
  const modalRef = useRef();
  const [row, setRow] = useState({});

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (rowId) {
        updateNewRow(updated, "notifications_templates", rowId);
      } else {
        insertNewRow(updated, "notifications_templates");
      }
      setShow(false);
      setRefreshRows(true);
      event.target.reset();
    },
    [rowId, setShow, setRefreshRows, updated]
  );

  useEffect(() => {
    if (selectedRow) {
      setRow(selectedRow);
    }
  }, [selectedRow]);

  useEffect(() => {
    setRow([]);
    setUpdated([]);
  }, [show, setUpdated]);

  return (
    <Form show={show} setShow={setShow}>
      <Form.Container ref={modalRef} onSubmit={onSubmit}>
        <Form.Content title={"Add New Notification Template"}>
          <Form.Row className="grid grid-cols-3 gap-5">
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                key={row.name}
                name={"name"}
                label={"Name"}
                defaultValue={row.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                key={row.type}
                name={"type"}
                label={"Type"}
                defaultValue={row.type}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                key={row.title}
                name={"title"}
                label={"Title"}
                defaultValue={row.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextArea
                key={row.message}
                name={"message"}
                label={"Message"}
                defaultValue={row.message}
                onChange={handleInputChange}
              />
            </div>
          </Form.Row>
        </Form.Content>
        <Form.Footer />
      </Form.Container>
    </Form>
  );
};

export default AddNotificationTemplate;
