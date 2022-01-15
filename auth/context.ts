import React from "react";
import { Queue } from "../api/driversApi";
import { Process } from "../api/queueApi";
export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
}
const context:
  | undefined
  | {
      user: User;
      setUser: (param: User) => void;
      isReady: boolean;
      queue: Queue;
      setQueue: (queueId: Queue) => void;
      setProcess: (processId: Process) => void;
      processId: Process;
    } = undefined;
const UserContext = React.createContext<typeof context>(context);

export default UserContext;
