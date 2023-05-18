import { useRef } from "react";
import Form from "../../Insert/Form";
import { Checkbox, TextInput, UploadImage } from "../../../common";

const ShowCountry = ({ show, setShow, selectedRow }) => {
  const modalRef = useRef();
  return (
    <Form show={show} setShow={setShow}>
      <Form.Container ref={modalRef}>
        <Form.Content title={"Show Country"}>
          <Form.Row className="grid grid-cols-10 gap-5">
            <UploadImage src={selectedRow?.flag} avatar />
            <div className="col-span-3 sm:col-span-4">
              <TextInput
                key={selectedRow.name}
                name={"name"}
                label={"Name"}
                defaultValue={selectedRow.name}
                disabled
              />
            </div>
            <div className="col-span-3 sm:col-span-4">
              <TextInput
                key={selectedRow.code}
                name={"code"}
                label={"Code"}
                defaultValue={selectedRow.code}
                disabled
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-8 gap-5">
            <div className="col-span-3 sm:col-span-4">
              <TextInput
                key={selectedRow?.Currency?.name}
                name={"Currency"}
                label={"Currency"}
                defaultValue={selectedRow?.Currency?.name}
                disabled
              />
            </div>
            <div className="col-span-3 sm:col-span-4">
              <TextInput
                key={selectedRow?.Locale?.name}
                name={"Locale"}
                label={"Locale"}
                defaultValue={selectedRow?.Locale?.name}
                disabled
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="grid grid-cols-3 col-span-6 row-span-1 gap-3">
              <Checkbox
                name={"is_active"}
                afterLabel={"Is active"}
                defaultChecked={selectedRow.is_active}
                disabled
              />
            </div>
          </Form.Row>
        </Form.Content>
        <Form.Footer disabled />
      </Form.Container>
    </Form>
  );
};
export default ShowCountry;
