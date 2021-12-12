import axios from "axios";
import React from "react";
import UserContext from "./auth/context";
import HomeStack from "./navigators/HomeStack";
import RootStack from "./navigators/RootStack";
import storage from "./utility/storage";
import Constants from "expo-constants";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      setUser: this.setUser,
      isReady: false,
      queue: null,
      setQueue: this.setQueueId,
      setProcess: this.setProcess,
      processId: null,
    };
  }

  setQueueId = (queueId) => {
    this.setState({
      queueId,
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
    axios.defaults.baseURL = this.props.backendUrl;
    this.restoreUser();
  }

  restoreUser = async () => {
    const user = await storage.getUser();
    this.setState({ user: user, isReady: true });
  };

  render() {
    const { user, isReady } = this.state;
    if (!isReady) return null;
    return (
      <UserContext.Provider value={this.state}>
        {user ? <HomeStack /> : <RootStack />}
      </UserContext.Provider>
    );
  }
}

App.defaultProps = {
  backendUrl: Constants.manifest.extra.backendUrl,
};
