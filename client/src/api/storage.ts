import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async <T>(key: string, value: T) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(key, jsonValue);
};

const getData = async <T>(key: string): Promise<T | null> => {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

export { storeData, getData };
