import { useEffect, useState } from "react";
import Form from "../../Insert/Form";
import { Checkbox, UploadImage } from "../../../common";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faEnvelope,
  faGlobe,
  faLocationDot,
  faMobileScreenButton,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const ShowUser = ({ show, setShow, selectedRow }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    if (selectedRow) {
      setUser(selectedRow);
    }
  }, [selectedRow]);
  return (
    <Form show={show} setShow={setShow}>
      <Form.Container>
        <Form.Content title={"User Info"}>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-4 gap-5">
              <UploadImage
                className="col-span-6 justify-center"
                disabled
                avatar
                src={user["user"]?.avatar}
              />
              <div className="text-placeholder-color text-center col-span-1 sm:col-span-6 pt-2">
                {user["user"]?.name}
              </div>
              <div className="pt-5 space-y-2">
                <div className="text-placeholder-color col-span-3 sm:col-span-6">
                  <FontAwesomeIcon className="pr-2" icon={faEnvelope} />
                  {user["user"]?.email}
                </div>
                <div className="text-placeholder-color col-span-3 sm:col-span-6">
                  <FontAwesomeIcon className="pr-2" icon={faLocationDot} />
                  {user["user"]?.Country?.name}, {user["user"]?.City?.name}
                </div>
                <div className="text-placeholder-color col-span-3 sm:col-span-6">
                  <FontAwesomeIcon
                    className="pr-2"
                    icon={faMobileScreenButton}
                  />
                  {user["user"]?.mobile}
                </div>
                <div className="text-placeholder-color col-span-3 sm:col-span-6">
                  <FontAwesomeIcon className="pr-2" icon={faGlobe} />
                  {user["user"]?.Locale?.name}
                </div>
              </div>
              <Form.Row className="cols-span-6">
                <div className="col-span-1 sm:col-span-6 space-y-2 pt-3">
                  <div className="flex justify-between text-placeholder-color">
                    <span>Subscription status</span>
                    <Checkbox
                      name={"subscription_status"}
                      defaultChecked={user["user"]?.subscription_status}
                      disabled
                    />
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Verified</span>
                    <Checkbox
                      name={"is_verified"}
                      defaultChecked={user["user"]?.is_verified}
                      disabled
                    />
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Suspended</span>
                    <Checkbox
                      name={"is_suspended"}
                      defaultChecked={user["user"]?.is_suspended}
                      disabled
                    />
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Baned</span>
                    <Checkbox
                      name={"is_baned"}
                      defaultChecked={user["user"]?.is_baned}
                      disabled
                    />
                  </div>
                </div>
              </Form.Row>
            </div>
            <div className="col-span-8 gap-5 border-l-2 border-[#2f3440] pl-2">
              <div className="border-b-2 border-[#2f3440] mb-5">
                <div>
                  <h3 className="text-placeholder-color pb-2">Orders</h3>
                  <div className="grid grid-cols-3 gap-5 pb-5">
                    <Link
                      to={"/order"}
                      state={{ userId: user["user"]?.id }}
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
                        {user.complete}
                      </p>
                    </Link>
                    <Link
                      to={"/order"}
                      state={{ userId: user["user"]?.id }}
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
                        {user.current}
                      </p>
                    </Link>
                    <Link
                      to={"/order"}
                      state={{ userId: user["user"]?.id }}
                      className="grid grid-cols-3 p-2 w-50 h-20 dark:bg-gray-800 bg-[#f2ebeb] text-placeholder-color text-white font-bold rounded"
                    >
                      <div className="flex col-span-2 space-x-2">
                        <FontAwesomeIcon
                          className="h-5 text-[#ff3333]"
                          icon={faCircleXmark}
                        />
                        <span className="text-sm text-placeholder-color font-normal">
                          Cancel
                        </span>
                      </div>
                      <p className="col-span-3 text-lg font-black text-end pr-2 text-placeholder-color">
                        {user.cancel}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-1 gap-5">
                  <div className="grid grid-cols-2 content-center justify-items-between text-placeholder-color">
                    <h3 className="text-lg font-black text-start">
                      Current subscription
                    </h3>
                    <p className="text-lg font-black text-end text-[#eed202]">
                      Plus
                    </p>
                  </div>
                  <div className="grid grid-cols-2 content-center justify-items-between w-100 h-20 dark:bg-gray-800 bg-[#f2ebeb] text-placeholder-color rounded px-2">
                    <p className="text-sm font-normal text-start flex items-center">
                      Remaining orders
                    </p>
                    <p className="text-md font-black text-end pr-2">50 order</p>
                  </div>
                  <div className="grid grid-cols-2 content-center justify-items-between w-100 h-20 dark:bg-gray-800 bg-[#f2ebeb] text-placeholder-color rounded px-2">
                    <div className="text-sm font-normal text-start flex items-center gap-1">
                      <span> Until </span>
                      <span className="font-black"> 18 January 2023</span>
                    </div>
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
export default ShowUser;
