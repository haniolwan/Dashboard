import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Form from "../Form";
import { SelectInput, TextArea, TextInput } from "../../../common";
import { insertNewRow, updateNewRow } from "../../../common/Table/methods";
import { EnumsContext } from "../../../../context";

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
        updateNewRow(updated, "notifications/templates", rowId);
      } else {
        insertNewRow(updated, "notifications/templates");
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

  const {
    enums: { NotificationType },
  } = useContext(EnumsContext);
  const [typeOptions, setTypeOptions] = useState([]);
  const [defaultTypeOption, setDefaultTypeOption] = useState([]);
  const [loadingType, setLoadingType] = useState(true);

  useEffect(() => {
    if (show) {
      const options = Object.keys(NotificationType).map((item) => {
        if (NotificationType[item] === row.type) {
          setDefaultTypeOption({ label: item, value: NotificationType[item] });
        }
        return { label: item, value: NotificationType[item] };
      });
      setTypeOptions(options);
      setLoadingType(false);
    }
  }, [NotificationType, row, show]);

  const titleRef = useRef();
  const messageRef = useRef();
  const typeRef = useRef();

  useEffect(() => {
    if (!show) {
      setRow([]);
      setUpdated([]);
    }
  }, [setUpdated, show]);

  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content title={"Add Notification Template"}>
          <Form.Row className="grid grid-cols-5 gap-5">
            <div className="col-span-3 sm:col-span-3">
              <TextInput
                ref={titleRef}
                key={row.title}
                name={"title"}
                label={"Title"}
                defaultValue={row.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-2">
              <SelectInput
                ref={typeRef}
                key={defaultTypeOption}
                name={"type"}
                label={"Type"}
                options={typeOptions}
                onChange={(type) => {
                  setUpdated({
                    ...updated,
                    type: type.value,
                  });
                }}
                defaultValue={defaultTypeOption}
                isLoading={loadingType}
              />
            </div>
          </Form.Row>
          <Form.Row>
            <div className="col-span-3 sm:col-span-3">
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
        </Form.Content>
        <Form.Footer />
      </Form.Container>
    </Form>
  );
};

export default AddNotificationTemplate;
