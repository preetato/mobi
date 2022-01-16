import React, { useState, useEffect, useRef, useCallback } from "react";
import { Text, View } from "react-native";
export default function TimerComponent({
  initialSeconds = 10,
  isStartTimer: isStartTimerProps,
  actionOnTimerDone = undefined,
}) {
  const timeoutRef = useRef<undefined | ReturnType<typeof setInterval>>();
  const [isStartTimer, setIsStartTimer] = useState<boolean>(isStartTimerProps);
  const [timerSeconds, setTimerSeconds] = useState(initialSeconds);

  const startTimerFunc = () => {
    setTimerSeconds(initialSeconds);
    timeoutRef.current = setInterval(() => {
      setTimerSeconds((prevState) => {
        if (prevState > 0) {
          return prevState - 1;
        } else {
          clearInterval(timeoutRef.current);
        }
      });
    }, 1000);
  };

  // useEffect(() => {
  //   console.log("changes to isStartTimer", isStartTimer);
  //   if (isStartTimer === true) {
  //     startTimerFunc();
  //   } else {
  //     console.log("clearing timeout");
  //     clearTimeout(timeoutRef.current);
  //   }
  // }, [isStartTimer]);

  // useEffect(() => {
  //   if (timerSeconds === 0) {
  //     setTimerDone(true);
  //     if (actionOnTimerDone) {
  //       actionOnTimerDone();
  //     }
  //   }
  // }, [timerSeconds]);

  // // useEffect(() => {
  // //   if (timerDone && isStartTimer === true) {
  // //     setTimerDone(false);
  // //   }
  // // }, [timerDone]);

  // if (timerDone) {
  //   return (
  //     <Text
  //       style={{
  //         fontSize: 16,
  //         fontWeight: "400",
  //       }}
  //     >
  //       Looking for another Driver...
  //     </Text>
  //   );
  // }
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
