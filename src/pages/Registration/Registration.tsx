import React from "react";
import { View, Text } from "react-native";
import styles from "./RegistrationStyle";
import { NavigationType } from "../../../Navigation";
import { useAppSelector } from "redux/store";
import RegistrationUser from "./RegistrationUser/RegistrationUser";
import RegistrationAutoService from "./RegistrationAutoService/RegistrationAutoService";

const Registration = ({ navigation }: NavigationType) => {
  const authType = useAppSelector((state) => state.registrationType.type); // Хук для получения текущего типа

  return (
    <View style={styles.container}>
      {/* Условный заголовок */}
      <Text style={styles.title}>
        {authType === "user"
          ? "Регистрация пользователя"
          : "Регистрация автосервиса"}
      </Text>
      {authType === "user" ? (
        <RegistrationUser navigation={navigation} />
      ) : (
        <RegistrationAutoService navigation={navigation} />
      )}
    </View>
  );
};

export default Registration;
