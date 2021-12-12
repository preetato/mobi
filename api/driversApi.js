import axios from "axios";
export const getDrivers = () => {
  return axios
    .get("/driver")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
};
