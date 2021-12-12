/**
 * @param bookingId
 */
import axios from "axios";
export const cancelBooking = (queueId) => {
  return axios
    .post("/queue/booking-cancelled", {
      queueId,
    })
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      if (err.response.data.error) {
        throw `cancelBooking Error ${err.response.data.error}`;
      }
      console.error("error cancelling booking", err);

      throw err.message;
    });
};

export const createProcess = ({
  destination,
  location,
  cpnum,
  NoOfPassengers,
  user,
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
      return res.data;
    })
    .catch((err) => {
      console.error("error changing process", err.message);
      throw err.message;
    });
};

export const rejectBooking = (queueId) => {
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
export const createBooking = (processId) => {
  console.log("createBookingApi sent with processId", processId);
  return axios
    .post("/queue/booking", {
      processId,
    })
    .then((res) => {
      /**
       * returns driver object
       */
      return res.data.driver;
    })
    .catch((err) => {
      console.error("error queueing booking", err.message);
      throw err.message;
    });
};
