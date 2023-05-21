import Form from "../../Insert/Form";
import { TextArea, TextInput } from "../../../common";

const ShowNotificationsHistory = ({ show, setShow, selectedRow }) => {
  return (
    <Form show={show} setShow={setShow}>
      <Form.Container>
        <Form.Content title={"Add New Notifications History"}>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-3 sm:col-span-6">
              <TextInput
                key={selectedRow.title}
                name={"title"}
                label={"Title"}
                defaultValue={selectedRow.title}
                disabled
              />
            </div>
            <div className="col-span-3 sm:col-span-6">
              <TextArea
                key={selectedRow.message}
                name={"message"}
                label={"Message"}
                defaultValue={selectedRow.message}
                disabled
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-3 sm:col-span-6">
              <TextInput
                key={selectedRow.filter}
                name={"filter"}
                label={"Filter"}
                defaultValue={selectedRow.filter}
                disabled
              />
            </div>
            <div className="col-span-3 sm:col-span-6">
              <TextInput
                key={selectedRow.target_count}
                name={"target_count"}
                label={"Target Count"}
                defaultValue={selectedRow.target_count}
                disabled
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-3 sm:col-span-6">
              <TextInput
                key={selectedRow.target_type}
                name={"target_type"}
                label={"Target Type"}
                defaultValue={selectedRow.target_type}
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
export default ShowNotificationsHistory;
