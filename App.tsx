import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "./theme";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Coffee</Text>
      </View>
      {/* <Button>click me</Button> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  itemContainer: {
    borderBottomWidth: 1,
    borderBlockColor: theme.colorCerulean,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },

  itemText: {
    fontSize: 18,
    fontWeight: "200",
  },
});
