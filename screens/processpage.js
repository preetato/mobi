import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ViewComponent,TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';
 import {StyledContainer,InnerContainer,PageTitle,SubTitle,StyledFormArea,LeftIcon,RightIcon,StyledInputLabel,StyledTextInput,Colors,ButtonText,StyledButton,WelcomeContainer,WelcomeImage,Line,StyledButtonn} from './../components/styles';
const { width, height } = Dimensions.get("window");
const labels = [
"Cart",
  "Delivery Address",
  "Order Summary",
  "Payment Method",
  "Track"
];

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#1a237e',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#1a237e',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#1a237e',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#1a237e',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#1a237e',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#1a237e'
};

export default function processpage() {
  const [currentPosition, setCurrentPosition] = useState(0);
  const nextStep = () => {
      setCurrentPosition(currentPosition + 1);
      
  }
  const data = [
    {
      label: 'Step 1',
      status: 'Waiting for a driver to reply',
      dateTime: new Date(Date.now()).toString(),
    },
    {
      label: 'Step 2',
      status: 'Status',
      dateTime: 'Date/Time',
    },
    {
      label: 'Step 3',
      status: 'Status',
      dateTime: 'Date/Time',
    },
    {
      label: 'Step 4',
      status: 'Status',
      dateTime: 'Date/Time',
    },
    {
      label: 'Step 5',
      status: 'Status',
      dateTime: 'Date/Time',
    },
  ];
 
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.HeaderText}>E-Tulod</Text>
      </View>
      <View style={styles.indicatorContainer}>
         <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          direction="vertical"
          renderLabel={({ position, stepStaus, label, crntPosition}) => {
            return (
          <View style={styles.lblContainer}>
                <Text style={ styles.lblText}>{data[position].label}</Text>
                <Text style={styles.status, {marginTop: 5}}>{data[position].status}</Text>
                <Text style={ styles.status}>{data[position].dateTime}</Text>
          </View>
            )
           }}
        
        />
        <TouchableOpacity style={styles.nextBtn} onPress={() => nextStep()}>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 55,
    padding: 10,
    width: '100%',
    backgroundColor: '#1a237e',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderText: {
    color: '#ff5722',
    fontSize: 22,
    fontWeight: 'bold',
  },
  indicatorContainer: {
    height: height - 170,
    width: width - 30,
    padding: 20,
    paddingTop: 0,
    margin: 15,
    elevation: 10,
    borderRadius: 20,
    backgroundColor: '#ff5722',
  },
  lblContainer: {
    marginTop: 40,
    paddingLeft: 5,
    width: width -100,
  },
  lblText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
  },
  lblText: {
    fontSize: 17,
    color: "#fff",
    fontWeight: 'bold',
  },
  status: {
    fontSize: 15,
    color: 'gray',
  },
  nextBtn: {
    alignSelf: 'flex-end',
  },
  text: {
    color: "#1a237e",
    fontSize: 18,
  },

});
