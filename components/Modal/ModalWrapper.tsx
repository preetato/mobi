import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
// import { Modal } from "react-native-paper";
import { Modal } from "react-native";
const ModalWrapper = ({
  onCleanup,
  children,
}: {
  onCleanup?: () => void;
  children: JSX.Element;
  //   Children: (props: { onClose: () => void }) => JSX.Element;
}) => {
  const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      justifyContent: "center",
      position: "absolute",
      // maxHeight: height,
      marginTop: 32,
      backgroundColor: "#00000080",
      // backgroundColor: Colors.brand,

      top: -100,
      left: 0,
      right: 0,
      bottom: 0,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 8,
      padding: 16,
      // alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });

  useEffect(() => {
    if (onCleanup) {
      console.log("returning onCleanup");
      return () => onCleanup();
    }
  }, []);

  return (
    <View style={styles.mainView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!children}
        onRequestClose={() => {
          console.log("requesting close of modal");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>{children}</View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalWrapper;
