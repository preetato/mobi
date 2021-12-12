import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";

import {
  Avatar,
  WelcomeImage,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  StyledButtonn,
  InnerContainer,
  WelcomeContainer,
  ButtonText,
  Line,
  Colors,
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
          <PageTitle welcome={true}>E-Tulod</PageTitle>
          <SubTitle welcome={true}>Welcome!</SubTitle>
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
            <StyledButtonn onPress={() => handleLogout()}>
              <ButtonText>Logout</ButtonText>
            </StyledButtonn>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
