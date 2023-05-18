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
  const modalRef = useRef();
  const [slider, setSlider] = useState([]);

  const [avatarSrc, setAvatarSrc] = useState("");

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
      event.target.reset();
    },
    [sliderId, setShow, setRefreshRows, updated]
  );

  useEffect(() => {
    if (selectedRow) {
      setSlider(selectedRow);
    }
  }, [selectedRow]);

  return (
    <Form show={show} setShow={setShow}>
      <Form.Container ref={modalRef} onSubmit={onSubmit}>
        <Form.Content>
          <Form.Row className="grid grid-cols-1 gap-5">
            <div className="col-span-3 sm:col-span-1">
              <TextInput
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
                id={"user_avatar"}
                label={"Photo"}
                name={"image"}
                src={avatarSrc || slider.image}
                onChange={handleInputChange}
              />
              <div className="grid grid-cols-2">
                <Checkbox
                  name={"is_active"}
                  beforeLabel={"Is Active"}
                  defaultChecked={slider.is_active}
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
export default AddSlider;
