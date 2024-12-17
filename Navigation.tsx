import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import Auth from "pages/Auth/Auth";
import Services from "pages/Services/Services";
import Registration from "pages/Registration/Registration";
import Profile from "pages/Profile/Profile";

export type RootStackParamList = {
  Services: undefined;
  Auth: undefined;
  Registration: undefined;
  Profile:undefined
};

export type NavigationType = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ title: "Welcome", headerShown: false }} // Скрываем заголовок
        />
         <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: "Welcome", headerShown: false }} // Скрываем заголовок
        />
        <Stack.Screen
          name="Services"
          component={Services}
          options={{ title: "Welcome", headerShown: false }} // Скрываем заголовок
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ title: "Welcome", headerShown: false }} // Скрываем заголовок
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
