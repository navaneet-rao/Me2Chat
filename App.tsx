import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./app/screens/loginScreen/Login";
import SignUp from "./app/screens/signUpScreen/SignUp";
import Chat from "./app/screens/chatScreen/Chat";
import Home from "./app/screens/homeScreen/Home";

export type RootStackParamList = {
  Login?: undefined;
  SignUp?: undefined;
  Home?: undefined;
  Chat?: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
