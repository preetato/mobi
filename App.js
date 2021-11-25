import React from "react";
import UserContext from "./auth/context";
import HomeStack from "./navigators/HomeStack";
import RootStack from "./navigators/RootStack";
import storage from "./utility/storage";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      setUser: this.setUser,
      isReady: false,
    };
  }

  setUser = (user) => {
    this.setState({ user });
  };

  componentDidMount() {
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
