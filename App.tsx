import axios from "axios";
import React from "react";
import UserContext from "./auth/context";
import HomeStack from "./navigators/HomeStack";
import RootStack from "./navigators/RootStack";
import storage from "./utility/storage";
import Constants from "expo-constants";
import { View, Text } from "react-native";

export default class App extends React.Component {
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
    };
  }

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
    axios.defaults.baseURL = this.props.backendUrl;
    this.restoreUser();
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
      </UserContext.Provider>
    );
  }
}

/**
 * Functional component
 */
// const App = () =>{
//   const [state, setState] = useState({

//   })
//   return (
//     <UserContext.Provider value={}>

//     </UserContext.Provider>
//   )
// }
App.defaultProps = {
  backendUrl: Constants.manifest.extra.backendUrl,
};
