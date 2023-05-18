import {useState} from 'react';
import Cal from '@atlaskit/calendar';
import './style.scss';

const Calender = ({dark}) => {
  const Footer = () => {
    return (
      <div className="flex gap-5 justify-end pr-[25px] pb-[15px]">
        <span className="cursor-pointer text-[14px] leading-[21px] font-[500] text-[#ADB5BDB2]">
          Cancel
        </span>
        <span className="cursor-pointer text-[14px] leading-[21px] font-[500] text-primary-color">
          Apply
        </span>
      </div>
    );
  };
  const [date, setDate] = useState(new Date());

  return (
    <div className="calender-container rounded-[20px] shadow-lg dark:bg-gray-700 ">
      <Cal
        maxDate={'2023-12-31'}
        onChange={setDate}
        value={date}
        testId={'calendar'}
        selectRange={true}
        className="calender-input border rounded-[20px] dark:bg-gray-700"
      />
      <Footer />
    </div>
  );
};
export default Calender;
