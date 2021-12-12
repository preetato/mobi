import React, { useState, useEffect, useRef, useCallback } from "react";
import { Text, View } from "react-native";
export default function TimerComponent({
  initialSeconds = 10,
  isStartTimer = false,
  actionOnTimerDone = undefined,
}) {
  const timeoutRef = useRef();
  const [timerSeconds, setTimerSeconds] = useState(initialSeconds);
  const [timerDone, setTimerDone] = useState(false);
  const startTimerFunc = () => {
    timeoutRef.current = setInterval(() => {
      setTimerSeconds((prevState) => {
        if (prevState > 0) {
          return prevState - 1;
        } else {
          clearInterval(timeoutRef.current);

          return prevState;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    console.log("changes to isStartTimer", isStartTimer);
    if (isStartTimer === true) {
      startTimerFunc();
    } else {
      clearTimeout(timeoutRef.current);
    }
  }, [isStartTimer]);

  useEffect(() => {
    if (timerSeconds === 0) {
      setTimerDone(true);
      if (actionOnTimerDone) {
        console.log("actionOnTimerDone");
        actionOnTimerDone();
      }
    }
  }, [timerSeconds]);

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
