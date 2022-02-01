import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TimerComponent from "../components/TimerComponent";
import UserContext from "../auth/context";
import { cancelBooking, createBooking, rejectBooking } from "../api/queueApi";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ButtonText, Colors, Line, StyledButton } from "../components/styles";
import { GenericTouchableProps } from "react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable";
import ModalContentTemplate from "../components/Modal/ModalContentTemplate";
import ModalBookingCancelled from "../components/Modal/Templates/ModalBookingCancelled";
import ModalNoDriversAvailableModal from "../components/Modal/Templates/ModalNoDriversAvailable";
import ResponseButton from "../components/Buttons/ResponseButton";
import CancelButton from "../components/Buttons/CancelButton";
import ModalTimerDoneRejectBookingWarningModal from "../components/Modal/Templates/ModalTimerDoneRejectBookingWarningModal";

const FadingRepeatedAnimatedEffect = ({
  children,
  interval,
}: {
  interval?: number;
  children: JSX.Element;
}) => {
  const [fromValue, setFromValue] = useState(0);
  const fadeAnim = useMemo(() => new Animated.Value(fromValue), [fromValue]);

  //   const fadeAnim = useRef(new Animated.Value(0)).current;
  const [chaseValue, setChaseValue] = useState(1);
  const [duration, setDuration] = useState(interval || 500);

  const flipChase = () => {
    setChaseValue((prevState) => (prevState === 0 ? 1 : 0));
    setFromValue((prevState) => (prevState === 0 ? 1 : 0));
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: chaseValue,
      duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, chaseValue]);

  useEffect(() => {
    const timer = setInterval(() => {
      flipChase();
    }, duration);

    return () => {
      clearInterval(timer);
    };
  }, []);
  //   console.log(opacity);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
};
const useActionOnDeviceBack = ({
  navigation,
  action,
  cleanupFn,
}: {
  navigation: StackNavigationProp<any, any>;
  action: (...params: any) => any;
  cleanupFn?: (...params: any) => any;
}) => {
  const [backPressed, setIsBackPressed] = useState<boolean>(false);
  useEffect(() => {
    navigation.addListener("beforeRemove", () => {
      setIsBackPressed(true);
      action();
    });
    return () => {
      setIsBackPressed(false);
      navigation.removeListener("beforeRemove", () => {
        if (cleanupFn) {
          cleanupFn();
        }
      });
    };
  });
  return backPressed;
};

const ProcessDriverLookUp = ({
  navigation,
}: {
  navigation: StackNavigationProp<any, any>;
}) => {
  const [responseButtonHidden, setResponseButtonHidden] =
    useState<boolean>(false);
  const { processId, setProcess, queue, setQueue, setModal } =
    useContext(UserContext);
  const [timerStart, setTimerStart] = useState<string>(Date.now().toString());
  const triggerTimerStart = () => {
    setTimerSeconds(10);
    setTimerStart(Date.now().toString());
  };
  const [timerSeconds, setTimerSeconds] = useState<number>(10);
  const [timerStop, setTimerStop] = useState(false);

  /**
   * Add listener with action and cleanUpFunction
   */
  useActionOnDeviceBack({
    action: () => {
      cancelBooking(queue._id, processId._id).then(() => {
        /**
         * set modal open notifying that booking has been cancelled
         */

        setProcess(null);
        setModal(
          <ModalBookingCancelled
            onClose={() => {
              setModal(undefined);
            }}
          />
        );
      });
    },
    navigation,
    cleanupFn: () => {
      // if (processId && queue) {
      //   cancelBooking(queue._id, processId._id).then(() => {
      //     setProcess(null);
      //   });
      // }
    },
  });

  useEffect(() => {
    if (processId) {
      createBooking(processId._id)
        .then((queue) => {
          /**
           * set driver atm
           */
          setQueue(queue);
          /**
           * start timer before moving to another driver
           */
          triggerTimerStart();
        })
        .catch((err) => {
          console.log(
            "Error on Creation of booking in ProcessDriverLookup useEffect of processId"
          );
          console.log(err);
          console.log("setting modal");
        });
    }
  }, [processId]);

  const actionOnTimerDone = () => {
    /**
     * hide ResponseButton
     */
    setResponseButtonHidden(true);
    /**
     * Reject the existing booking
     */
    if (processId && queue) {
      rejectBooking(queue._id, processId._id).then((message) => {
        console.log("rejectBooking response", message);
      });
    }

    setModal(
      <ModalTimerDoneRejectBookingWarningModal
        onClose={() => {
          // console.log("onClose triggered");
          // setModal()
          setModal(undefined);
        }}
        cancelBookingFn={() => {
          navigation.navigate("ServicePage");
          setModal(
            <ModalBookingCancelled
              onClose={() => {
                setModal(undefined);
              }}
            />
          );
        }}
        bookAnotherFn={() => {
          createBooking(processId._id)
            .then((res) => {
              setQueue(res);
              triggerTimerStart();
              setModal(undefined);
              setResponseButtonHidden(false);
            })
            .catch((err) => {
              setModal(
                <ModalNoDriversAvailableModal
                  onClose={() => {
                    navigation.navigate("ServicePage");
                    setModal(undefined);
                  }}
                />
              );
            });
        }}
      />
    );
  };

  return (
    <>
      <SafeAreaView />
      <View style={styles.rootContainer}>
        <Text
          style={[
            styles.mainText,
            {
              color: Colors.brand,
            },
          ]}
        >
          Looking for Drivers
        </Text>

        <Text style={styles.secondaryText}>
          Please wait for a driver to send you a text message
        </Text>
        {/* <Line /> */}
        <FadingRepeatedAnimatedEffect>
          {!timerStop && (
            <TimerComponent
              hiddenText
              actionOnTimerDone={actionOnTimerDone}
              initialSeconds={timerSeconds}
              timerStart={timerStart}
              text={`Time's up!`}
              setTimerSecondProps={setTimerSeconds}
            />
          )}
        </FadingRepeatedAnimatedEffect>
        <View></View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-end",

            // alignItems: "center",
            // marginTop: "50%",
          }}
        >
          <ResponseButton
            onPress={() => {
              /**
               * next phase
               */
              setTimerStop(true);
              setResponseButtonHidden(true);
            }}
            style={{
              display: responseButtonHidden ? "none" : undefined,
            }}
            text="Driver Responded"
            // hidden={responseButtonHidden}
          />

          <CancelButton
            onPress={() => {
              /**
               * set modal open notifying that booking has been cancelled
               */
              navigation.navigate("ServicePage");
              setModal(
                <ModalBookingCancelled
                  onClose={() => {
                    setModal(undefined);
                  }}
                />
              );
            }}
          />
        </View>
      </View>
      <SafeAreaView />
    </>
  );
};

const styles = StyleSheet.create({
  mainText: {
    fontSize: 40,
    fontWeight: "800",
  },
  secondaryText: {
    fontSize: 24,
  },
  normalText: {
    fontSize: 18,
  },
  rootContainer: {
    marginTop: 16,
    padding: 16,
    paddingTop: 32,
    flex: 1,
    flexDirection: "column",
  },
  buttonPrimary: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: Colors.brand,
  },
});

export default ProcessDriverLookUp;
