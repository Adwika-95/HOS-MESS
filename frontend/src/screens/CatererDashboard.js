import React from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🍱 Caterer Dashboard</Text>

      {/* Section: Today's Menu */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📋 Today’s Menu</Text>
        <Text style={styles.menuItem}>• Breakfast: Idli & Sambar</Text>
        <Text style={styles.menuItem}>• Lunch: Paneer Butter Masala + Rice</Text>
        <Text style={styles.menuItem}>• Dinner: Chapati + Dal Fry</Text>
        <Button title="Edit Menu" onPress={() => alert("Edit menu coming soon")} />
      </View>

      {/* Section: Feedback Summary */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>💬 Feedback Summary</Text>
        <Text>⭐ Average Rating: 4.3 / 5</Text>
        <Text>🧾 Common Suggestion: “More variety in breakfast”</Text>
        <Button title="View Detailed Feedback" onPress={() => alert("Feedback page coming soon")} />
      </View>

      {/* Section: Student Count */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>👥 Total Students Served Today</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>248</Text>
      </View>

      <View style={{ marginTop: 30 }}>
        <Button title="Logout" color="#d9534f" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  menuItem: {
    fontSize: 16,
    marginLeft: 10,
  },
});
