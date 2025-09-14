import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import StackNavigation from "./src/navigation/StackNavigation";
import { useEffect, useState, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { FavoritesProvider } from "./src/context/FavouritesContext";
import { RecordsProvider } from "./src/context/ExerciseRecordsContext";
import {
  ProfileContextProvider,
  useProfile,
} from "./src/context/ProfileContext";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import { LocaleConfig } from "react-native-calendars";
import CustomSpinner from "./src/components/Spinner/CustomSpinner";
import { AppColors } from "./src/styles/colors";

LocaleConfig.locales["tr"] = {
  monthNames: [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ],
  monthNamesShort: [
    "Oca",
    "Şub",
    "Mar",
    "Nis",
    "May",
    "Haz",
    "Tem",
    "Ağu",
    "Eyl",
    "Eki",
    "Kas",
    "Ara",
  ],
  dayNames: [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ],
  dayNamesShort: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
  today: "Bugün",
};
LocaleConfig.defaultLocale = "tr";

const FONTS = {
  "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
  "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
  "Roboto-Light": require("./src/assets/fonts/Roboto-Light.ttf"),
  "Roboto-SemiBold": require("./src/assets/fonts/Roboto-SemiBold.ttf"),
} as const;

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await Promise.all([Font.loadAsync(FONTS)]);
      } catch (error) {
        console.error("App initialization error:", error);
      } finally {
        setAppIsReady(true);
      }
    };

    prepareApp();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      try {
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error("Error hiding splash screen:", error);
      }
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ProfileContextProvider>
        <RecordsProvider>
          <FavoritesProvider>
            <AppContent />
          </FavoritesProvider>
        </RecordsProvider>
      </ProfileContextProvider>
    </View>
  );
}

const AppContent = () => {
  const { isOnboardingCompleted, isLoading } = useProfile();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <CustomSpinner />
      </View>
    );
  }

  if (!isOnboardingCompleted()) {
    return <OnboardingScreen />;
  }

  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#161616",
    justifyContent: "center",
    alignItems: "center",
  },
});
