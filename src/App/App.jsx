import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ViewHome from "../pages/Home";
import ViewGame from "../pages/Game";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={ViewHome} />
        <Stack.Screen name="Game" component={ViewGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
