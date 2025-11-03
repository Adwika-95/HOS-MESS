// src/screens/CatererDashboard.js
import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export default function CatererDashboard() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace("CatererLogin");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
        Caterer Dashboard
      </Text>

      <View style={{ marginVertical: 10, width: "60%" }}>
        <Button title="Edit Menu" onPress={() => navigation.navigate("EditMenu")} />
      </View>

      <View style={{ marginVertical: 10, width: "60%" }}>
        <Button title="Feedback Summary" onPress={() => navigation.navigate("FeedbackSummary")} />
      </View>

      <View style={{ marginVertical: 10, width: "60%" }}>
        <Button title="Logout" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
}
