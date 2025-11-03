// src/screens/EditMenu.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Alert } from "react-native";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { app } from "../config/firebaseConfig";

const db = getFirestore(app);

export default function EditMenu() {
  const [dish, setDish] = useState("");
  const [price, setPrice] = useState("");
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "menu"), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMenu(items);
    });
    return unsubscribe;
  }, []);

  const addMenuItem = async () => {
    if (!dish || !price) {
      Alert.alert("Error", "Please fill out both fields");
      return;
    }

    await addDoc(collection(db, "menu"), { dish, price });
    setDish("");
    setPrice("");
  };

  const deleteMenuItem = async (id) => {
    await deleteDoc(doc(db, "menu", id));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Edit Menu</Text>

      <TextInput
        placeholder="Dish name"
        value={dish}
        onChangeText={setDish}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Button title="Add Dish" onPress={addMenuItem} />

      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              borderBottomWidth: 1,
              borderColor: "#ccc",
            }}
          >
            <Text>{item.dish} - ₹{item.price}</Text>
            <Button title="Delete" color="red" onPress={() => deleteMenuItem(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
