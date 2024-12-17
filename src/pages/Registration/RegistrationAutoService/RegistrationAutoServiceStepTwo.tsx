import React, { useState, useEffect } from "react";
import TextInputComponent from "@components/TextInputComponent"; // Убедитесь, что путь правильный
import { View, Button, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { styles } from "./AutoServiceStyle";
// Определение интерфейса для пропсов
interface StepTwoProps {
  phone: string;
  setPhone: (value: string) => void;
  webAddress: string;
  setWebAddress: (value: string) => void;
  startOfWork: string; // Для времени начала работы
  setStartOfWork: (value: string) => void; // Сеттер для времени начала работы
  endOfWork: string; // Для времени конца работы
  setEndOfWork: (value: string) => void; // Сеттер для времени конца работы
  city: string; // Для времени конца работы
  setCity: (value: string) => void; // Сеттер для времени конца работы
  address: string; // Для времени конца работы
  setAddress: (value: string) => void; // Сеттер для времени конца работы
}

const cities = [
  "Москва",
  "Санкт-Петербург",
  "Казань",
  "Новосибирск",
  "Екатеринбург",
];
const addresses = [
  "ул. Ленина, д. 10",
  "ул. Пушкина, д. 5",
  "ул. Горького, д. 12",
  "ул. Свердлова, д. 8",
  "ул. Мира, д. 3",
];

const getRandomElement = (arr: string[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const RegistrationAutoServiceStepTwo: React.FC<StepTwoProps> = ({
  phone,
  setPhone,
  webAddress,
  setWebAddress,
  startOfWork,
  setStartOfWork,
  endOfWork,
  setEndOfWork,
  city,
  setCity,
  address,
  setAddress,
}) => {
  const [isStartPickerVisible, setStartPickerVisibility] = useState(false);
  const [isEndPickerVisible, setEndPickerVisibility] = useState(false);

  // Генерация случайного города и адреса при загрузке компонента
  useEffect(() => {
    setCity(getRandomElement(cities));
    setAddress(getRandomElement(addresses));
  }, []);

  const showStartPicker = () => {
    setStartPickerVisibility(true);
  };

  const hideStartPicker = () => {
    setStartPickerVisibility(false);
  };

  const handleStartConfirm = (date: Date) => {
    hideStartPicker();
    const formattedTime = date.toTimeString().split(" ")[0].substring(0, 5);
    setStartOfWork(formattedTime); // Устанавливаем выбранное время начала работы
  };

  const showEndPicker = () => {
    setEndPickerVisibility(true);
  };

  const hideEndPicker = () => {
    setEndPickerVisibility(false);
  };

  const handleEndConfirm = (date: Date) => {
    hideEndPicker();
    const formattedTime = date.toTimeString().split(" ")[0].substring(0, 5);
    setEndOfWork(formattedTime); // Устанавливаем выбранное время конца работы
  };

  return (
    <>
      <TextInputComponent
        value={phone}
        setValue={setPhone}
        placeholder="Телефон"
        isSearch={false}
      />
      <View style={{ marginVertical: 10 }} />

      <TextInputComponent
        value={webAddress}
        setValue={setWebAddress}
        placeholder="Адрес сайта"
        isSearch={false}
      />
      <View style={{ marginVertical: 10 }} />

      <TextInputComponent
        value={city}
        setValue={setCity}
        placeholder="Город"
        isSearch={false}
      />
      <View style={{ marginVertical: 10 }} />

      <TextInputComponent
        value={address}
        setValue={setAddress}
        placeholder="Адрес"
        isSearch={false}
      />
      <View style={{ marginVertical: 10 }} />

      {/* Контейнер для кнопок выбора времени */}
      <View style={styles.buttonContainer}>
        {/* Кнопка для открытия выбора времени начала работы */}
        <View style={styles.buttonWrapper}>
          <Button
            title="Выбрать время начала"
            onPress={showStartPicker}
            color="#FFC107"
          />
        </View>

        {/* Разделитель */}
        <Text style={styles.separator}>/</Text>

        {/* Кнопка для открытия выбора времени конца работы */}
        <View style={styles.buttonWrapper}>
          <Button
            title="Выбрать время конца"
            onPress={showEndPicker}
            color="#FFC107"
          />
        </View>
      </View>

      {/* Отображение выбранного времени */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          Начало работы: {startOfWork || "Не выбрано"}
        </Text>
        <Text style={styles.timeText}>
          Конец работы: {endOfWork || "Не выбрано"}
        </Text>
      </View>

      {/* Модальное окно для выбора времени начала работы */}
      <DateTimePickerModal
        isVisible={isStartPickerVisible}
        mode="time"
        display="spinner"
        onConfirm={handleStartConfirm}
        onCancel={hideStartPicker}
      />

      {/* Модальное окно для выбора времени конца работы */}
      <DateTimePickerModal
        isVisible={isEndPickerVisible}
        mode="time"
        display="spinner"
        onConfirm={handleEndConfirm}
        onCancel={hideEndPicker}
      />
    </>
  );
};

// Стили для кнопок и контейнера

export default RegistrationAutoServiceStepTwo;
