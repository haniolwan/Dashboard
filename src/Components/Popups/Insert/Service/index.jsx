import { useCallback, useEffect, useRef, useState } from "react";
import { Checkbox, TextArea, TextInput, UploadImage } from "../../../common";
import Form from "../Form";
import { insertNewRow, updateNewRow } from "../../../common/Table/methods";

const AddService = ({
  serviceId,
  selectedRow,
  setSelectedRow,
  show,
  setShow,
  updated,
  setUpdated,
  handleInputChange,
  setRefreshRows,
}) => {
  const [service, setService] = useState([]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (serviceId) {
        updateNewRow(updated, "services", serviceId);
      } else {
        insertNewRow(updated, "services");
      }
      setShow(false);
      setRefreshRows(true);
    },
    [serviceId, setShow, setRefreshRows, updated]
  );

  useEffect(() => {
    if (selectedRow && show) {
      setService(selectedRow);
    }
  }, [selectedRow, setSelectedRow, show]);

  const nameRef = useRef();
  const imageRef = useRef();
  const descRef = useRef();
  const activeRef = useRef();

  useEffect(() => {
    if (!show) {
      setService([]);
      setUpdated([]);
    }
  }, [setUpdated, show]);

  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content>
          <Form.Row className="grid grid-cols-5 gap-5">
            <div className="col-span-3 sm:col-span-5">
              <TextInput
                ref={nameRef}
                key={service.name}
                name={"name"}
                label={"Name"}
                placeholder="Name"
                defaultValue={service.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-5">
              <TextArea
                ref={descRef}
                key={service.description}
                id={"description"}
                label={"Description"}
                placeholder={"Description"}
                name={"description"}
                defaultValue={service.description}
                onChange={handleInputChange}
              />
            </div>
          </Form.Row>
          <Form.Row className="grid gap-5">
            <UploadImage
              ref={imageRef}
              key={service.image}
              id={"service_avatar"}
              label={"Photo"}
              name={"image"}
              src={service.image}
              onChange={handleInputChange}
            />
          </Form.Row>
          <Form.Row className="grid gap-5">
            <div className="grid grid-cols-2">
              <Checkbox
                ref={activeRef}
                name={"is_active"}
                beforeLabel={"Is Active"}
                defaultChecked={service?.is_active}
                checked={updated.is_active}
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
export default AddService;
