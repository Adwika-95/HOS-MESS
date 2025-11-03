import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { auth } from "../services/firebaseConfig";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";

const CatererLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);

  const sendOTP = async () => {
    try {
      const provider = new PhoneAuthProvider(auth);
      const verificationId = await provider.verifyPhoneNumber(`+91${phone}`, window.recaptchaVerifier);
      setVerificationId(verificationId);
      Alert.alert("OTP sent successfully!");
    } catch (error) {
      Alert.alert("Error sending OTP", error.message);
    }
  };

  const verifyOTP = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      Alert.alert("Login successful!");
    } catch (error) {
      Alert.alert("Invalid OTP", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Caterer Login</Text>

      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Button title="Send OTP" onPress={sendOTP} />

      {verificationId && (
        <>
          <TextInput
            placeholder="Enter OTP"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
            style={{ borderWidth: 1, padding: 10, marginTop: 20 }}
          />
          <Button title="Verify OTP" onPress={verifyOTP} />
        </>
      )}
    </View>
  );
};

export default CatererLogin;
