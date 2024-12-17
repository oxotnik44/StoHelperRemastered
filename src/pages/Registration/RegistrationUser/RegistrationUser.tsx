import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import TextInputComponent from "@components/TextInputComponent"; // Предполагаем, что этот компонент уже существует
import styles from "./RegistrationUserStyle"; // Ваши стили для компонента
import { useRegisterUserMutation } from "api/Users/registrationUser";
import { NavigationType } from "../../../../Navigation";
import ButtonComponent from "@components/ButtonComponent";
import Toast from "react-native-toast-message";
const RegistrationUser = ({ navigation }: NavigationType) => {
  const [login, setLogin] = useState(""); // Состояние для логина
  const [password, setPassword] = useState(""); // Состояние для пароля
  const [registerUser, { isLoading }] = useRegisterUserMutation(); // Вызов мутации

  const handleRegister = async () => {
    if (!login || !password) {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Пожалуйста, заполните все поля.",
        visibilityTime: 3000, // Время отображения 3 секунды
      });
      return;
    }

    try {
      const response = await registerUser({ login, password }).unwrap();

      // Сообщение об успешной регистрации
      Toast.show({
        type: "success",
        text1: "Успех",
        text2: "Регистрация успешна.",
        visibilityTime: 3000,
      });

      // Перенаправление на экран "Services"
      navigation.navigate("Services");
      console.log(response);
    } catch (error) {
      // Приведение ошибки к ожидаемому типу и получение сообщения
      const err = error as { data?: { message?: string } };
      const errorMessage =
        err.data?.message || "Не удалось зарегистрировать пользователя.";

      // Сообщение об ошибке
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: errorMessage,
        visibilityTime: 3000,
      });
    }
  };
  return (
    <View style={styles.container}>
      {/* Поле для логина */}
      <TextInputComponent
        value={login}
        setValue={setLogin} // Передаем функцию обновления логина
        placeholder="Логин"
        isSearch={false} // Не отображаем иконку поиска
      />
      <View style={{ marginVertical: 10 }} />

      {/* Поле для пароля */}
      <TextInputComponent
        value={password}
        setValue={setPassword} // Передаем функцию обновления пароля
        placeholder="Пароль"
        secureTextEntry // Включаем скрытие пароля
        isSearch={false}
      />
      <View style={{ marginVertical: 10 }} />

      <ButtonComponent
        onPress={handleRegister}
        isLoading={isLoading}
        title="Зарегистрироваться"
      />
    </View>
  );
};

export default RegistrationUser;
