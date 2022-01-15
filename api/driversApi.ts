import axios from "axios";

export interface Driver {
  _id: string;
  drivername: string;
  driveraddress: string;
  platenumber: string;
  drivercpnum: string;
  ordernumber: number;
}

export type Queue = Driver;

export const getDrivers = () => {
  return axios
    .get("/driver")
    .then((responseFromServer: { data: Driver[] }) => {
      return responseFromServer.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
};
