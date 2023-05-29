import { useContext, useEffect } from "react";
import { LoadingContext } from "../../context";

const NotFound = () => {
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return <div>Hello</div>;
};

export default NotFound;
