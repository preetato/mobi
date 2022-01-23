import axios from "axios";
import React, { ReactElement, ReactPropTypes } from "react";
import UserContext, { GlobalAppState, User } from "./auth/context";
import HomeStack from "./navigators/HomeStack";
import RootStack from "./navigators/RootStack";
import storage from "./utility/storage";
import Constants from "expo-constants";
import { View, Text, Dimensions } from "react-native";
import ModalWrapper from "./components/Modal/ModalWrapper";

export default class App extends React.Component<{}, GlobalAppState> {
  constructor(props) {
    super(props);

    this.state = {
      /**
       * user logged in
       */
      user: null,
      /**
       * set user logged in
       */
      setUser: this.setUser,

      /**
       *
       */
      isReady: false,

      /**
       * Driver Queue
       */
      queue: null,
      /**
       * Sets Driver Queue
       */
      setQueue: this.setQueueId,

      /**
       *  Sets current Process
       */
      setProcess: this.setProcess,
      /**
       * Current Process in DB
       */
      processId: null,
      /**
       *  modalMessage
       */
      setModal: this.setModal,
      /**
       * modal
       */
      modal: undefined,
    };
  }
  setModal = (param: JSX.Element | undefined) => {
    this.setState({
      modal: param,
    });
  };
  setQueueId = (queue) => {
    this.setState({
      queue,
    });
  };
  setProcess = (processId) => {
    this.setState({
      processId: processId,
    });
  };

  setUser = (user) => {
    this.setState({ user });
  };

  componentDidMount() {
    axios.defaults.baseURL = Constants.manifest.extra.backendUrl;
    this.restoreUser();

    // this.setModal("hello world");
  }

  restoreUser = async () => {
    const user = await storage.getUser();
    this.setState({ user: user, isReady: true });
  };

  render() {
    const { user, isReady } = this.state;
    if (!isReady)
      //   if (true)
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            // padding: 25px;
            // padding-top: ${StatusBarHeight + 30}px;
            // background-color: ${Colors.primary};
          }}
        >
          <Text
            style={{
              fontSize: 32,
            }}
          >
            Loading...
          </Text>
        </View>
      );
    return (
      <UserContext.Provider value={this.state}>
        {user ? <HomeStack /> : <RootStack />}

        {this.state.modal && <ModalWrapper>{this.state.modal}</ModalWrapper>}
      </UserContext.Provider>
    );
  }
}

// type AppProps = { backendUrl: string };
// App.defaultProps = {
// type AppProps<T> = T extends ComponentType<infer P> | Component<infer P>
//   ? JSX.LibraryManagedAttributes<T, P>
//   : never;

// App.defaultProps = {
//   backendUrl: Constants.manifest.extra.backendUrl,
// };
