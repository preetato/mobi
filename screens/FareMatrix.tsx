import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../components/styles";
const { brand } = Colors;
import axios from "axios";

const FareMatrix = ({ navigation }) => {
  const [dataSource, setDataSource] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    axios
      .get("/fare")
      .then((response) => {
        const { status, data } = response;
        if (status == 200) {
          setDataSource(data);
        }
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };

  let listViewRef;

  const ListHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.column1}>
          <Text style={styles.headerText}>Destination</Text>
        </View>
        <View style={styles.column1}>
          <Text style={styles.headerText}>Fare</Text>
        </View>
      </View>
    );
  };

  const ListItem = (item) => {
    if (!item?.item?.destination) return null;

    return (
      <View style={styles.itemContainer}>
        <View style={[styles.column1, { backgroundColor: "#F5F5E9" }]}>
          <Text style={styles.itemText}>{item.item.destination}</Text>
        </View>
        <View style={[styles.column1, { backgroundColor: "#FFFFF4" }]}>
          <Text style={styles.itemText}>{item.item.fare}</Text>
        </View>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return <View style={styles.separator} />;
  };
  // const TopButtonHandler = () => {
  //   listViewRef.scrollToOffset({offset: 0, animated: true});
  // }
  // const EndButtonHandler = () => {
  //   listViewRef.scrollToEnd({animated: true});
  // }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        ListHeaderComponent={ListHeader}
        renderItem={ListItem}
        ListFooterComponent={() =>
          !dataSource && (
            <ActivityIndicator
              style={{ marginTop: 100 }}
              size="large"
              color={brand}
            />
          )
        }
        ref={(ref) => {
          listViewRef = ref;
        }}
      />

      {/* <TouchableOpacity
        style={[style.buttonStyle, {right: 30, top: 70}]}
        onPress={EndButtonHandler}
      >
        <Text style={styles.text}>Go End</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[style.buttonStyle, {right: 30, bottom: 70}]}
        onPress={TopButtonHandler}
      >
        <Text style={styles.text}>Go Top</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    height: 60,
    backgroundColor: brand,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerText: {
    textTransform: "uppercase",
    color: "#fff",
    fontWeight: "bold",
  },
  column1: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  column2: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    height: 50,
  },
  itemText: {
    color: "#000",
  },
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#c8c8c8",
  },
  buttonStyle: {
    position: "absolute",
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
  text: {
    fontSize: 20,
  },
});

export default FareMatrix;
