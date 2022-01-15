import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

//formik
import { Formik } from "formik";

//icons
import { Octicons, Ionicons } from "@expo/vector-icons";

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
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
  MsgBox,
  Line,
} from "./../components/styles";
import { View, ActivityIndicator } from "react-native";

//colors
const { darkLight, brand, primary } = Colors;

//keyboard
import KeyboardAvoidingWrapper from "./../components/KeyboardAvoidingWrapper";
// api cli
import axios from "axios";
import UserContext, { User } from "../auth/context";
import storage from "../utility/storage";
const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const context = useContext(UserContext);

  const handleLogin = (
    credentials: {
      email: string;
      password: string;
    },
    setSubmitting
  ) => {
    handleMessage(null);

    axios
      .post("/user/signin", credentials)
      .then((response) => {
        const result = response.data;
        const {
          status,
          message,
          data,
        }: {
          status: string;
          message: string;
          data: User[];
        } = result;

        if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else {
          context.setUser(data[0]);
          storage.storeUser(data[0]);
          //navigation.navigate('Welcome', { ...data[0] });
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error.toJSON());
        setSubmitting(false);
        handleMessage("An error occurred. Check your network and try again");
      });
  };
  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

  useEffect(() => {
    console.log(axios.defaults);
  }, []);
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo
            resizeMode="cover"
            source={require("./../assets/img/tricycle.png")}
          />
          <PageTitle>E-Tulod</PageTitle>
          <SubTitle>Account Login</SubTitle>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email == "" || values.password == "") {
                handleMessage("Please fill all the empty fields!");
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
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
                  label="Email Address"
                  icon="mail"
                  placeholder="email@email.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />

                <MyTextInput
                  label="Password"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  icon="lock"
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

                <Line />
                <StyledButton onPress={() => navigation.navigate("Signup")}>
                  <ButtonText>Register</ButtonText>
                </StyledButton>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}: {
  isPassword?: string;
  label?: string;
  icon?: string;
  hidePassword?: string;
  setHidePassword?: string;
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
