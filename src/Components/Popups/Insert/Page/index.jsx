import { useCallback, useEffect, useRef, useState } from "react";
import Form from "../Form";
import { Checkbox, TextArea, TextInput, UploadImage } from "../../../common";
import { insertNewRow, updateNewRow } from "../../../common/Table/methods";

const AddPage = ({
  pageId,
  selectedRow,
  show,
  setShow,
  updated,
  setUpdated,
  handleInputChange,
  setRefreshRows,
}) => {
  const modalRef = useRef();
  const [page, setPage] = useState([]);

  const [avatarSrc, setAvatarSrc] = useState("");

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (pageId) {
        updateNewRow(updated, "pages", pageId);
      } else {
        insertNewRow(updated, "pages");
      }
      setShow(false);
      setRefreshRows(true);
    },
    [pageId, setShow, setRefreshRows, updated]
  );

  useEffect(() => {
    if (selectedRow) {
      setPage(selectedRow);
    }
  }, [selectedRow]);

  useEffect(() => {
    setPage([]);
  }, [show]);

  return (
    <Form show={show} setShow={setShow}>
      <Form.Container ref={modalRef} onSubmit={onSubmit}>
        <Form.Content>
          <Form.Row className="grid grid-cols-2 gap-5">
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                key={page.name}
                name={"name"}
                label={"Name"}
                defaultValue={page.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                key={page.key}
                name={"key"}
                label={"Key"}
                defaultValue={page.key}
                onChange={handleInputChange}
              />
            </div>
          </Form.Row>
          <Form.Row>
            <div className="col-span-3 sm:col-span-1">
              <TextArea
                key={page.description}
                name={"description"}
                label={"Description"}
                defaultValue={page.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextArea
                key={page.content}
                name={"content"}
                label={"Content"}
                defaultValue={page.content}
                onChange={handleInputChange}
              />
            </div>
          </Form.Row>
          <Form.Row>
            <div className="grid grid-cols-2">
              <UploadImage
                id={"page_avatar"}
                label={"Photo"}
                name={"image"}
                src={avatarSrc || page.image}
                onChange={handleInputChange}
              />
              <div className="grid grid-cols-2">
                <Checkbox
                  name={"is_active"}
                  beforeLabel={"Is Active"}
                  defaultChecked={page.is_active}
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
export default AddPage;
