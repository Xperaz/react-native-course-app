import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getItem(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.error("Error getting item from storage:", error);
    return null;
  }
}

export async function setItem(key: string, value: object) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting item in storage:", error);
  }
}
