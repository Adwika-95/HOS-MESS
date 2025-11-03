import React, { useState, useRef } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { app, auth } from "../config/firebaseConfig";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";

export default function CatererLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const recaptchaVerifier = useRef(null);

  const sendVerification = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      Alert.alert("OTP Sent!", "Check your messages for the verification code.");
    } catch (error) {
      Alert.alert("Error sending OTP", error.message);
    }
  };

  const confirmCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await signInWithCredential(auth, credential);
      Alert.alert("Login Success!", "You are now logged in as a Caterer.");
      // TODO: Navigate to your dashboard page here
    } catch (error) {
      Alert.alert("Invalid Code", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
      />

      <Text style={{ fontSize: 24, marginBottom: 20 }}>Caterer Login Page</Text>

      <TextInput
        placeholder="+91 9876543210"
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
          width: "100%",
          marginBottom: 15,
        }}
      />

      <Button title="Send OTP" onPress={sendVerification} />

      {verificationId ? (
        <View style={{ marginTop: 20, width: "100%" }}>
          <TextInput
            placeholder="Enter verification code"
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
              width: "100%",
              marginBottom: 10,
            }}
          />
          <Button title="Confirm Code" onPress={confirmCode} />
        </View>
      ) : null}
    </View>
  );
}
