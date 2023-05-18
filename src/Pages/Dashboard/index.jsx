import { useEffect } from "react";
import { Chart, initTE } from "tw-elements";

const Dashboard = () => {
  useEffect(() => {
    initTE({ Chart });
  }, []);
  return (
    <div className="grid grid-cols-2 gap-8 w-full">
      <div className="w-full">
        <canvas
          data-te-chart="line"
          data-te-dataset-label="Traffic"
          data-te-labels="['Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday ']"
          data-te-dataset-data="[2112, 2343, 2545, 3423, 2365, 1985, 987]"
        ></canvas>
      </div>
      <div className="w-3/5">
        <canvas
          data-te-chart="pie"
          data-te-dataset-label="Traffic"
          data-te-labels="['Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday ']"
          data-te-dataset-data="[2112, 2343, 2545, 3423, 2365, 1985, 987]"
          data-te-dataset-background-color="['rgba(63, 81, 181, 0.5)', 'rgba(77, 182, 172, 0.5)', 'rgba(66, 133, 244, 0.5)', 'rgba(156, 39, 176, 0.5)', 'rgba(233, 30, 99, 0.5)', 'rgba(66, 73, 244, 0.4)', 'rgba(66, 133, 244, 0.2)']"
        ></canvas>
      </div>
      <div className="col-span-2 w-3/4 items-center">
        <canvas
          data-te-chart="bar"
          data-te-dataset-label="Traffic"
          data-te-labels="['Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday ']"
          data-te-dataset-data="[2112, 2343, 2545, 3423, 2365, 1985, 987]"
        ></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
