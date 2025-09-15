import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../styles/colors";
import { useProfile } from "../context/ProfileContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useImagePreloader } from "../hooks/useImagePreloader";
import { APP_IMAGES } from "../data/AppImages";

interface FormData {
  firstName: string;
  lastName: string;
  age: string;
  weight: string;
  height: string;
  gender: "male" | "female" | "";
}

const OnboardingScreen = () => {
  const { saveProfileWithData, isLoading } = useProfile();

  const { imagesLoaded, loading: imageLoading } = useImagePreloader(
    APP_IMAGES.GUIDE
  );

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [isCompleting, setIsCompleting] = useState(false);

  const steps = [
    {
      title: "Merhaba! 👋",
      fields: ["firstName", "lastName"],
    },
    {
      title: "Biraz daha bilgi 📊",
      fields: ["age", "gender"],
    },
    {
      title: "Son adım! 📏",
      fields: ["height", "weight"],
    },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};
    const currentFields = steps[step].fields;

    currentFields.forEach((field) => {
      if (!formData[field as keyof FormData]) {
        newErrors[field as keyof FormData] = "Bu alan zorunludur";
      }
    });

    if (currentFields.includes("age") && formData.age) {
      const age = parseInt(formData.age);
      if (age < 13 || age > 120) {
        newErrors.age = "Yaş 13-120 arasında olmalıdır";
      }
    }

    if (currentFields.includes("height") && formData.height) {
      const height = parseInt(formData.height);
      if (height < 100 || height > 250) {
        newErrors.height = "Boy 100-250 cm arasında olmalıdır";
      }
    }

    if (currentFields.includes("weight") && formData.weight) {
      const weight = parseInt(formData.weight);
      if (weight < 30 || weight > 300) {
        newErrors.weight = "Kilo 30-300 kg arasında olmalıdır";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          setCurrentStep(currentStep + 1);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }).start();
        });
      } else {
        if (imagesLoaded) {
          handleComplete();
        }
      }
    }
  };

  const getButtonText = () => {
    if (currentStep === steps.length - 1) {
      if (imageLoading) return "Hazırlanıyor...";
      if (!imagesLoaded) return "Yükleniyor...";
      return "🚀 Başlayalım!";
    }
    return "İleri";
  };

  const isButtonDisabled = () => {
    if (currentStep === steps.length - 1) {
      return !imagesLoaded || isCompleting;
    }
    return false;
  };

  const handleBack = () => {
    if (currentStep > 0) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setCurrentStep(currentStep - 1);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const handleComplete = async () => {
    if (isCompleting) return;

    setIsCompleting(true);

    try {
      const profileData = {
        name: formData.firstName.trim(),
        surname: formData.lastName.trim(),
        age: formData.age.trim(),
        weight: formData.weight.trim(),
        height: formData.height.trim(),
        gender: formData.gender.trim(),
      };

      await saveProfileWithData(profileData);
    } catch (error) {
      console.error("Onboarding save error:", error);
      Alert.alert(
        "Hata",
        "Bilgiler kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.",
        [{ text: "Tamam" }]
      );
    } finally {
      setIsCompleting(false);
    }
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      {steps.map((_, index) => (
        <View
          key={index}
          style={[
            styles.progressDot,
            index <= currentStep
              ? styles.progressDotActive
              : styles.progressDotInactive,
          ]}
        />
      ))}
    </View>
  );

  const renderGenderSelector = () => (
    <View style={styles.genderContainer}>
      <Text style={styles.label}>Cinsiyet</Text>
      <View style={styles.genderButtons}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            formData.gender === "male" && styles.genderButtonActive,
          ]}
          onPress={() => updateFormData("gender", "male")}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.genderButtonText,
              formData.gender === "male" && styles.genderButtonTextActive,
            ]}
          >
            👨 Erkek
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderButton,
            formData.gender === "female" && styles.genderButtonActive,
          ]}
          onPress={() => updateFormData("gender", "female")}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.genderButtonText,
              formData.gender === "female" && styles.genderButtonTextActive,
            ]}
          >
            👩 Kadın
          </Text>
        </TouchableOpacity>
      </View>
      {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
    </View>
  );

  const renderInput = (
    field: keyof FormData,
    placeholder: string,
    keyboardType: "default" | "numeric" = "default",
    icon: string = ""
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        {icon} {placeholder}
      </Text>
      <TextInput
        style={[styles.input, errors[field] && styles.inputError]}
        value={formData[field]}
        onChangeText={(text) => updateFormData(field, text)}
        placeholder={`${placeholder} girin`}
        placeholderTextColor={AppColors.lightGray}
        keyboardType={keyboardType}
      />
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  const currentStepData = steps[currentStep];

  return (
    <LinearGradient
      colors={[AppColors.blackBgColor, AppColors.grayBgColor]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {/* Progress Bar */}
          {renderProgressBar()}

          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>{currentStepData.title}</Text>
              </View>

              {/* Form Fields */}
              <View style={styles.formContainer}>
                {/* Step 0: Ad Soyad */}
                {currentStep === 0 && (
                  <>
                    {renderInput("firstName", "Ad", "default", "👤")}
                    {renderInput("lastName", "Soyad", "default", "👤")}
                  </>
                )}

                {/* Step 1: Yaş ve Cinsiyet */}
                {currentStep === 1 && (
                  <>
                    {renderInput("age", "Yaş", "numeric", "🎂")}
                    {renderGenderSelector()}
                  </>
                )}

                {/* Step 2: Boy ve Kilo */}
                {currentStep === 2 && (
                  <>
                    {renderInput("height", "Boy (cm)", "numeric", "📏")}
                    {renderInput("weight", "Kilo (kg)", "numeric", "⚖️")}
                  </>
                )}
              </View>
            </Animated.View>
          </ScrollView>

          {/* Navigation Buttons */}
          <View style={styles.buttonContainer}>
            {currentStep > 0 && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleBack}
                activeOpacity={0.8}
              >
                <AntDesign
                  name="arrowleft"
                  size={18}
                  color={AppColors.lightGray}
                  style={styles.backIcon}
                />
                <Text style={styles.backButtonText}>Geri</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                styles.nextButtonWrapper,
                isButtonDisabled() && styles.buttonDisabled,
              ]}
              onPress={handleNext}
              activeOpacity={0.8}
              disabled={isButtonDisabled()}
            >
              <LinearGradient
                colors={
                  isButtonDisabled()
                    ? [AppColors.lightGray, AppColors.lightGray]
                    : [AppColors.limeGreenColor, "#4ECDC4"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.nextButton}
              >
                <View style={styles.buttonContent}>
                  <Text style={styles.nextButtonText}>{getButtonText()}</Text>
                  {currentStep !== steps.length - 1 && (
                    <AntDesign
                      name="arrowright"
                      size={18}
                      color="white"
                      style={styles.iconStlye}
                    />
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingVertical: vs(24),
  },
  keyboardContainer: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: vs(20),
    marginBottom: vs(30),
  },
  progressDot: {
    width: s(12),
    height: s(12),
    borderRadius: s(6),
    marginHorizontal: s(4),
  },
  progressDotActive: {
    backgroundColor: AppColors.limeGreenColor,
  },
  progressDotInactive: {
    backgroundColor: AppColors.lightGray,
    opacity: 0.3,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: s(24),
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: vs(40),
  },
  title: {
    fontSize: s(28),
    fontFamily: "Roboto-Bold",
    color: AppColors.whiteColor,
    textAlign: "center",
    marginBottom: vs(8),
  },

  formContainer: {
    marginBottom: vs(30),
  },
  inputContainer: {
    marginBottom: vs(20),
  },
  label: {
    fontSize: s(16),
    fontFamily: "Roboto-Medium",
    color: AppColors.whiteColor,
    marginBottom: vs(8),
  },
  input: {
    backgroundColor: AppColors.grayBgColor,
    borderRadius: s(12),
    paddingHorizontal: s(16),
    paddingVertical: vs(14),
    fontSize: s(16),
    fontFamily: "Roboto-Regular",
    color: AppColors.whiteColor,
    borderWidth: 1,
    borderColor: "transparent",
  },
  inputError: {
    borderColor: "#FF6B6B",
  },
  errorText: {
    fontSize: s(12),
    fontFamily: "Roboto-Regular",
    color: "#FF6B6B",
    marginTop: vs(4),
  },
  genderContainer: {
    marginBottom: vs(20),
  },
  genderButtons: {
    flexDirection: "row",
    gap: s(12),
  },
  genderButton: {
    flex: 1,
    backgroundColor: AppColors.grayBgColor,
    borderRadius: s(12),
    paddingVertical: vs(16),
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  genderButtonActive: {
    borderColor: AppColors.limeGreenColor,
    backgroundColor: `${AppColors.limeGreenColor}20`,
  },
  genderButtonText: {
    fontSize: s(16),
    fontFamily: "Roboto-Medium",
    color: AppColors.lightGray,
  },
  genderButtonTextActive: {
    color: AppColors.limeGreenColor,
  },

  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: s(24),
    paddingBottom: vs(20),
    gap: s(12),
  },
  backButton: {
    flex: 1,
    backgroundColor: AppColors.grayBgColor,
    borderRadius: s(12),
    paddingVertical: vs(16),
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: s(16),
    fontFamily: "Roboto-Medium",
    color: AppColors.lightGray,
  },
  nextButtonWrapper: {
    flex: 2,
  },
  nextButton: {
    borderRadius: s(12),
    paddingVertical: vs(16),
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    fontSize: s(16),
    fontFamily: "Roboto-Bold",
    color: AppColors.whiteColor,
  },
  iconStlye: {
    position: "absolute",
    marginLeft: s(32),
    marginTop: s(3),
  },
  backIcon: {
    position: "absolute",
    marginRight: s(52),
    marginTop: s(3),
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
