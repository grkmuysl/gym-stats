import { NavigationContainer } from "@react-navigation/native";
import { Platform, StyleSheet, Text, UIManager, View } from "react-native";
import StackNavigation from "./src/navigation/StackNavigation";
import { useEffect, useState, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { FavoritesProvider } from "./src/context/FavouritesContext";
import { RecordsProvider } from "./src/context/ExerciseRecordsContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
        "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Light": require("./src/assets/fonts/Roboto-Light.ttf"),
        "Roboto-SemiBold": require("./src/assets/fonts/Roboto-SemiBold.ttf"),
      });
    } catch (error) {
      console.error("Font loading error:", error);
    } finally {
      setFontsLoaded(true);
    }
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <RecordsProvider>
        <FavoritesProvider>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </FavoritesProvider>
      </RecordsProvider>
    </View>
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
