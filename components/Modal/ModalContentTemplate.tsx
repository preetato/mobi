import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { Colors, Line, PageTitle, SubTitle } from "../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import uuid from "react-native-uuid";

type ModalContentTemplateProps = {
  title: string;
  subTitle: string;
  buttons?: {
    component: JSX.Element;
  }[];
};

const ModalContentTemplate = ({
  title,
  subTitle,
  buttons,
  onClose,
  hideCloseButton,
}: ModalContentTemplateProps &
  (
    | {
        onClose: () => void;
        hideCloseButton?: never | false;
      }
    | {
        hideCloseButton: true;
        onClose?: never;
        // onClose?: never;
      }
  )) => {
  // useEffect(() => {
  //   return () => {
  //     onClose();
  //   };
  // }, []);
  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <PageTitle
          style={{
            fontWeight: "700",
            // color: "#000000",
            color: Colors.brand,
            textAlign: "left",
            fontSize: 32,
          }}
        >
          {title}
        </PageTitle>
        <View
          style={{
            marginTop: -2,
            ...(hideCloseButton && {
              display: "none",
            }),
          }}
        >
          <TouchableOpacity onPress={onClose}>
            <Ionicons
              color={Colors.brand}
              name="close-circle-outline"
              size={32}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Line
        style={{
          //   backgroundColor: "#000000",
          height: 1.4,
          marginVertical: 8,
        }}
      />
      <Text
        style={{
          fontSize: 20,
        }}
      >
        {subTitle}
      </Text>
      <View>
        {buttons?.map((ea) => (
          <View key={uuid.v4() as string}>{ea.component}</View>
        ))}
      </View>
    </View>
  );
};

export default ModalContentTemplate;
