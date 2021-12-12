import React, { useContext, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

//formik
import { Formik } from "formik";

//icons
import { Ionicons } from "@expo/vector-icons";

//faker
import faker from "faker";

import {
  StyledContainer,
  MsgBox,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  RightIcon,
  StyledInputLabel,
  StyledTextInput,
  Colors,
  ButtonText,
  StyledButton,
  WelcomeContainer,
  WelcomeImage,
  Line,
  StyledButtonn,
} from "./../components/styles";
import { View, ScrollView, ActivityIndicator } from "react-native";

//keyboard
import KeyboardAvoidingWrapper from "./../components/KeyboardAvoidingWrapper";
//colors
const { darkLight, brand, primary } = Colors;
import axios from "axios";
import UserContext from "../auth/context";
import { getDrivers } from "../api/driversApi";
import { createProcess } from "../api/queueApi";

const ServicePage = ({ navigation }) => {
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const { user, setProcess } = useContext(UserContext);

  const handleConfirm = (values, setSubmitting) => {
    handleMessage(undefined);

    let payload = {
      destination: values.destination,
      location: values.currentLocation,
      cpnum: values.ContactNo,
      NoOfPassengers: values.noOfPassengers,
      user: user._id,
    };
    const { destination, location, cpnum, NoOfPassengers } = payload;

    /**
     * Check first if there are drivers
     *
     */
    console.log("Fetching Drivers");
    getDrivers()
      .then((drivers) => {
        if (drivers.length < 1) {
          setMessage("No drivers available");
          setMessageType(`ERROR`);
          setSubmitting(false);
          throw new Error("There are no available drivers");
        }
        return createProcess({
          destination,
          location,
          cpnum,
          NoOfPassengers,
          user,
        });
      })
      .then((createProcessResponse) => {
        setProcess(createProcessResponse);
        console.log("Drivers are avialable, done creating process");

        setSubmitting(false);
        navigation.navigate("ProcessPage");
        // console.log(createProcessResponse);
      })
      .catch((err) => {
        console.log("Error in gettign drivers from servicepage");
        console.log(err);
      });

    /**
     * Create process first
     * Driver -> Queue
     *
     */

    // axios
    //   .post("/process", payload)
    //   .then((response) => {
    //     const { _id } = response.data;
    //     const { status } = response;

    //     setProcess({
    //       destination,
    //       location,
    //       cpnum,
    //       NoOfPassengers,
    //       _id,
    //     });

    //     if (status == 200) {
    //       setSubmitting(false);
    //       navigation.navigate("ProcessPage");
    //     } else {
    //       handleMessage("Error while submitting");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // console.log(err?.response?.data || err.request);
    //     // console.log(error.toJSON());1
    //     setSubmitting(false);
    //     handleMessage("An error occurred. Check your network and try again");
    //   });
  };

  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <KeyboardAvoidingWrapper>
      <>
        <StatusBar style="dark" />
        <InnerContainer>
          <WelcomeImage
            resizeMode="cover"
            source={require("./../assets/img/img3.jpg")}
          />
          <ScrollView style={{ width: "100%" }}>
            <WelcomeContainer>
              <PageTitle>E-Tulod</PageTitle>
              <SubTitle>Transportation Service</SubTitle>

              <Formik
                initialValues={{
                  // currentLocation: "",
                  // destination: "",
                  // ContactNo: "",
                  // noOfPassengers: "",
                  currentLocation: faker.address.country(),
                  destination: faker.address.country(),
                  ContactNo: "09498460475",
                  noOfPassengers: Math.floor(Math.random() * 10).toString(),
                }}
                onSubmit={(values, { setSubmitting }) => {
                  if (
                    values.currentLocation == "" ||
                    values.destination == "" ||
                    values.ContactNo == "" ||
                    values.noOfPassengers == ""
                  ) {
                    handleMessage("Please fill all the empty fields!");
                    setSubmitting(false);
                  } else {
                    handleConfirm(values, setSubmitting);
                  }
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  isSubmitting,
                }) => (
                  <StyledFormArea>
                    <MyTextInput
                      label="Current Location"
                      icon="location-sharp"
                      placeholder="Current Location"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("currentLocation")}
                      onBlur={handleBlur("currentLocation")}
                      value={values.currentLocation}
                    />

                    <MyTextInput
                      label="Destination"
                      icon="location-outline"
                      placeholder="Destination"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("destination")}
                      onBlur={handleBlur("destination")}
                      value={values.destination}
                    />

                    <MyTextInput
                      label="Contact Number"
                      icon="ios-phone-portrait-outline"
                      placeholder="09281940205"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("ContactNo")}
                      onBlur={handleBlur("ContactNo")}
                      keyboardType="number-pad"
                      value={values.ContactNo}
                    />

                    <MyTextInput
                      label="Number of Passengers"
                      icon="people-outline"
                      placeholder="Number of Passengers"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("noOfPassengers")}
                      onBlur={handleBlur("noOfPassengers")}
                      keyboardType="numeric"
                      value={values.noOfPassengers}
                    />

                    <MsgBox type={messageType}>{message}</MsgBox>

                    {!isSubmitting && (
                      <StyledButton onPress={handleSubmit}>
                        <ButtonText>Confirm</ButtonText>
                      </StyledButton>
                    )}

                    {isSubmitting && (
                      <StyledButton disabled={true}>
                        <ActivityIndicator size="large" color={primary} />
                      </StyledButton>
                    )}

                    <Line />
                    <StyledButton
                      onPress={() => navigation.navigate("Welcome")}
                    >
                      <ButtonText>Back</ButtonText>
                    </StyledButton>
                  </StyledFormArea>
                )}
              </Formik>
            </WelcomeContainer>
          </ScrollView>
        </InnerContainer>
      </>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ label, icon, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Ionicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
    </View>
  );
};

export default ServicePage;
