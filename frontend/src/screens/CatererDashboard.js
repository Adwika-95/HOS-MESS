import React from "react";
import { View, Text, Button } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../config/firebaseConfig";

export default function CatererDashboard({ navigation }) {
  const auth = getAuth(app);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigation.replace("CatererLogin");
    } catch (error) {
      alert("Error logging out: " + error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        🍱 Caterer Dashboard
      </Text>
      <Text>Welcome, you are logged in successfully!</Text>

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
