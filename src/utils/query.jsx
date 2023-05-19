import axios from "axios";

export const query = async (
  path,
  method = "get",
  data = {},
  contentType = "application/json"
) => {
  const token = localStorage.getItem("access_token");

  return axios({
    method,
    url: "https://eulink.awtartec.com" + path,
    data,
    headers: {
      accept: "application/json",
      "Content-Type": contentType,
      Authorization: `Bearer ${token}`,
    },
  });
};
