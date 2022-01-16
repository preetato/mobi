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
} from "./../components/styles";
import {
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
} from "react-native";
import KeyboardAvoidingWrapper from "./../components/KeyboardAvoidingWrapper";
import axios from "axios";
import UserContext from "../auth/context";
import { getDrivers } from "../api/driversApi";
import { createProcess, Process, CreateProcess } from "../api/queueApi";

const { darkLight, brand, primary } = Colors;

const ServicePage = ({ navigation }) => {
  const [message, setMessage] = useState<string | undefined>();
  const [messageType, setMessageType] = useState<
    "SUCCESS | FAILED" | "ERROR" | undefined
  >();
  const { user, setProcess, queue } = useContext(UserContext);

  const handleNoDriversAlert = () => {
    Alert.alert("We're Sorry", "We have no drivers at the moment", [
      {
        text: "OK",
        onPress: () => console.log("OK Pressed"),
      },
    ]);
  };
  const handleConfirm = (values, setSubmitting) => {
    handleMessage();

    let payload: CreateProcess = {
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
    getDrivers()
      .then((drivers) => {
        if (drivers.length < 1) {
          setMessage("No drivers available, Please try again in a few minutes");
          setMessageType(`ERROR`);
          setSubmitting(false);
          throw {
            code: "NO DRIVER",
          };
        }
        return createProcess({
          destination,
          location,
          cpnum,
          NoOfPassengers,
          user: user._id,
        }).then((createProcessResponse) => {
          setProcess(createProcessResponse);
          setSubmitting(false);
          navigation.navigate("ProcessPage");
        });
      })
      .catch((err) => {
        if (err?.code === "NO DRIVER") {
          handleNoDriversAlert();
        }
        console.log("Error in getdtign drivers from servicepage");
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setMessage(undefined);
        }, 10000);
      });
  };
  // useEffect(() => {
  //   console.log("value of queue from service page", queue);
  // }, [queue]);

  const handleMessage = (message?, type?) => {
    if (!type) {
      type = "FAILED";
    }
    setMessage(message);
    setMessageType(type);
  };

  return (
    <KeyboardAvoidingWrapper>
      <>
        <StatusBar style="dark" />
        <WelcomeImage
          resizeMode="cover"
          source={require("./../assets/img/img3.jpg")}
        />
        <InnerContainer>
          <ScrollView
            style={{
              height: Dimensions.get("window").height,
              width: "100%",
            }}
          >
            <WelcomeContainer>
              <PageTitle>E-Tulod </PageTitle>
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
