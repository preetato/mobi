import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import {
  Avatar,
  WelcomeImage,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  InnerContainer,
  WelcomeContainer,
  ButtonText,
  Line,
  Colors,
  textStyles,
} from "./../components/styles";
import storage from "../utility/storage";
import UserContext from "../auth/context";

const Welcome = ({ navigation }) => {
  const context = useContext(UserContext);

  const handleLogout = async () => {
    context.setUser(null);
    await storage.removeUser();
  };

  return (
    <>
      <StatusBar style="dark" />
      <InnerContainer>
        <WelcomeImage
          resizeMode="cover"
          source={require("./../assets/img/img3.jpg")}
        />
        <WelcomeContainer>
          <SubTitle
            style={{
              marginBottom: -16,
            }}
            welcome={true}
          >
            Welcome to
          </SubTitle>
          <PageTitle>E-Tulod</PageTitle>

          {/* <Text></Text> */}
          <StyledFormArea>
            <Avatar
              resizeMode="cover"
              source={require("./../assets/img/tricycle.png")}
            />

            <StyledButton onPress={() => navigation.navigate("ServicePage")}>
              <ButtonText>Proceed</ButtonText>
            </StyledButton>
            <StyledButton onPress={() => navigation.navigate("FareMatrix")}>
              <ButtonText>Fare Rate</ButtonText>
            </StyledButton>
            <Line />
            <StyledButton secondary onPress={() => handleLogout()}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
