import { useCallback, useEffect, useRef, useState } from "react";
import Form from "../Form";
import { Checkbox, TextArea, TextInput } from "../../../common";
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
    },
    [rowId, setShow, setRefreshRows, updated]
  );

  useEffect(() => {
    if (selectedRow) {
      setRow(selectedRow);
    }
  }, [selectedRow]);

  const typeRef = useRef();
  const titleRef = useRef();
  const messageRef = useRef();

  useEffect(() => {
    if (!show) {
      titleRef.current.value = "";
      messageRef.current.value = "";
      typeRef.current.checked = false;
    }
  }, [show]);

  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content title={"Add New Notification Template"}>
          <Form.Row>
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                ref={titleRef}
                key={row.title}
                name={"title"}
                label={"Title"}
                defaultValue={row.title}
                onChange={handleInputChange}
              />
            </div>
          </Form.Row>
          <Form.Row>
            <div className="col-span-3 sm:col-span-1">
              <TextArea
                ref={messageRef}
                key={row.message}
                name={"message"}
                label={"Message"}
                defaultValue={row.message}
                onChange={handleInputChange}
              />
            </div>
          </Form.Row>
          <Form.Row>
            <div className="col-span-3 sm:col-span-1">
              <Checkbox
                ref={typeRef}
                name={"type"}
                beforeLabel={"Type"}
                defaultChecked={row.type}
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
