import React from "react";
import { Colors } from "../styles";
// import { Colors } from "react-native/Libraries/NewAppScreen";
import ResponseButton, { ResponseButtonProps } from "./ResponseButton";

const CancelButton = ({ style, ...props }: ResponseButtonProps) => {
  return (
    <ResponseButton
      // style={style}
      style={[
        {
          backgroundColor: Colors.darkLight,
        },
        style,
      ]}
      text={props?.text ? props.text : "Cancel Booking"}
      {...props}
    />
  );
};

export default CancelButton;
