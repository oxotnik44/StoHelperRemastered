import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import CheckBox from "react-native-check-box"; // Импортируем CheckBox из react-native-check-box
import { styles } from "./AutoServiceStyle";
import { useGetServicesQuery } from "api/Users/getServices";

interface StepThreeProps {
  setServices: (value: string[]) => void;
}

interface Service {
  _id: string;
  name: string;
  urlServices: string; // Предполагаем, что в данных есть URL изображения услуги
}

const RegistrationAutoServiceStepThree: React.FC<StepThreeProps> = ({
  setServices,
}) => {
  const { data: services, error, isLoading } = useGetServicesQuery();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Функция для обработки выбора услуги
  const toggleService = (serviceName: string) => {
    setSelectedServices((prevServices) => {
      const isSelected = prevServices.includes(serviceName);
      const newServices = isSelected
        ? prevServices.filter((service) => service !== serviceName)
        : [...prevServices, serviceName];

      setServices(newServices); // Передаем выбранные услуги в родительский компонент
      return newServices;
    });
  };

  if (isLoading) return <Text>Загрузка...</Text>;
  if (error) return <Text>Ошибка при загрузке услуг</Text>;
  if (!services || services.length === 0)
    return <Text>Нет доступных услуг</Text>;

  return (
    <View style={styles.container}>
      {services.map((service: Service) => {
        const isChecked = selectedServices.includes(service.name);

        return (
          <TouchableOpacity
            key={service._id}
            style={styles.serviceBlock} // Новый стиль для блока услуги
            onPress={() => toggleService(service.name)} // Используем только обработчик на уровне блока
          >
            <Image
              source={{ uri: service.urlServices }} // Убедитесь, что `urlServices` есть в вашем сервисе
              style={styles.serviceImage}
            />
            <View style={styles.serviceInfo}>
              <Text style={styles.itemText}>{service.name}</Text>
              <CheckBox
                style={{ padding: 10 }} // Добавляем небольшие отступы
                onClick={() => toggleService(service.name)} // Теперь только чекбокс отвечает за выбор
                isChecked={isChecked}
                rightText={" "} // Убираем текст справа от чекбокса
                checkBoxColor="#FFC107" // Цвет чекбокса
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RegistrationAutoServiceStepThree;
