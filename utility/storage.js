import AsyncStorage from "@react-native-async-storage/async-storage";

const userKey = "userKey";

const storeUser = async (user) => {
  try {
    await AsyncStorage.setItem(userKey, JSON.stringify(user));
  } catch (error) {}
};

const getUser = async () => {
  try {
    let user = await AsyncStorage.getItem(userKey);
    return JSON.parse(user);
  } catch (error) {}
};

const removeUser = async () => {
  try {
    return await AsyncStorage.removeItem(userKey);
  } catch (error) {}
};

export default {
  storeUser,
  getUser,
  removeUser,
};
