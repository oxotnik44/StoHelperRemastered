import React from "react";
import { TextInput, View, Image, StyleSheet, Dimensions } from "react-native";
import loup from "assets/loup.png"; // Убедитесь, что путь к изображению правильный

const { width, height } = Dimensions.get("window");

// Определение типов для пропсов
interface TextInputComponentProps {
  value: string;
  setValue: (value: string) => void; // Функция для обновления значения
  placeholder: string;
  secureTextEntry?: boolean; // Опциональный пропс для скрытия текста
  isSearch: boolean;
}

const TextInputComponent: React.FC<TextInputComponentProps> = ({
  value,
  setValue,
  placeholder,
  secureTextEntry = false, // Значение по умолчанию
  isSearch,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={value}
        onChangeText={setValue} // Используем setValue
        placeholder={placeholder}
        placeholderTextColor="#FFC107"
        secureTextEntry={secureTextEntry} // Используем пропс
        style={styles.input}
      />
      {/* Иконка лупы */}
      {isSearch && <Image source={loup} style={styles.searchIcon} />}
    </View>
  );
};

// Получаем размеры экрана
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFC107",
    paddingHorizontal: 8,
    width: width * 0.8, // Адаптивная ширина
    height: height * 0.05, // Адаптивная высота
    position: "relative",
  },
  input: {
    color: "#FFC107",
    fontSize: width * 0.04, // Адаптивный размер шрифта
    flex: 1, // Позволяет текстовому полю занимать доступное пространство
    height: height * 0.05, // Адаптивная высота
    paddingHorizontal: 8,
  },
  searchIcon: {
    width: 20, // Ширина иконки
    height: 20, // Высота иконки
    position: "absolute", // Абсолютное позиционирование
    right: 10, // Отступ справа
    top: "50%", // Центрирование по вертикали
    transform: [{ translateY: -10 }], // Смещение для точного центрирования
  },
});

export default TextInputComponent;
