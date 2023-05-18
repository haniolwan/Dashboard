import axios from "axios";

export const query = async (
  path,
  method = "get",
  data = {},
  contentType = "application/json"
) => {
  const token = localStorage.getItem("access_token");
  let config = {
    baseURL: process.env.REACT_APP_URL,
  };
  // if (process.env.NODE_ENV !== "development") {
  //   config = {
  //     baseURL: process.env.REACT_APP_URL,
  //   };
  // }

  return axios({
    method,
    url: path,
    data,
    headers: {
      accept: "application/json",
      "Content-Type": contentType,
      Authorization: `Bearer ${token}`,
    },
    ...config,
  });
};
