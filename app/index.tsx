import {
  FlatList,
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ShoppingListItem } from "../components/ShopingListItem";
import { theme } from "../theme";
import { useEffect, useMemo, useState } from "react";
import { getItem, setItem } from "../utlis/storage";
import * as Haptics from "expo-haptics";

type ShoppingListItemType = {
  id: string;
  name: string;
  isCompleted: boolean;
};

const storageKey = "shopping-list";

export default function App() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const loadShoppingList = async () => {
      const storedList = await getItem(storageKey);
      if (storedList) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShoppingList(storedList);
      }
    };

    loadShoppingList();
  }, []);

  const handleSubmit = () => {
    if (value) {
      setShoppingList([
        ...shoppingList,
        {
          id: new Date().toISOString(),
          name: value,
          isCompleted: false,
        },
      ]);
      setItem(storageKey, [
        ...shoppingList,
        {
          id: new Date().toISOString(),
          name: value,
          isCompleted: false,
        },
      ]);
      setValue("");
    }
  };

  const handleDelete = (id: string) => {
    const newShoppingList = shoppingList.filter((item) => item.id !== id);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppingList);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setItem(storageKey, newShoppingList);
  };

  const handleToggleComplete = (id: string) => {
    const updatedItems = shoppingList.map((item) => {
      if (item.id === id) {
        if (item.isCompleted) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        return {
          ...item,
          isCompleted: !item.isCompleted,
        };
      }
      return item;
    });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(updatedItems);
    setItem(storageKey, updatedItems);
  };

  const sortedShoppingList = useMemo(
    () =>
      shoppingList.sort((item1, item2) => {
        if (item1.isCompleted === item2.isCompleted) return 0;
        return item1.isCompleted ? 1 : -1;
      }),
    [shoppingList]
  );

  return (
    <FlatList
      data={sortedShoppingList}
      ListHeaderComponent={
        <TextInput
          style={styles.textInput}
          placeholder="E.g. Coffee"
          value={value}
          onChangeText={(value) => setValue(value)}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      }
      renderItem={({ item }) => (
        <ShoppingListItem
          key={item.id}
          name={item.name}
          isCompleted={item.isCompleted}
          onDelete={() => handleDelete(item.id)}
          onToggleComplete={() => handleToggleComplete(item.id)}
        />
      )}
      ListEmptyComponent={() => (
        <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty</Text>
        </View>
      )}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "auto",
  },
  contentContainer: {
    padding: 12,
  },
  textInput: {
    borderColor: theme.colorGrey,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 12,
    borderRadius: 50,
    justifyContent: "flex-end",
    backgroundColor: theme.colorWhite,
  },

  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
});
