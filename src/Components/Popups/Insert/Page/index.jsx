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
  const [page, setPage] = useState([]);

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

  const nameRef = useRef();
  const keyRef = useRef();
  const descriptionRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();
  const activeRef = useRef();

  useEffect(() => {
    if (!show) {
      setUpdated([]);
      setPage([]);
    }
  }, [setUpdated, show]);

  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content>
          <Form.Row className="grid grid-cols-2 gap-5">
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                ref={nameRef}
                key={page.name}
                name={"name"}
                label={"Name"}
                defaultValue={page.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                ref={keyRef}
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
                ref={descriptionRef}
                key={page.description}
                name={"description"}
                label={"Description"}
                defaultValue={page.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextArea
                ref={contentRef}
                key={page.summary}
                name={"summary"}
                label={"Summary"}
                defaultValue={page.summary}
                onChange={handleInputChange}
              />
            </div>
          </Form.Row>
          <Form.Row>
            <div className="grid grid-cols-2">
              <UploadImage
                ref={imageRef}
                id={"page_avatar"}
                label={"Photo"}
                name={"image"}
                src={page.image}
                onChange={handleInputChange}
              />
            </div>
          </Form.Row>
          <Form.Row>
            <div className="grid grid-cols-2">
              <Checkbox
                ref={activeRef}
                name={"is_active"}
                beforeLabel={"Is Active"}
                defaultChecked={page?.is_active}
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
export default AddPage;
