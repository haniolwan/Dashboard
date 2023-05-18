import { Button, Checkbox, TextInput, UploadImage } from "../../../common";
import Form from "../../Insert/Form";

const ShowEmployee = ({ show, setShow, selectedRow }) => {
  return (
    <Form show={show} setShow={setShow}>
      <Form.Container>
        <Form.Content title={"Show Employee"}>
          <Form.Row className="grid grid-cols-10 gap-5">
            <UploadImage src={selectedRow.avatar} avatar />
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
                key={selectedRow.email}
                name={"email"}
                label={"Email"}
                defaultValue={selectedRow.email}
                disabled
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-8 gap-5">
            <div className="col-span-3 sm:col-span-4">
              <TextInput
                key={selectedRow.mobile}
                name={"mobile"}
                label={"Mobile"}
                defaultValue={selectedRow.mobile}
                disabled
              />
            </div>
            <div className="col-span-3 sm:col-span-4">
              <TextInput
                key={selectedRow?.Country?.name}
                name={"Country"}
                label={"Country"}
                defaultValue={selectedRow?.Country?.name}
                disabled
              />
            </div>
            <div className="col-span-3 sm:col-span-4">
              <TextInput
                key={selectedRow?.City?.name}
                name={"Country"}
                label={"Country"}
                defaultValue={selectedRow?.City?.name}
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
                name={"is_suspended"}
                afterLabel={"Is suspended"}
                defaultChecked={selectedRow.is_suspended}
                disabled
              />
              <Checkbox
                name={"is_baned"}
                afterLabel={"Is baned"}
                defaultChecked={selectedRow.is_baned}
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
export default ShowEmployee;
