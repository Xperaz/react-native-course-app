import React from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

type ShoppingListItemProps = {
  name: string;
  isCompleted?: boolean;
  onDelete: () => void;
  onToggleComplete: () => void;
};

export function ShoppingListItem({
  name,
  isCompleted,
  onDelete,
  onToggleComplete,
}: ShoppingListItemProps) {
  const handleDeleteItem = () => {
    Alert.alert(
      "Are you sure you want to delete this?",
      "It will be gone forever!",
      [
        {
          text: "Confirm",
          onPress: onDelete,
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <Pressable
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
      onPress={() => onToggleComplete()}
    >
      <View style={styles.row}>
        <Entypo
          name={isCompleted ? "check" : "circle"}
          size={24}
          color="black"
        />

        <Text
          numberOfLines={1}
          style={[
            styles.itemText,
            isCompleted ? styles.completedButtonText : undefined,
          ]}
        >
          {name}
        </Text>
      </View>
      {isCompleted ? <Text>Completed</Text> : null}
      <TouchableOpacity onPress={handleDeleteItem}>
        <AntDesign
          name="closecircle"
          size={24}
          color={isCompleted ? theme.colorGrey : theme.colorRed}
        />
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderBlockColor: theme.colorCerulean,
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  completedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey,
  },

  itemText: {
    fontSize: 18,
    fontWeight: "200",
    overflow: "scroll",
  },

  button: {
    backgroundColor: theme.colorBlack,
    padding: 8,
    borderRadius: 6,
  },

  completedButton: {
    backgroundColor: theme.colorGrey,
  },

  buttonText: {
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  completedButtonText: {
    color: theme.colorBlack,
    textDecorationLine: "line-through",
  },
  row: {
    flexDirection: "row",
    gap: 6,
  },
});
