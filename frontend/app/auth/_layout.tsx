import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack initialRouteName="caterer-login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="caterer-login" />
      <Stack.Screen name="student-login" />
    </Stack>
  );
}
