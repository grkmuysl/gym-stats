import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import AppButton from "../components/Button/AppButton";

const { width } = Dimensions.get("window");

const EmptyFavoritesScreen = () => {
  const navigation = useNavigation();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const preloadImage = async () => {
      try {
        await Image.prefetch(require("../assets/images/empty-gym.png"));
        setImageLoaded(true);
      } catch (error) {
        setImageLoaded(true);
      }
    };

    preloadImage();
  }, []);

  const goToAllExercises = () => {
    navigation.navigate("Tüm Egzersizler");
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundImageContainer}>
        <Image
          source={require("../assets/images/empty-gym.png")}
          style={styles.backgroundImage}
          blurRadius={20}
        />
        <View style={styles.overlay} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={require("../assets/images/empty-gym.png")}
            style={[styles.img, { opacity: imageLoaded ? 1 : 0 }]}
            onLoad={() => setImageLoaded(true)}
            transition={200}
          />
          <View style={styles.imageBadge} />
        </View>

        <BlurView intensity={30} tint="dark" style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.title}>Favoriler Listeniz Boş</Text>
            <Text style={styles.subtitle}>Egzersizler sizi bekliyor</Text>

            <AppButton
              onPress={goToAllExercises}
              title="Egzersizlere Git"
              style={styles.button}
              textStyle={styles.buttonText}
            />
          </View>
        </BlurView>
      </View>
    </View>
  );
};

export default EmptyFavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  backgroundImageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10, 10, 10, 0.85)",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: s(24),
  },
  imageWrapper: {
    position: "relative",
    marginBottom: vs(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  img: {
    height: vs(180),
    width: s(180),
    borderRadius: s(90),
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  imageBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: s(30),
    height: s(30),
    borderRadius: s(15),
    backgroundColor: AppColors.limeGreenColor,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  card: {
    width: width - s(48),
    borderRadius: s(24),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  cardContent: {
    padding: s(24),
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: s(22),
    fontFamily: "Roboto-Bold",
    marginBottom: vs(12),
    textAlign: "center",
  },
  subtitle: {
    color: AppColors.lightGray,
    fontSize: s(16),
    fontFamily: "Roboto-Regular",
    marginBottom: vs(32),
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: vs(8),
    paddingHorizontal: s(32),
    borderRadius: s(50),
    width: "100%",
    height: vs(48),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: s(16),
    fontFamily: "Roboto-Bold",
  },
});
