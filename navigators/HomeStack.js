//React Navigations
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Colors } from "../components/styles";
//My screens
import Welcome from "../screens/Welcome";
import FareMatrix from "./../screens/FareMatrix";
import ServicePage from "../screens/ServicePage";
import ProcessPage from "../screens/ProcessPage";

const { primary, tertiary } = Colors;
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTintColor: tertiary,
          headerTransparent: true,
          headerTitle: "",
          headerLeftContainerStyle: {
            paddingleft: 20,
          },
        }}
        initialRouteName="Welcome"
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="FareMatrix" component={FareMatrix} />
        <Stack.Screen name="ServicePage" component={ServicePage} />
        <Stack.Screen name="ProcessPage" component={ProcessPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default HomeStack;
