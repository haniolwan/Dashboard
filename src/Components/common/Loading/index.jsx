import { useContext } from "react";
import { LoadingContext } from "../../../context";
import "./style.scss";
const Loading = () => {
  const { loading } = useContext(LoadingContext);
  return (
    loading && (
      <div className="loading-container grid content-center justify-items-center h-[100vh] bg-[#f9fbff]">
        <div className="boxes">
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    )
  );
};
export default Loading;
