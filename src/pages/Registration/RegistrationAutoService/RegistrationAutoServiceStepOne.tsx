// StepOne.tsx
import React from "react";
import TextInputComponent from "@components/TextInputComponent"; // Убедитесь, что путь правильный
import { View } from "react-native";

// Определение интерфейса для пропсов
interface StepOneProps {
  login: string;
  setLogin: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  nameService: string;
  setNameService: (value: string) => void;
}

const RegistrationAutoServiceStepOne: React.FC<StepOneProps> = ({
  login,
  setLogin,
  password,
  setPassword,
  nameService,
  setNameService,
}) => {
  return (
    <>
      <TextInputComponent
        value={login}
        setValue={setLogin}
        placeholder="Логин"
        isSearch={false}
      />
      <View style={{ marginVertical: 10 }} />
      <TextInputComponent
        value={password}
        setValue={setPassword}
        placeholder="Пароль"
        secureTextEntry={true}
        isSearch={false}
      />
      <View style={{ marginVertical: 10 }} />

      <TextInputComponent
        value={nameService}
        setValue={setNameService}
        placeholder="Название авто сервиса"
        secureTextEntry={true}
        isSearch={false}
      />
    </>
  );
};

export default RegistrationAutoServiceStepOne;
