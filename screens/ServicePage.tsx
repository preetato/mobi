import React, { useContext, useState, useEffect, ChangeEvent } from "react";

//formik
import { Formik } from "formik";

//icons
import { Ionicons } from "@expo/vector-icons";

//faker
import faker from "faker";

import {
  MsgBox,
  PageTitle,
  SubTitle,
  StyledInputLabel,
  Colors,
} from "./../components/styles";
import {
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import UserContext from "../auth/context";
import { getDrivers } from "../api/driversApi";
import { createProcess, Process, CreateProcess } from "../api/queueApi";
// import { CancelButton, ResponseButton } from "./ProcessDriverLookUp";
import type { MsgBoxProps } from "../components/styles";
import ResponseButton from "../components/Buttons/ResponseButton";
import CancelButton from "../components/Buttons/CancelButton";

const { darkLight, brand, primary } = Colors;

const ServicePage = ({ navigation }) => {
  const [message, setMessage] = useState<string | undefined>();
  const [messageType, setMessageType] = useState<
    MsgBoxProps["type"] | undefined
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
          // navigation.navigate("ProcessPage");
          navigation.navigate("ProcessDriverLookUp");
        });
      })
      .catch((err) => {
        if (err?.code === "NO DRIVER") {
          handleNoDriversAlert();
        }
        console.log("Error in getting drivers from servicepage");
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <>
        {/* <StatusBar style="dark" /> */}
        <SafeAreaView />
        {/* <WelcomeImage
          resizeMode="cover"
          source={require("./../assets/img/img3.jpg")}
        /> */}
        <View
          style={{
            marginTop: 16,
            padding: 16,
            paddingTop: 32,
            flex: 1,
            flexDirection: "column",
            maxHeight: Dimensions.get("window").height,
          }}
        >
          <ScrollView
            style={{
              height: Dimensions.get("window").height,
              width: "100%",
            }}
          >
            <View
              style={{
                flex: 1,
                width: "100%",
                alignItems: "flex-start",
                // backgroundColor: "red",
              }}
            >
              <PageTitle>E-Tulod </PageTitle>
              <SubTitle
                style={{
                  color: "black",
                }}
              >
                Transportation Service
              </SubTitle>
            </View>

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
                console.log("values", values);
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
                <View
                  style={{
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      padding: 16,
                      // borderWidth: 1,
                      // borderColor: "#00000030",
                      // borderRadius: 8,
                    }}
                  >
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
                  </View>

                  <View
                    style={{
                      marginTop: 16,
                      padding: 16,
                      // borderWidth: 1,
                      // borderColor: "#00000030",
                      // borderRadius: 8,
                    }}
                  >
                    <MsgBox type={messageType}>{message}</MsgBox>

                    {isSubmitting ? (
                      <ResponseButton disabled={true}>
                        <ActivityIndicator
                          style={{
                            marginVertical: -4,
                          }}
                          size="large"
                          color={primary}
                        />
                      </ResponseButton>
                    ) : (
                      <ResponseButton
                        onPress={() => handleSubmit()}
                        text={"Confirm"}
                      />
                    )}

                    <CancelButton
                      onPress={() => navigation.navigate("Welcome")}
                      style={{
                        backgroundColor: Colors.darkLight,
                      }}
                      text={`Back`}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </>
    </KeyboardAvoidingView>
  );
};

const MyTextInput = ({ label, icon, ...props }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        marginBottom: 16,
      }}
    >
      <StyledInputLabel
        style={{
          color: "#000000AF",
        }}
      >
        {label}
      </StyledInputLabel>

      <View
        style={{
          flexGrow: 1,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: 40,
            bottom: 0,
            top: 0,
            left: 16,
            alignItems: "center",
            // backgroundColor: "red",
            position: "absolute",
          }}
        >
          <Ionicons
            style={{
              left: 0,
            }}
            name={icon}
            size={32}
            color={brand}
          />
        </View>
        <TextInput
          style={{
            fontSize: 24,
            padding: 12,
            borderWidth: 2,
            borderRadius: 4,
            borderColor: Colors.brand,
            paddingLeft: 56,
            flexGrow: 1,
          }}
          {...props}
        />
      </View>
    </View>
  );
};

export default ServicePage;
