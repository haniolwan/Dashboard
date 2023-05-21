import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, UploadImage } from "../../../common";
import Form from "../../Insert/Form";
import {
  faGlobe,
  faLocationDot,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";

const ShowEmployee = ({ show, setShow, selectedRow }) => {
  return (
    <Form show={show} setShow={setShow}>
      <Form.Container>
        <Form.Content title={"Employee Info"}>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-12 gap-5 w-[20rem]">
              <UploadImage
                className="col-span-6 justify-center"
                disabled
                avatar
                src={selectedRow?.avatar}
              />
              <div className="text-placeholder-color text-center col-span-1 sm:col-span-6 pt-2">
                {selectedRow?.name}
              </div>
              <div className="pt-5 space-y-2">
                <div className="text-placeholder-color col-span-3 sm:col-span-6">
                  <FontAwesomeIcon className="pr-2" icon={faLocationDot} />
                  {selectedRow?.Country?.name}, {selectedRow?.City?.name}
                </div>
                <div className="text-placeholder-color col-span-3 sm:col-span-6">
                  <FontAwesomeIcon
                    className="pr-2"
                    icon={faMobileScreenButton}
                  />
                  {selectedRow?.mobile}
                </div>
                <div className="text-placeholder-color col-span-3 sm:col-span-6">
                  <FontAwesomeIcon className="pr-2" icon={faGlobe} />
                  {selectedRow?.Locale?.name}
                </div>
              </div>
              <Form.Row className="cols-span-6">
                <div className="col-span-1 sm:col-span-6 space-y-2 pt-5">
                  <div className="flex justify-between text-placeholder-color">
                    <span>Suspended</span>
                    <Checkbox
                      name={"is_suspended"}
                      defaultChecked={selectedRow?.is_suspended}
                      disabled
                    />
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Baned</span>
                    <Checkbox
                      name={"is_baned"}
                      defaultChecked={selectedRow?.is_baned}
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
export default ShowEmployee;
