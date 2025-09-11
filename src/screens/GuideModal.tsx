import React, { useState, useRef } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export const GuideModal = ({ visible, onClose, navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef(null);

  const pages = [
    {
      colors: ["#161616", "#393939"],
      title: "Spor Günlüğü'ne Hoşgeldin!",
      subtitle: "Antrenmanlarını kaydet ve ilerlemeni takip et",
      image: require("../assets/images/step-0.png"),
    },
    {
      colors: ["#393939", "#26d448ff"],
      title: "Egzersizlerini Kaydet",
      subtitle: "Set, tekrar ve ağırlıkları kolayca kaydet",
      image: require("../assets/images/step-1.png"),
    },
    {
      colors: ["#0df93e", "#089a2cff"],

      title: "İlerlemeni Görüntüle",
      subtitle: "Grafik ve istatistiklerle gelişimini takip et",
      image: require("../assets/images/step-2.png"),
    },
    {
      colors: ["#00b82f", "#161616"],
      title: "Hazırsan Başlayalım!",
      subtitle: "İlk antrenmanını kaydetmeye hazır mısın?",
      image: require("../assets/images/step-3.png"),
    },
  ];

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      const nextIndex = currentPage + 1;
      setCurrentPage(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    onClose();
    navigation?.replace("Home");
  };

  const handleScroll = (event) => {
    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentPage(pageIndex);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <StatusBar backgroundColor="transparent" barStyle="light-content" />

      <LinearGradient
        colors={pages[currentPage].colors}
        style={styles.container}
      >
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        {/* Content */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          style={styles.scrollView}
        >
          {pages.map((page, index) => (
            <View key={index} style={styles.page}>
              {/* Image */}
              <View style={styles.imageContainer}>
                <Image source={page.image} style={styles.image} />
              </View>

              {/* Text */}
              <Text style={styles.title}>{page.title}</Text>
              <Text style={styles.subtitle}>{page.subtitle}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Indicators */}
          <View style={styles.indicators}>
            {pages.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === currentPage && styles.activeDot]}
              />
            ))}
          </View>

          {/* Next Button */}
          <TouchableOpacity style={styles.nextButton} onPress={nextPage}>
            <Text style={styles.nextButtonText}>
              {currentPage === pages.length - 1 ? "Başla" : "İleri"}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1000,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  page: {
    width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 40,
  },

  imageContainer: {
    width: 320,
    height: 416,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  image: {
    width: 280,
    height: 400,
    resizeMode: "contain",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
    lineHeight: 28,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "rgba(255,255,255,0.8)",
    lineHeight: 22,
    paddingHorizontal: 15,
  },
  bottomSection: {
    paddingBottom: 40,
    paddingHorizontal: 30,
    alignItems: "center",
    paddingTop: 20,
  },
  indicators: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    backgroundColor: "white",
  },
  nextButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 35,
    paddingVertical: 14,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
