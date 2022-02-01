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
export interface GlobalAppState extends Setters {
  user?: User;

  /**
   *
   */
  isReady?: boolean;

  /**
   * Driver Queue
   */
  queue?: Queue;

  /**
   * Current Process in DB
   */
  processId?: Process;

  // setModal: (parameter: string | false) => void;
  // setModal(param: JSX.Element | (() => JSX.Element)): void;

  modal: JSX.Element;
}
type Setters = {
  /**
   * Sets Driver Queue
   */
  setQueue: (arg: Queue) => void;

  /**
   *  Sets current Process
   */
  setProcess: (arg: Process) => void;
  /**
   * set user logged in
   */
  setUser: (arg: User) => void;
  /**
   * set modal component to render
   */
  setModal: (arg: JSX.Element | undefined) => void;
};
const context: Partial<GlobalAppState> = {};

const UserContext = React.createContext<typeof context>(context);

export default UserContext;
