import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import StackNavigation from "./src/navigation/StackNavigation";
import { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { FavoritesProvider } from "./src/context/FavouritesContext";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
      "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
      "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
      "Roboto-Light": require("./src/assets/fonts/Roboto-Light.ttf"),
      "Roboto-SemiBold": require("./src/assets/fonts/Roboto-SemiBold.ttf"),
    });
  };

  useEffect(() => {
    loadFonts()
      .then(() => setFontsLoaded(true))
      .catch((error) => console.error(error));
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <FavoritesProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
