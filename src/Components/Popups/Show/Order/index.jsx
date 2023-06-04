import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "../../Insert/Form";
import {
  faCircleCheck,
  faCircleXmark,
  faIndustry,
  faLocationDot,
  faMobileScreenButton,
  faSpinner,
  faUser,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { EnumsContext } from "../../../../context";

const ShowOrder = ({ show, setShow, selectedRow }) => {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    if (selectedRow) {
      setOrder(selectedRow);
    }
  }, [selectedRow]);
  const {
    enums: { OrderStatusEnum },
  } = useContext(EnumsContext);
  return (
    <Form show={show} setShow={setShow}>
      <Form.Container>
        <Form.Content title={"Show Order"}>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="col-span-4 gap-5">
              <div className="text-placeholder-color text-center col-span-1 sm:col-span-6 pt-2">
                {order["order"]?.name}
              </div>
              <div className="pt-5 space-y-2">
                <div className="text-placeholder-color col-span-3 sm:col-span-6">
                  <FontAwesomeIcon className="pr-2" icon={faUser} />
                  {order["order"]?.User?.name}
                </div>

                <div className="text-placeholder-color col-span-3 sm:col-span-6">
                  <FontAwesomeIcon
                    className="pr-2"
                    icon={faMobileScreenButton}
                  />
                  {order["order"]?.mobile}
                </div>
                <div className="text-placeholder-color col-span-3 sm:col-span-6">
                  <FontAwesomeIcon className="pr-2" icon={faIndustry} />
                  {order["order"]?.Provider?.name}
                </div>
                <div className="text-placeholder-color col-span-3 sm:col-span-6">
                  <FontAwesomeIcon className="pr-2" icon={faWrench} />
                  {order["order"]?.Service?.name}
                </div>
                <div className="text-placeholder-color col-span-3 sm:col-span-6">
                  <FontAwesomeIcon className="pr-2" icon={faLocationDot} />
                  {order["order"]?.address}
                </div>
              </div>
              <Form.Row className="cols-span-6">
                <div className="col-span-1 sm:col-span-6 space-y-2 pt-5">
                  <div className="flex justify-between text-placeholder-color">
                    <span>Latitude</span>
                    <div className="text-placeholder-color col-span-3 sm:col-span-6">
                      {order["order"]?.latitude}
                    </div>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Status</span>
                    <div className="text-placeholder-color col-span-3 sm:col-span-6">
                      {Object.keys(OrderStatusEnum).find(
                        (key) => OrderStatusEnum[key] === order["order"]?.status
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Rate</span>
                    <div className="text-placeholder-color col-span-3 sm:col-span-6">
                      {order["order"]?.rate}
                    </div>
                  </div>
                  <div className="flex justify-between text-placeholder-color">
                    <span>Review</span>
                    <div className="text-placeholder-color col-span-3 sm:col-span-6">
                      {order["order"]?.review}
                    </div>
                  </div>
                </div>
              </Form.Row>
            </div>
            <div className="col-span-8 gap-5 border-l-2 border-[#2f3440] pl-2">
              {/* <div className="border-b-2 border-[#2f3440] mb-5">
                <div>
                  <h3 className="text-placeholder-color pb-2">Orders</h3>
                  <div className="grid grid-cols-3 gap-5 pb-5">
                    <Link
                      to={"/order"}
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
                        {order.complete}
                      </p>
                    </Link>
                    <Link
                      to={"/order"}
                      state={{ userId: order["user"]?.id }}
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
                        {order.current}
                      </p>
                    </Link>
                    <Link
                      to={"/order"}
                      state={{ userId: order["user"]?.id }}
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
                        {order.failed}
                      </p>
                    </Link>
                  </div>
                </div>
              </div> */}
              <div>
                <div className="grid grid-cols-1 gap-5">
                  <div className="grid grid-cols-2 content-center justify-items-between text-placeholder-color">
                    <h3 className="text-lg font-black text-start">
                      Order Status
                    </h3>
                  </div>
                  <Form.Row className="cols-span-6">
                    <div className="col-span-1 sm:col-span-6 space-y-2">
                      <div className="flex justify-between text-placeholder-color">
                        <span>Order id</span>
                        <div className="text-placeholder-color col-span-3 sm:col-span-6">
                          {order["OrderStatus"]?.order_id}
                        </div>
                      </div>
                      <div className="flex justify-between text-placeholder-color">
                        <span>Status</span>
                        <div className="text-placeholder-color col-span-3 sm:col-span-6">
                          {Object.keys(OrderStatusEnum).find(
                            (key) =>
                              OrderStatusEnum[key] === order["order"]?.status
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between text-placeholder-color">
                        <span>Description</span>
                        <div className="text-placeholder-color col-span-3 sm:col-span-6">
                          {order["OrderStatus"]?.description}
                        </div>
                      </div>
                      <div className="flex justify-between text-placeholder-color">
                        <span>Created at</span>
                        <div className="text-placeholder-color col-span-3 sm:col-span-6">
                          {order["OrderStatus"]?.created_at}
                        </div>
                      </div>
                      <div className="flex justify-between text-placeholder-color">
                        <span>Updated at</span>
                        <div className="text-placeholder-color col-span-3 sm:col-span-6">
                          {order["OrderStatus"]?.updated_at}
                        </div>
                      </div>
                    </div>
                  </Form.Row>
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
export default ShowOrder;
