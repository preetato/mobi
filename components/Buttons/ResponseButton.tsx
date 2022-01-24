import React from "react";
import { StyleSheet, Text, TouchableOpacityProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GenericTouchableProps } from "react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable";
import { Colors } from "../styles";
// import { Colors } from "react-native/Libraries/NewAppScreen";

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
    padding: 8,
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

export type ResponseButtonProps = (TouchableOpacityProps &
  GenericTouchableProps) & {
  // hidden?: true | boolean;
  text?: string;
  children?: JSX.Element;
};
export default function ResponseButton({
  style,
  ...props
}: ResponseButtonProps) {
  return (
    <TouchableOpacity
      style={[
        {
          // display: props?.hidden ? "none" : undefined,
          padding: 13,
          backgroundColor: Colors.brand,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          marginVertical: 8,
        },
        style,
      ]}
      {...props}
    >
      <Text style={{ ...styles.secondaryText, color: Colors.primary }}>
        {props.text || props.children || "Confirm"}
      </Text>
    </TouchableOpacity>
  );
}
