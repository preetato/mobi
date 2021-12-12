import React, { useState, useEffect, useRef, useCallback } from "react";
import { Text, View } from "react-native";
export default function TimerComponent({
  initialSeconds = 10,
  isStartTimer = false,
}) {
  const timeoutRef = useRef();
  const [timerSeconds, setTimerSeconds] = useState(initialSeconds);
  const [timerDone, setTimerDone] = useState(false);
  const startTimerFunc = () => {
    timeoutRef.current = setInterval(() => {
      //   if (timerSeconds > 0) {
      //     setTimerSeconds((prevState) => {
      //       return prevState > 0 && prevState - 1;
      //     });
      //   } else {
      //     console.log("clearing tim");
      //     clearTimeout(timeoutRef.current);
      //   }
      //   console.log(
      //     "timerSeconds",
      //     timerSeconds,
      //     "timerSecondsisGreaterThan0",
      //     timerSeconds > 0
      //   );
      //   if (timerSeconds > 0) {
      //     setTimerSeconds((prevState) => prevState - 1);
      //   } else {
      //     clearInterval(timeoutRef.current);
      //   }
    }, 1000);
  };

  useEffect(() => {
    // console.log("timerSecondsState", timerSeconds);
  }, [timerSeconds]);
  useEffect(() => {
    if (isStartTimer === true) {
      startTimerFunc();
    } else {
      clearTimeout(timeoutRef.current);
    }
  }, [isStartTimer]);
  if (timerDone) {
    return (
      <Text
        style={{
          fontSize: 16,
          fontWeight: "400",
        }}
      >
        Looking for another Driver...
      </Text>
    );
  }
  return (
    <>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "400",
        }}
      >
        Waiting for driver to Respond:
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            // flex: 1,
            fontWeight: "700",
            fontSize: 32,
          }}
        >
          {timerSeconds}
        </Text>
        <Text
          style={{
            marginLeft: 8,
          }}
        >
          Seconds Remaining
        </Text>
      </View>
    </>
  );
}
