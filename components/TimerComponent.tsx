import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { Text, View } from "react-native";
export default function TimerComponent({
  initialSeconds = 10,
  actionOnTimerDone = undefined,
  timerStart,
  hiddenText,
  text,
  setTimerSecondProps,
}: {} & {
  timerStart: string;
  initialSeconds: number;
  actionOnTimerDone: () => void;
  hiddenText?: true;
  text?: string;
  setTimerSecondProps: Dispatch<SetStateAction<number>>;
}) {
  const timerNow = useRef<typeof timerStart>(timerStart);
  const timeoutRef = useRef<undefined | ReturnType<typeof setInterval>>();
  const [timerSeconds, setTimerSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (timerStart !== timerNow.current) {
      timerNow.current = timerStart;
      startTimerFunc();
    }
  }, [timerStart]);

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

  useEffect(() => {
    setTimerSecondProps(timerSeconds);
  }, [timerSeconds]);

  useEffect(() => {
    if (timerSeconds === 0) {
      actionOnTimerDone();
    }
  }, [timerSeconds]);

  return (
    <>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "400",
          display: hiddenText ? "none" : undefined,
        }}
      >
        Waiting for driver to Respond:
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {timerSeconds ? (
          <>
            <Text
              style={{
                // flex: 1,
                fontWeight: "700",
                fontSize: 32,
              }}
            >
              {timerSeconds.toString()}
            </Text>
            <Text
              style={{
                marginLeft: 8,
              }}
            >
              Seconds Remaining
            </Text>
          </>
        ) : (
          <Text
            style={{
              marginTop: 8,
              fontWeight: "400",
              fontSize: 24,
            }}
          >
            {text || `Time's Up! Looking for another Driver`}
          </Text>
        )}
      </View>
    </>
  );
}
