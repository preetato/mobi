import axios from "axios";
import { User } from "../auth/context";
import { Driver } from "./driversApi";
export interface Process {
  _id: string;
  destination: string;
  location: string;
  cpnum: number;
  NoOfPassengers: string;
  status: "ONGOING" | "COMPLETE" | "CANCELLED" | "REJECTED";
  created_at: Date;
  updated_at: Date;
}
export const cancelBooking = (queueId: string) => {
  return axios
    .post("/queue/booking-cancelled", {
      queueId,
    })
    .then(
      (res: {
        data: {
          message: string;
        };
      }) => {
        return res.data.message;
      }
    )
    .catch((err) => {
      if (err.response.data.error) {
        throw `cancelBooking Error ${err.response.data.error}`;
      }
      console.error("error cancelling booking", err);

      throw err.message;
    });
};

export interface CreateProcess {
  destination: string;
  location: string;
  cpnum: string;
  NoOfPassengers: string;
  user: User["_id"];
}
export const createProcess = ({
  destination,
  location,
  cpnum,
  NoOfPassengers,
  user,
}: {
  destination: string;
  location: string;
  cpnum: string;
  NoOfPassengers: string;
  user: string;
}) => {
  return axios
    .post("/process", {
      destination,
      location,
      cpnum,
      NoOfPassengers,
      user,
    })
    .then((res) => {
      return res.data as Process;
    })
    .catch((err) => {
      console.error("error changing process", err.message);
      throw err.message;
    });
};

export const rejectBooking = (
  queueId: string
): Promise<{
  message: string;
}> => {
  return axios
    .post("/queue/booking-rejected", {
      queueId,
    })
    .then((res) => {
      console.log("res");
      return res.data;
    })
    .catch((err) => {
      if (err.response.data.error) {
        throw `Error rejectBooking ${err.response.data.error}`;
      }
      console.error("error rejecting booking", err);
      throw err.message;
    });
};

/**
 * @param processId
 */

export const createBooking = (processId: string): Promise<Driver> => {
  console.log("createBookingApi sent with processId", processId);
  return axios
    .post("/queue/booking", {
      processId,
    })
    .then((res) => {
      /**
       * returns driver object
       */

      // return (res.data).driver;
      return res.data.driver as Driver;
    })
    .catch((err) => {
      console.error("error queueing booking", err.message);
      console.log(err?.response?.data);
      throw err.message;
    });
};
