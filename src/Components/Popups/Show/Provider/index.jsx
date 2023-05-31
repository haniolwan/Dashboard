import { useEffect, useState } from "react";
import Form from "../../Insert/Form";
import { Checkbox, UploadImage } from "../../../common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faGlobe,
  faLocationDot,
  faMobileScreenButton,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const ShowProvider = ({ show, setShow, selectedRow }) => {
  const [provider, setProvider] = useState([]);
  useEffect(() => {
    if (selectedRow) {
      setProvider(selectedRow);
    }
  }, [selectedRow]);
  return (
    <Form show={show} setShow={setShow}>
      <Form.Container>
        <Form.Content title={"Provider Info"}>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-4 gap-5">
              <UploadImage
                className="col-span-6 justify-center"
                disabled
                avatar
                src={provider?.provider?.avatar}
              />
              <div className="text-placeholder-color text-center col-span-1 sm:col-span-6 pt-2">
                {provider?.provider?.name}
              </div>
              <div className="pt-5 space-y-2">
                <div className="text-placeholder-color col-span-3 sm:col-span-6">
                  <FontAwesomeIcon className="pr-2" icon={faLocationDot} />
                  {provider?.provider?.Country?.name},{" "}
                  {provider?.provider?.City?.name}
                </div>
                <div className="text-placeholder-color col-span-3 sm:col-span-6">
                  <FontAwesomeIcon
                    className="pr-2"
                    icon={faMobileScreenButton}
                  />
                  {provider?.provider?.mobile}
                </div>
                <div className="text-placeholder-color col-span-3 sm:col-span-6">
                  <FontAwesomeIcon className="pr-2" icon={faGlobe} />
                  {provider?.provider?.Locale?.name}
                </div>
              </div>
              <Form.Row className="cols-span-6">
                <div className="col-span-1 sm:col-span-6 space-y-2 pt-5">
                  <div className="flex justify-between text-placeholder-color">
                    <span>Available</span>
                    <Checkbox
                      name={"is_available"}
                      defaultChecked={provider?.provider?.is_available}
                      disabled
                    />
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Verified</span>
                    <Checkbox
                      name={"is_verified"}
                      defaultChecked={provider?.provider?.is_verified}
                      disabled
                    />
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Suspended</span>
                    <Checkbox
                      name={"is_suspended"}
                      defaultChecked={provider?.provider?.is_suspended}
                      disabled
                    />
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Baned</span>
                    <Checkbox
                      name={"is_baned"}
                      defaultChecked={provider?.provider?.is_baned}
                      disabled
                    />
                  </div>
                </div>
              </Form.Row>
            </div>
            <div className="col-span-8 gap-5 border-l-2 border-[#2f3440] pl-2">
              <div className="border-b-2 border-[#2f3440] mb-5">
                <div>
                  <h3 className="text-placeholder-color pb-2">Provider</h3>
                  <div className="grid grid-cols-3 gap-5 pb-5">
                    <div
                      to={"/order"}
                      // state={{ userId: selectedRow["user"]?.id }}
                      className="grid grid-cols-3 p-2 w-50 h-20 dark:bg-gray-800 bg-[#f2ebeb] text-placeholder-color text-white font-bold  rounded"
                    >
                      <div className="flex col-span-2 space-x-2">
                        <FontAwesomeIcon
                          className="h-5 text-[#198754]"
                          icon={faCircleCheck}
                        />
                        <span className="text-sm text-placeholder-color font-normal">
                          Completed
                        </span>
                      </div>
                      <p className="col-span-3 text-lg font-black text-end pr-2 text-placeholder-color">
                        {provider?.provider?.complete}
                      </p>
                    </div>
                    <div
                      to={"/order"}
                      // state={{ userId: selectedRow["user"]?.id }}
                      className="grid grid-cols-3 p-2 w-50 h-20 dark:bg-gray-800 bg-[#f2ebeb] text-placeholder-color text-white font-bold  rounded"
                    >
                      <div className="flex col-span-2 space-x-2">
                        <FontAwesomeIcon
                          className="h-5 text-[#eed202]"
                          icon={faSpinner}
                        />
                        <span className="text-sm text-placeholder-color font-normal">
                          Current
                        </span>
                      </div>
                      <p className="col-span-3 text-lg font-black text-end pr-2 text-placeholder-color">
                        {provider?.provider?.current}
                      </p>
                    </div>
                    <div
                      to={"/order"}
                      // state={{ userId: selectedRow["user"]?.id }}
                      className="grid grid-cols-3 p-2 w-50 h-20 dark:bg-gray-800 bg-[#f2ebeb] text-placeholder-color text-white font-bold rounded"
                    >
                      <div className="flex col-span-2 space-x-2">
                        <FontAwesomeIcon
                          className="h-5 text-[#ff3333]"
                          icon={faCircleXmark}
                        />
                        <span className="text-sm text-placeholder-color font-normal">
                          Failed
                        </span>
                      </div>
                      <p className="col-span-3 text-lg font-black text-end pr-2 text-placeholder-color">
                        {provider?.provider?.failed}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-1 gap-5">
                  <div className="grid grid-cols-2 content-center justify-items-between text-placeholder-color">
                    <h3 className="text-lg font-black text-start">Services</h3>
                  </div>
                  <div className="grid grid-cols-3 text-placeholder-color rounded gap-5">
                    {provider?.services &&
                      provider?.services?.map((service) => {
                        return (
                          <button
                            disabled
                            className="border bg-transparent text-sm
                        font-semibold p-1 border-placeholder-color rounded"
                          >
                            {service.name}
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </Form.Row>
        </Form.Content>
        <Form.Footer disabled />
      </Form.Container>
    </Form>
  );
};
export default ShowProvider;
