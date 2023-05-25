import { useCallback, useEffect, useState } from "react";
import { Chart, initTE } from "tw-elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";
import {
  faReceipt,
  faSackDollar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { query } from "../../utils";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [userMonths, setUserMonths] = useState([]);
  const [userCount, setUserCount] = useState([]);

  const [providerMonths, setProviderMonths] = useState([]);
  const [providerCount, setProviderCount] = useState([]);

  const [orderMonths, setOrderMonths] = useState([]);
  const [orderCount, setOrderCount] = useState([]);

  const getData = useCallback(async () => {
    const {
      data: { message },
    } = await query("/api/dashboard/statistics");
    setData(message);
    message.UserChart.forEach((chart) => {
      Object.keys(chart).forEach((item) => {
        if (isNaN(chart[item])) {
          setUserMonths((months) => [chart[item], ...months]);
        } else {
          setUserCount((counts) => [chart[item], ...counts]);
        }
      });
    });
    message.ProviderChart.forEach((chart) => {
      Object.keys(chart).forEach((item) => {
        if (isNaN(chart[item])) {
          setProviderMonths((months) => [chart[item], ...months]);
        } else {
          setProviderCount((counts) => [chart[item], ...counts]);
        }
      });
    });
    message.OrderChart.forEach((chart) => {
      Object.keys(chart).forEach((item) => {
        if (isNaN(chart[item])) {
          setOrderMonths((months) => [chart[item], ...months]);
        } else {
          setOrderCount((counts) => [chart[item], ...counts]);
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(userMonths);
  useEffect(() => {
    try {
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [getData]);

  useEffect(() => {
    initTE({ Chart });
  }, []);
  return (
    <div className="flex flex-col items-center justify-center gap-[40px] w-full pb-8">
      <div className="grid grid-cols-4 gap-8 w-full">
        <div className="flex items-center  p-[20px] bg-[#FFFFFF] w-full rounded-[20px] shadow-lg dark:bg-gray-800">
          <div className=" p-[20px] group-hover:text-white  rounded-[10px]  text-primary-color bg-[#DF8D621A]">
            <FontAwesomeIcon icon={faReceipt} className="h-7 " />
          </div>
          <div className="w-full px-[25px]">
            <p className=" text-[#000000]  text-[14px] leading-[23px] font-[600] md:text-[18px] md:leading-[27px] font-[600] dark:text-white">
              Total Orders
            </p>
            <p className="  mb-2 text-[#000000] text-[30px] leading-[45px] font-[700] dark:text-white">
              {data.OrderCount}
            </p>
          </div>
        </div>

        <div className="flex items-center  p-[20px] bg-[#FFFFFF] w-full rounded-[20px] shadow-lg dark:bg-gray-800">
          <div className=" p-[20px] group-hover:text-white  rounded-[10px]  text-[#9CCFBB] bg-[#9CCFBB] bg-opacity-[15%]">
            <FontAwesomeIcon icon={faUser} className="h-7 " />
          </div>
          <div className="w-full px-[30px]">
            <p className=" text-[#000000]  text-[14px] leading-[23px] font-[600] md:text-[18px] md:leading-[27px] font-[600] dark:text-white ">
              Total Users
            </p>
            <p className="  mb-2 text-[#000000] text-[30px] leading-[45px] font-[700] dark:text-white">
              {data.UserCount}
            </p>
          </div>
        </div>

        <div className="flex items-center  p-[20px] bg-[#FFFFFF] w-full rounded-[20px] shadow-lg dark:bg-gray-800">
          <div className=" p-[20px] group-hover:text-white  rounded-[10px]  text-[#40A1FC] bg-[#40A1FC] bg-opacity-[15%]">
            <FontAwesomeIcon icon={faSackDollar} className="h-7 " />
          </div>
          <div className="w-full px-[30px]">
            <p className=" text-[#000000]  text-[14px] leading-[23px] font-[600] md:text-[18px] md:leading-[27px] font-[600] dark:text-white ">
              Tolal Income
            </p>
            <p className="  mb-2 text-[#000000] text-[30px] leading-[45px] font-[700] dark:text-white">
              {data.ProviderCount}
            </p>
          </div>
        </div>
        <div className="flex items-center p-[20px] bg-[#FFFFFF] w-full rounded-[20px] shadow-lg dark:bg-gray-800">
          <div className=" p-[20px] group-hover:text-white  rounded-[10px]  text-[#AD62E1] bg-[#AD62E1] bg-opacity-[15%]">
            <FontAwesomeIcon icon={faSackDollar} className="h-7 " />
          </div>
          <div className="w-full px-[30px]">
            <p className=" text-[#000000]  text-[14px] leading-[23px] font-[600] md:text-[18px] md:leading-[27px] font-[600] dark:text-white ">
              Subscription
            </p>
            <p className="  mb-2 text-[#000000] text-[30px] leading-[45px] font-[700] dark:text-white">
              {data.Subscription}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 w-full">
        <div className="w-full flex items-center  p-[20px] bg-[#FFFFFF] w-full rounded-[20px] shadow-lg dark:bg-gray-800">
          <canvas
            data-te-chart="pie"
            data-te-dataset-label="Traffic"
            data-te-labels={providerMonths}
            data-te-dataset-data={providerCount}
            data-te-dataset-background-color="['rgba(63, 81, 181, 0.5)', 'rgba(77, 182, 172, 0.5)', 'rgba(66, 133, 244, 0.5)', 'rgba(156, 39, 176, 0.5)', 'rgba(233, 30, 99, 0.5)', 'rgba(66, 73, 244, 0.4)', 'rgba(66, 133, 244, 0.2)']"
          ></canvas>
        </div>
        <div className="col-span-2 w-full flex items-center  p-[20px] bg-[#FFFFFF] w-full rounded-[20px] shadow-lg dark:bg-gray-800">
          <canvas
            data-te-chart="line"
            data-te-dataset-label="Traffic"
            data-te-labels={userMonths}
            data-te-dataset-data={userCount}
          ></canvas>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 w-full">
        <div className="w-full flex items-center  p-[20px] bg-[#FFFFFF] w-full rounded-[20px] shadow-lg dark:bg-gray-800">
          <canvas
            data-te-chart="bar"
            data-te-dataset-label="Traffic"
            data-te-labels={orderMonths}
            data-te-dataset-data={orderCount}
          ></canvas>
        </div>
        <div className="w-full flex items-center  p-[20px] bg-[#FFFFFF] w-full rounded-[20px] shadow-lg dark:bg-gray-800">
          <canvas
            id="charts"
            data-te-chart="bar"
            data-te-dataset-label="Traffic"
            data-te-labels={userMonths}
            data-te-dataset-data={userCount}
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
