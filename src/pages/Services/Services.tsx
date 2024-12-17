import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
} from "react-native";
import styles from "./ServicesStyle";
import TextInputComponent from "@components/TextInputComponent";
import { useGetServicesQuery } from "api/Users/getServices";
import Toast from "react-native-toast-message";

const Services = () => {
  const [searchText, setSearchText] = useState("");
  const { data: services, error, isLoading } = useGetServicesQuery();

  // Обработка ошибок
  if (error) {
    Toast.show({
      type: "error",
      text1: "Ошибка",
      text2: "Не удалось загрузить услуги.",
      visibilityTime: 3000, // Уведомление отображается 3 секунды
    });
    return null; // Возвращаем null, если произошла ошибка
  }

  // Фильтрация сервисов по введенному тексту
  const filteredServices = services?.filter((service: any) =>
    service.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Состояние для выбранных услуг
  const [selectedServices, setSelectedServices] = useState<
    { id: string; isSelected: boolean }[]
  >([]);

  // Функция для обработки нажатия на услугу
  const handleServicePress = (service: any) => {
    const isServiceSelected = selectedServices.some(
      (s) => s.id === service._id
    );

    if (isServiceSelected) {
      // Если услуга уже выбрана, удаляем её
      setSelectedServices(selectedServices.filter((s) => s.id !== service._id));
    } else {
      // Если услуга не выбрана, добавляем её
      setSelectedServices([
        ...selectedServices,
        { id: service._id, isSelected: true },
      ]);
    }
  };

  // Обработчик нажатия на кнопку
  const handleFindServices = () => {
    // Здесь можно добавить логику для поиска автосервисов
    Alert.alert(
      "Поиск автосервисов",
      "Поиск будет выполнен для услуг: " +
        selectedServices.map((s) => s.id).join(", ")
    );
  };

  return (
    <View style={styles.container}>
      {/* Поле поиска */}
      <View style={styles.searchContainer}>
        <TextInputComponent
          value={searchText}
          setValue={setSearchText}
          placeholder="Поиск"
          isSearch={true}
        />
      </View>

      {/* Заголовок */}
      <Text style={styles.header}>Выберите вид услуг</Text>

      {/* Проверка на загрузку */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        // Сетка услуг
        <View style={styles.servicesGrid}>
          {filteredServices?.map((item: any) => (
            <TouchableOpacity
              key={item._id} // Используем item._id как уникальный ключ
              onPress={() => handleServicePress(item)}
              style={[
                styles.serviceCard,
                {
                  borderColor: selectedServices.some((s) => s.id === item._id)
                    ? "#FFC107"
                    : "transparent",
                  borderWidth: selectedServices.some((s) => s.id === item._id)
                    ? 2
                    : 0,
                  height: 150, // Устанавливаем фиксированную высоту
                },
              ]}
            >
              <Image
                source={{ uri: item.urlServices }}
                style={[styles.serviceImage]}
                resizeMode="cover" // Устанавливаем режим заполнения
              />
              <Text style={styles.serviceText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Кнопка для поиска автосервисов */}
      {selectedServices.length > 0 && (
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleFindServices}>
            <Text style={styles.findServicesText}>Найти автосервисы</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Services;
