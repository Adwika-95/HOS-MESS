// src/screens/FeedbackSummary.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { app } from "../config/firebaseConfig";

const db = getFirestore(app);

export default function FeedbackSummary() {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "feedback"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFeedbackList(data);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Feedback Summary</Text>

      {feedbackList.length === 0 ? (
        <Text>No feedback yet.</Text>
      ) : (
        <FlatList
          data={feedbackList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                marginBottom: 10,
                borderRadius: 8,
              }}
            >
              <Text>⭐ Rating: {item.rating}</Text>
              <Text>💬 {item.comment}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
