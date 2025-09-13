import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import StackNavigation from "./src/navigation/StackNavigation";
import { useEffect, useState, useCallback, useRef } from "react";
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
import LottieView from "lottie-react-native";
import { s } from "react-native-size-matters";
import { AppColors } from "./src/styles/colors";
import CustomSpinner from "./src/components/Spinner/CustomSpinner";

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

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

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
      setIsFirstLaunch(false);
    }
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && !isFirstLaunch) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isFirstLaunch]);

  if (!fontsLoaded || isFirstLaunch) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
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
  const animation = useRef<LottieView>(null);

  if (isLoading) {
    return <CustomSpinner />;
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
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerAnimation: {
    width: s(120),
    height: s(120),
  },
});
