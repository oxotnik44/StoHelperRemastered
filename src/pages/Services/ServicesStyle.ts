import { Dimensions, StyleSheet } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d1d", // Темный фон
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  searchContainer: {
    marginBottom: 20,
    flexDirection: "column", // Изменено на column
    justifyContent: "center", // Центрирование по вертикали
    alignItems: "center", // Центрирование по горизонтали
    marginTop: 29,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#fff", // Белый текст
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff", // Белый текст
    marginBottom: 20,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceCard: {
    width: screenWidth * 0.4, // устанавливаем ширину и высоту 200
    height: screenHeight * 0.2,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20,
  },
  serviceImage: {
    flex: 1, // Занимает всю доступную площадь
    justifyContent: "center", // Центрируем текст
    alignItems: "center", // Центрируем текст
    width: screenWidth * 0.39,
    height: screenHeight * 0.2,
    borderRadius: 20,
  },

  serviceText: {
    position: "absolute",
    top: screenHeight * 0.15,
    color: "white",
    fontSize: screenWidth * 0.047,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#2c2c2c", // Цвет навигационного бара
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButton: {
    alignItems: "center",
  },
  selectedServiceCard: {
    borderColor: "#FFC107", // Цвет контура для выделенной услуги
    borderWidth: 2, // Ширина контура
  },
  // Пример добавления стилей
  buttonContainer: {
    backgroundColor: "#FFC107",
    width: "80%",
    paddingVertical: 10,
    borderRadius: 24,
    marginTop: 20,
    alignSelf: "center", // Центрирование кнопки по горизонтали
  },
  findServicesText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#3B3B3B",
  },
  servicesBackground: {
    flex: 1, // Занимает всю доступную площадь
    justifyContent: "center", // Центрируем содержимое
    alignItems: "center", // Центрируем содержимое
    resizeMode: "cover", // Заполняет всю область
  },
});
