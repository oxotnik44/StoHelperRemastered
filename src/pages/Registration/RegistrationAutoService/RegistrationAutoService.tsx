// RegistrationAutoService.tsx
import React, { useState } from "react";
import { View, Alert, TouchableOpacity, Text } from "react-native";
import RegistrationAutoServiceStepOne from "./RegistrationAutoServiceStepOne";
import RegistrationAutoServiceStepThree from "./RegistrationAutoServiceStepThree";
import RegistrationAutoServiceStepTwo from "./RegistrationAutoServiceStepTwo";
import { NavigationType } from "../../../../Navigation";
import { useRegisterServiceMutation } from "api/AutoService/registrationAutoService";
import { styles } from "./AutoServiceStyle";
import Toast from "react-native-toast-message";

const RegistrationAutoService = ({ navigation }: NavigationType) => {
  const [step, setStep] = useState(1);
  const [login, setLogin] = useState("1");
  const [password, setPassword] = useState("1");

  const [nameService, setNameService] = useState("2");
  const [webAddress, setWebAddress] = useState("");
  const [startOfWork, setStartOfWork] = useState("");
  const [endOfWork, setEndOfWork] = useState("");

  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [city, setCity] = useState("");

  const [address, setAddress] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [registerService, { isLoading }] = useRegisterServiceMutation(); // Updated hook
  const generateRandomWebAddress = () => {
    const domains = ["com", "net", "org", "info", "biz"];
    const randomName = Math.random().toString(36).substring(2, 15);
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    return `https://${randomName}.${randomDomain}`;
  };
  console.log(services);
  const handleContinue = () => {
    if (step === 1) {
      if (!login || !password || !nameService) {
        Toast.show({
          type: "error",
          text1: "Ошибка",
          text2: "Пожалуйста, заполните логин, пароль и название сервиса.",
          visibilityTime: 3000,
        });

        return;
      }
      setTelephoneNumber("+" + Math.floor(Math.random() * 10000000000));
      setWebAddress(generateRandomWebAddress());
      setStep(2);
    } else if (step === 2) {
      if (!startOfWork || !endOfWork) {
        Toast.show({
          type: "error",
          text1: "Ошибка",
          text2: "Пожалуйста, заполните время начала и окончания работы.",
          visibilityTime: 3000, // Уведомление показывается 3 секунды
        });
        return;
      }
      if (startOfWork > endOfWork) {
        Toast.show({
          type: "error",
          text1: "Ошибка",
          text2: "Время начала работы не может быть больше конца.",
          visibilityTime: 3000, // Уведомление показывается 3 секунды
        });
        return;
      }
      setCity("Город " + Math.random().toString(36).substring(2, 5));
      setStep(3);
    }
  };

  const handleRegister = async () => {
    if (services.length >= 1) {
      try {
        const registrationData = {
          login,
          password,
          nameService,
          webAddress,
          startOfWork,
          endOfWork,
          telephoneNumber,
          city,
          address,
          services,
        };

        await registerService(registrationData).unwrap();

        // Уведомление об успешной регистрации
        Toast.show({
          type: "success",
          text1: "Успех",
          text2: "Регистрация завершена!",
          visibilityTime: 2000, // Время отображения 3 секунды
        });

        // Переход на экран "Services"
        navigation.navigate("Services");
      } catch (error) {
        // Уведомление об ошибке при регистрации
        Toast.show({
          type: "error",
          text1: "Ошибка",
          text2: "Регистрация не удалась. Попробуйте снова.",
          visibilityTime: 3000, // Время отображения 3 секунды
        });
        console.error("Ошибка регистрации:", error);
      }
    } else {
      // Уведомление об ошибке при отсутствии услуг
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Выберите хотя бы 1 услугу!",
        visibilityTime: 3000, // Время отображения 3 секунды
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <RegistrationAutoServiceStepOne
          login={login}
          setLogin={setLogin}
          password={password}
          setPassword={setPassword}
          nameService={nameService}
          setNameService={setNameService}
        />
      )}
      {step === 2 && (
        <RegistrationAutoServiceStepTwo
          phone={telephoneNumber}
          setPhone={setTelephoneNumber}
          webAddress={webAddress}
          setWebAddress={setWebAddress}
          startOfWork={startOfWork}
          setStartOfWork={setStartOfWork}
          endOfWork={endOfWork}
          setEndOfWork={setEndOfWork}
          city={city}
          setCity={setCity}
          address={address}
          setAddress={setAddress}
        />
      )}
      {step === 3 && (
        <RegistrationAutoServiceStepThree setServices={setServices} />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Назад</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={step === 3 ? handleRegister : handleContinue}
          disabled={isLoading} // Деактивируем кнопку во время загрузки
        >
          <Text style={styles.buttonText}>
            {step === 3
              ? isLoading
                ? "Регистрация..."
                : "Регистрация"
              : "Продолжить"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default RegistrationAutoService;
