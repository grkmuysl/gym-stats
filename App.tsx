import { useEffect, useCallback, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Dimensions, StyleSheet, View } from "react-native";
import StackNavigation from "./src/navigation/StackNavigation";
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

const { width, height } = Dimensions.get("window");

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [dimensions, setDimensions] = useState({ width, height });

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await Promise.all([Font.loadAsync(FONTS)]);
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error("App initialization error:", error);
      } finally {
        setAppIsReady(true);
      }
    };

    prepareApp();

    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    });

    return () => subscription?.remove();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      try {
        await SplashScreen.hideAsync();
        setTimeout(() => {
          setDimensions(Dimensions.get("window"));
        }, 50);
      } catch (error) {
        console.error("Error hiding splash screen:", error);
      }
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        { width: dimensions.width, height: dimensions.height },
      ]}
      onLayout={onLayoutRootView}
    >
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
    backgroundColor: AppColors.blackBgColor,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#161616",
    justifyContent: "center",
    alignItems: "center",
  },
});
