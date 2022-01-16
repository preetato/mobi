import { StatusBar } from "expo-status-bar";
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  Props,
  useCallback,
  useMemo,
} from "react";

import * as Random from "expo-random";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ViewComponent,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import StepIndicator from "react-native-step-indicator";
import {
  StyledContainer,
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
} from "../components/styles";
import UserContext from "../auth/context";
import { rejectBooking, cancelBooking, createBooking } from "../api/queueApi";
import TimerComponent from "../components/TimerComponent";
const { width, height } = Dimensions.get("window");
const labels = [
  "Cart",
  "Delivery Address",
  "Order Summary",
  "Payment Method",
  "Track",
];
import { StackNavigationProp } from "@react-navigation/stack";
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#1a237e",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#1a237e",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#1a237e",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#1a237e",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#1a237e",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#1a237e",
};

export default function ProcessPage({
  navigation,
}: {
  navigation: StackNavigationProp<any, any>;
}) {
  // const timeofMount = Date.now();
  const [currentPosition, setCurrentPosition] = useState(0);
  const [disableNextButton, setDisableNextButton] = useState(false);
  const nextStep = () => {
    setCurrentPosition(currentPosition + 1);
  };
  const [isStartTimer, setIsStartTimer] = useState<number>(Date.now());
  const { processId, setProcess, queue, setQueue } = useContext(UserContext);
  const [isBackPressed, setIsBackPressed] = useState<boolean>(false);
  useEffect(() => {
    navigation.addListener("beforeRemove", () => {
      setIsBackPressed(true);
    });
    return () => {
      navigation.removeListener("beforeRemove", () => {
        console.log("beforeRemove navigation removed");
      });
    };
  }, []);

  useEffect(() => {
    /**
     * create booking
     *
     */
    if (processId) {
      createBooking(processId._id)
        .then((response) => {
          setQueue(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [processId]);

  /**
   * Cancel booking on cleanup
   */
  useEffect(() => {
    if (queue && isBackPressed) {
      return () => {
        cancelBooking(queue._id, processId._id)
          .then((res) => {
            Alert.alert("Booking Cancelled", "Driver Booking is Cancelled", [
              {
                style: "default",
                text: "OK",
              },
            ]);
          })
          .catch((err) => {
            console.log("Error in cancelBooking");
            console.log(err);
          })
          .finally(() => {
            setQueue(undefined);
            return;
          });
      };
    }
  }, [queue, isBackPressed, processId]);

  const actionOnTimerDone = useCallback(() => {
    rejectBooking(queue._id, processId._id)
      .then((res) => {
        return createBooking(processId._id)
          .then((newDriver) => {
            setQueue(newDriver);
          })
          .then(() => {
            setIsStartTimer(Date.now());
          });
      })
      .catch((err) => {
        console.log("Error on rejectBooking, actionOnTimerDone");
        console.error(err);
      });
  }, [queue, processId]);

  useEffect(() => {
    if (currentPosition === 0) {
      setIsStartTimer(Date.now());
    }
  }, [currentPosition]);

  const data = [
    {
      label: "Step 1",
      status: "Waiting for a driver to reply",
      dateTime: new Date(Date.now()).toString(),
    },
    {
      label: "Step 2",
      status: "Status",
      dateTime: "Date/Time",
    },
    {
      label: "Step 3",
      status: "Status",
      dateTime: "Date/Time",
    },
    {
      label: "Step 4",
      status: "Status",
      dateTime: "Date/Time",
    },
    {
      label: "Step 5",
      status: "Status",
      dateTime: "Date/Time",
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
          renderLabel={({ position, label }) => {
            return (
              <View style={styles.lblContainer}>
                <Text style={styles.lblText}>{data[position].label}</Text>
                <Text style={(styles.status, { marginTop: 5 })}>
                  {data[position].status}
                </Text>
                <Text style={styles.status}>{data[position].dateTime}</Text>

                {position === 0 && (
                  <View
                    style={{
                      marginTop: 16,
                    }}
                  >
                    <TimerComponent
                      initialSeconds={3}
                      isStartTimer={isStartTimer}
                      actionOnTimerDone={actionOnTimerDone}
                    />
                  </View>
                )}
              </View>
            );
          }}
        />
        <TouchableOpacity
          disabled={disableNextButton}
          style={styles.nextBtn}
          onPress={() => nextStep()}
        >
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
    // flex: 1,
    // backgroundColor: "#fff",
  },
  header: {
    height: 55,
    padding: 10,
    width: "100%",
    backgroundColor: "#1a237e",
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  HeaderText: {
    color: "#ff5722",
    fontSize: 22,
    fontWeight: "bold",
  },
  indicatorContainer: {
    // height: height - 170,
    // width: width - 30,
    // padding: 20,
    // paddingTop: 0,
    // margin: 15,
    // elevation: 15,
    // borderRadius: 20,
    flex: 1,
    padding: 16,
    margin: 16,
    borderRadius: 16,
    backgroundColor: "#ff5722",
  },
  lblContainer: {
    marginTop: 40,
    paddingLeft: 5,
    width: width - 100,
  },
  lblText: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "bold",
  },
  // lblText: {
  //   fontSize: 17,
  //   color: "#fff",
  //   fontWeight: "bold",
  // },
  status: {
    fontSize: 15,
    color: "white",
    opacity: 0.8,
    // color: "gray",
  },
  nextBtn: {
    alignSelf: "flex-end",
  },
  text: {
    color: "#1a237e",
    fontSize: 18,
  },
});
