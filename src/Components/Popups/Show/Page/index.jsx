import { useEffect, useState } from "react";
import Form from "../../Insert/Form";
import { Checkbox, UploadImage } from "../../../common";

const ShowPage = ({ show, setShow, selectedRow }) => {
  const [page, setPage] = useState([]);
  useEffect(() => {
    if (selectedRow) {
      setPage(selectedRow);
    }
  }, [selectedRow]);
  return (
    <Form show={show} setShow={setShow}>
      <Form.Container>
        <Form.Content title={"Page Info"}>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-12 gap-5 w-[20rem]">
              <div className="flex justify-center">
                <UploadImage
                  className="col-span-6 justify-center"
                  disabled
                  avatar
                  src={page?.image}
                />
              </div>
              <div className="text-placeholder-color text-center col-span-1 sm:col-span-6 pt-2">
                {page?.name}
              </div>
              <Form.Row className="cols-span-6">
                <div className="col-span-1 sm:col-span-6 space-y-2 pt-5">
                  <div className="flex justify-between text-placeholder-color">
                    <span>Key</span>
                    <span>{page.key}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Content</span>
                    <span className="text-end">{page.content}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Description</span>
                    <span className="text-end">{page.description}</span>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Active</span>
                    <Checkbox
                      name={"is_active"}
                      defaultChecked={page?.is_active}
                      disabled
                    />
                  </div>
                </div>
              </Form.Row>
            </div>
          </Form.Row>
        </Form.Content>
        <Form.Footer disabled />
      </Form.Container>
    </Form>
  );
};
export default ShowPage;
