import { Button } from "../../Components/common";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="grid content-center justify-items-center h-[100vh] gap-5">
      <h1 className="text-dark text-xl font-bold">404 Route Not Found</h1>
      <Link to={"/dashboard"}>
        <Button
          label={"Go back home"}
          padding={"py-[1rem] px-[3rem]"}
          bgColor={"bg-[#DF8D6233]"}
          textColor={"text-primary-color"}
          hoverBgColor={"hover:bg-primary-color hover:border-primary-color"}
          hoverTextColor={"hover:text-white"}
        />
      </Link>
    </div>
  );
};

export default NotFound;
