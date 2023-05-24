import { useCallback, useEffect, useRef, useState } from "react";
import Form from "../Form";
import { Checkbox, TextInput, UploadImage } from "../../../common";
import { insertNewRow, updateNewRow } from "../../../common/Table/methods";

const AddSlider = ({
  sliderId,
  selectedRow,
  show,
  setShow,
  updated,
  setUpdated,
  handleInputChange,
  setRefreshRows,
}) => {
  const [slider, setSlider] = useState([]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (sliderId) {
        updateNewRow(updated, "sliders", sliderId);
      } else {
        insertNewRow(updated, "sliders");
      }
      setShow(false);
      setRefreshRows(true);
    },
    [sliderId, setShow, setRefreshRows, updated]
  );

  useEffect(() => {
    if (selectedRow) {
      setSlider(selectedRow);
    }
  }, [selectedRow]);

  const nameRef = useRef();
  const imageRef = useRef();
  const urlRef = useRef();
  const activeRef = useRef();

  useEffect(() => {
    if (!show) {
      nameRef.current.value = "";
      urlRef.current.value = "";
      imageRef.current.value = "";
      activeRef.current.checked = false;
    }
  }, [show]);

  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content>
          <Form.Row className="grid grid-cols-1 gap-5">
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                ref={nameRef}
                key={slider.name}
                name={"name"}
                label={"Name"}
                defaultValue={slider.name}
                onChange={handleInputChange}
              />
            </div>
          </Form.Row>
          <Form.Row>
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                ref={urlRef}
                key={slider.url}
                name={"url"}
                label={"Url"}
                defaultValue={slider.url}
                onChange={handleInputChange}
              />
            </div>
          </Form.Row>
          <Form.Row>
            <div className="grid grid-cols-2">
              <UploadImage
                ref={imageRef}
                id={"user_avatar"}
                label={"Photo"}
                name={"image"}
                src={slider.image}
                onChange={handleInputChange}
              />
            </div>
            <Form.Row className="mt-5">
              <div className="grid grid-cols-2">
                <Checkbox
                  ref={activeRef}
                  name={"is_active"}
                  beforeLabel={"Is Active"}
                  defaultChecked={slider.is_active}
                  onChange={handleInputChange}
                />
              </div>
            </Form.Row>
          </Form.Row>
        </Form.Content>
        <Form.Footer />
      </Form.Container>
    </Form>
  );
};
export default AddSlider;
