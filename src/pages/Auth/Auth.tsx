import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import logo from "assets/logo.png";
import { useLoginUserMutation } from "api/Users/loginUser";
import { useLoginAutoServiceMutation } from "api/AutoService/loginAutoService";
import TextInputComponent from "@components/TextInputComponent";
import styles from "./AuthStyle";
import { NavigationType } from "../../../Navigation";
import { useAppDispatch, useAppSelector } from "redux/store";
import { setAuthType } from "redux/authTypeSlice";
import ButtonComponent from "@components/ButtonComponent";
import Toast from "react-native-toast-message";
const Auth = ({ navigation }: NavigationType) => {
  const [login, setLogin] = useState("1");
  const [password, setPassword] = useState("1");
  const [loginUser, { isLoading: isUserLoading }] = useLoginUserMutation();
  const [loginAutoService, { isLoading: isServiceLoading }] =
    useLoginAutoServiceMutation();

  const dispatch = useAppDispatch(); // Хук для диспатча экшенов
  const authType = useAppSelector((state) => state.registrationType.type); // Хук для получения текущего типа

  const handleLogin = async () => {
    try {
      // Проверяем, выбран ли пользователь
      if (authType === "user") {
        const result = await loginUser({ login, password }).unwrap();
        console.log("Данные пользователя:", result);
        Toast.show({
          type: "success",
          text1: "Успешный вход!",
          text2: "Добро пожаловать, пользователь.",
          visibilityTime: 2000,
        });
        // Перенаправление на экран "Services"
        navigation.navigate("Services");
      } else if (authType === "service") {
        const result = await loginAutoService({ login, password }).unwrap();
        console.log("Данные пользователя:", result);
        Toast.show({
          type: "success",
          text1: "Успешный вход!",
          text2: "Добро пожаловать в профиль сервиса.",
          visibilityTime: 2000,
        });
        // Перенаправление на экран "Profile"
        navigation.navigate("Profile");
      } else {
        Toast.show({
          type: "error",
          text1: "Ошибка",
          text2: "Выберите пользователя для входа.",
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      const typedError = error as { data?: { message?: string } };
      Toast.show({
        type: "error",
        text1: "Ошибка входа",
        text2: typedError.data?.message || "Ошибка входа.",
        visibilityTime: 3000,
      });
    }
  };

  const handleRegistration = async () => {
    try {
      // Проверяем, какой тип выбран (user или service)
      navigation.navigate("Registration");
    } catch (error) {
      const typedError = error as { data?: { message?: string } };
      Alert.alert("Ошибка", typedError.data?.message || "Ошибка регистрации.");
    }
  };
  // Функции для выбора типа (пользователь или сервис)
  const selectService = () => {
    dispatch(setAuthType("service"));
  };

  const selectUser = () => {
    dispatch(setAuthType("user"));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>STO HELPER</Text>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      {/* Кнопки выбора */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.serviceButton,
            authType === "service"
              ? styles.activeButton
              : styles.inactiveButton, // Применяем стиль в зависимости от выбора
          ]}
          onPress={selectService} // Выбор сервиса
        >
          <Text style={styles.buttonText}>Сервис</Text>
        </TouchableOpacity>
        <Text style={styles.separator}> / </Text>
        <TouchableOpacity
          style={[
            styles.userButton,
            authType === "user" ? styles.activeButton : styles.inactiveButton, // Применяем стиль в зависимости от выбора
          ]}
          onPress={selectUser} // Выбор пользователя
        >
          <Text style={styles.buttonText}>Пользователь</Text>
        </TouchableOpacity>
      </View>

      {/* Поля ввода для логина и пароля */}
      <TextInputComponent
        value={login}
        setValue={setLogin} // Измените onChangeText на setValue
        placeholder="Логин"
        isSearch={false}
      />
      <View style={{ marginBottom: 15 }} />
      <TextInputComponent
        value={password}
        setValue={setPassword} // Измените onChangeText на setValue
        placeholder="Пароль"
        secureTextEntry
        isSearch={false}
      />
      <View style={{ marginBottom: 15 }} />
      <ButtonComponent
        onPress={handleLogin}
        isLoading={isUserLoading || isServiceLoading}
        title="Вход"
      />

      <TouchableOpacity onPress={handleRegistration}>
        <Text style={styles.registerText}>Регистрация</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Auth;
