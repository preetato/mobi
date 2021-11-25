import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

//formik
import { Formik } from 'formik';

//icons
import {  Ionicons } from '@expo/vector-icons';

import {StyledContainer, MsgBox, InnerContainer,PageTitle,SubTitle,StyledFormArea,LeftIcon,RightIcon,StyledInputLabel,StyledTextInput,Colors,ButtonText,StyledButton,WelcomeContainer,WelcomeImage,Line,StyledButtonn} from './../components/styles';
import { View, ScrollView, ActivityIndicator } from 'react-native';

//colors
const { darkLight, brand, primary } = Colors;
import axios from 'axios';

const ServicePage = ({navigation}) => {

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleConfirm = (values, setSubmitting) => {
        handleMessage(null);

        let payload = {
            "destination": values.destination,
            "location": values.currentLocation,
            "cpnum": values.ContactNo,
            "NoOfPassengers": values.noOfPassengers,
        }

        const url = 'https://tranquil-wildwood-09279.herokuapp.com/process';
        axios
          .post(url, payload)
          .then((response) => {
            
            const { status } = response;

            if (status == 200) {
                setSubmitting(false);
                navigation.navigate("processpage");
            }
            else
            {
                handleMessage('Error while submitting');
            }
          })
          .catch((error) => {
            console.log(error.toJSON());
            setSubmitting(false);
            handleMessage('An error occurred. Check your network and try again');
          });
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
      };
    

    return(
        <>
            <StatusBar style="dark" />
            <InnerContainer>
                <WelcomeImage resizeMode="cover" source={require('./../assets/img/img3.jpg')}/>
                <ScrollView style={{width: '100%'}}>

                    <WelcomeContainer>

                    <PageTitle>E-Tulod</PageTitle>
                    <SubTitle>Transportation Service</SubTitle>

                    <Formik
                    initialValues={{ currentLocation: '', destination: '', ContactNo: ''}}
                    onSubmit={(values, {setSubmitting}) => 
                    {
                        if (values.currentLocation == '' || values.destination == '' || values.ContactNo == '' || values.noOfPassengers == '' ) {
                            handleMessage("Please fill all the empty fields!");
                            setSubmitting(false);
                           } else {
                                handleConfirm(values, setSubmitting);
                           }
                    }} 
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                        <StyledFormArea>
                            <MyTextInput
                                label="Current Location"
                                icon="location-sharp"
                                placeholder="Current Location"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('currentLocation')}
                                onBlur={handleBlur('currentLocation')}
                                value={values.currentLocation}
                            />

                            <MyTextInput
                                label="Destination"
                                icon="location-outline"
                                placeholder="Destination"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('destination')}
                                onBlur={handleBlur('destination')}
                                value={values.destination}
                            />

                            <MyTextInput
                                label="Contact Number"
                                icon="ios-phone-portrait-outline"
                                placeholder="09281940205"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('ContactNo')}
                                onBlur={handleBlur('ContactNo')}
                                keyboardType='number-pad'
                                value={values.ContactNo}
                            />
                        
                        <MyTextInput
                                label="Number of Passengers"
                                icon="people-outline"
                                placeholder="Number of Passengers"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('noOfPassengers')}
                                onBlur={handleBlur('noOfPassengers')}
                                keyboardType='numeric'
                                value={values.noOfPassengers}
                            />

                            <MsgBox type={messageType}>{message}</MsgBox>

                            {!isSubmitting && (
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>
                                    Confirm
                                </ButtonText>
                            </StyledButton>
                            )}

                            {isSubmitting && (
                                <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </StyledButton>
                            )}

                            <Line />
                            <StyledButtonn onPress={() => navigation.navigate("Welcome")}>
                                <ButtonText>
                                    Back
                                </ButtonText>
                            </StyledButtonn>
                        </StyledFormArea>
                        )}
                    </Formik>
                    </WelcomeContainer>
                </ScrollView>
            </InnerContainer>
        </>
    );
};

const MyTextInput = ({label, icon, ...props }) => {
    return (
    <View>
        <LeftIcon>
            <Ionicons name={icon} size={30} color={brand} />
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props} />  
    </View>);
};

export default ServicePage;