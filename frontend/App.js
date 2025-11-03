import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CatererLogin from "./src/screens/CatererLogin";
import CatererDashboard from "./src/screens/CatererDashboard";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CatererLogin" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CatererLogin" component={CatererLogin} />
        <Stack.Screen name="CatererDashboard" component={CatererDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
