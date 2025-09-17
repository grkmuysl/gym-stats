import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Animated,
} from "react-native";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import CustomModal from "../components/CustomModal/CustomModal";
import { useProfile } from "../context/ProfileContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomSpinner from "../components/Spinner/CustomSpinner";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen: React.FC = () => {
  const {
    profileInformation,
    setName,
    setSurname,
    setAge,
    setWeight,
    setHeight,
    isLoading,
  } = useProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    firstName: "",
    lastName: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    setEditedProfile({
      firstName: profileInformation.name,
      lastName: profileInformation.surname,
      age: profileInformation.age,
      weight: profileInformation.weight,
      height: profileInformation.height,
      gender: profileInformation.gender,
    });
  }, [profileInformation]);

  const showModal = (
    type: "success" | "error",
    title: string,
    message: string
  ) => {
    setModalConfig({ type, title, message });
    setModalVisible(true);
  };

  const handleSaveImproved = async () => {
    if (!editedProfile.firstName.trim()) {
      showModal("error", "Hata", "Ad alanı boş olamaz!");
      return;
    }

    if (!editedProfile.lastName.trim()) {
      showModal("error", "Hata", "Soyad alanı boş olamaz!");
      return;
    }

    const age = parseInt(editedProfile.age.trim());
    if (!editedProfile.age.trim()) {
      showModal("error", "Hata", "Yaş alanı boş olamaz!");
      return;
    }
    if (isNaN(age) || age < 1 || age > 120) {
      showModal("error", "Hata", "Lütfen geçerli bir yaş girin.");
      return;
    }

    const weight = parseFloat(editedProfile.weight.trim());
    if (!editedProfile.weight.trim()) {
      showModal("error", "Hata", "Kilo alanı boş olamaz!");
      return;
    }
    if (isNaN(weight) || weight < 20 || weight > 300) {
      showModal("error", "Hata", "Lütfen geçerli bir kilo girin.");
      return;
    }

    const height = parseInt(editedProfile.height.trim());
    if (!editedProfile.height.trim()) {
      showModal("error", "Hata", "Boy alanı boş olamaz!");
      return;
    }
    if (isNaN(height) || height < 50 || height > 250) {
      showModal("error", "Hata", "Lütfen geçerli bir boy girin.");
      return;
    }

    try {
      setName(editedProfile.firstName.trim());
      setSurname(editedProfile.lastName.trim());
      setAge(editedProfile.age.trim());
      setWeight(editedProfile.weight.trim());
      setHeight(editedProfile.height.trim());

      const profileData = {
        name: editedProfile.firstName.trim(),
        surname: editedProfile.lastName.trim(),
        age: editedProfile.age.trim(),
        weight: editedProfile.weight.trim(),
        height: editedProfile.height.trim(),
        gender: editedProfile.gender.trim(),
      };

      await AsyncStorage.setItem(
        "ProfileInformation",
        JSON.stringify(profileData)
      );

      setIsEditing(false);
      showModal("success", "Başarılı!", "Profil bilgileri kaydedildi.");
    } catch (error) {
      console.error("Profile save error:", error);
      showModal("error", "Hata!", "Profil bilgileri kaydedilemedi.");
    }
  };

  const handleCancel = () => {
    setEditedProfile({
      firstName: profileInformation.name,
      lastName: profileInformation.surname,
      age: profileInformation.age,
      weight: profileInformation.weight,
      height: profileInformation.height,
      gender: profileInformation.gender,
    });
    setIsEditing(false);
  };

  const getFullName = () => {
    return `${profileInformation.name} ${profileInformation.surname}`.trim();
  };

  if (isLoading) {
    return <CustomSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#131313ff", AppColors.blackBgColor]}
        style={styles.gradientBg}
      >
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              }}
            >
              {/* Minimal Header */}
              <View style={styles.header}>
                <View style={styles.headerContent}>
                  <View>
                    <Text style={styles.headerTitle}>Profil Bilgileri</Text>
                    {getFullName() && (
                      <Text style={styles.headerName}>{getFullName()}</Text>
                    )}
                  </View>

                  {!isEditing && (
                    <TouchableOpacity
                      onPress={() => setIsEditing(true)}
                      style={styles.editButton}
                      activeOpacity={0.7}
                    >
                      <LinearGradient
                        colors={[
                          "rgba(255,255,255,0.1)",
                          "rgba(255,255,255,0.05)",
                        ]}
                        style={styles.editButtonGradient}
                      >
                        <Ionicons
                          name="create-outline"
                          size={20}
                          color="#FFF"
                        />
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Info Cards */}
              <View style={styles.cardsContainer}>
                {/* Personal Info Card */}
                <View style={styles.infoCard}>
                  <View style={styles.cardHeader}>
                    <View style={styles.iconContainer}>
                      <Ionicons
                        name="person-outline"
                        size={18}
                        color={AppColors.limeGreenColor}
                      />
                    </View>
                    <Text style={styles.cardTitle}>Kişisel Bilgiler</Text>
                  </View>

                  <View style={styles.cardContent}>
                    {/* Ad */}
                    <View style={styles.modernInputGroup}>
                      <Text style={styles.modernLabel}>Ad</Text>
                      <View style={styles.inputWrapper}>
                        <TextInput
                          style={[
                            styles.modernInput,
                            !isEditing && styles.inputDisabled,
                          ]}
                          value={editedProfile.firstName}
                          onChangeText={(text) =>
                            setEditedProfile({
                              ...editedProfile,
                              firstName: text,
                            })
                          }
                          placeholder="Adınızı girin"
                          placeholderTextColor="#444"
                          editable={isEditing}
                        />
                      </View>
                    </View>

                    {/* Soyad */}
                    <View style={styles.modernInputGroup}>
                      <Text style={styles.modernLabel}>Soyad</Text>
                      <View style={styles.inputWrapper}>
                        <TextInput
                          style={[
                            styles.modernInput,
                            !isEditing && styles.inputDisabled,
                          ]}
                          value={editedProfile.lastName}
                          onChangeText={(text) =>
                            setEditedProfile({
                              ...editedProfile,
                              lastName: text,
                            })
                          }
                          placeholder="Soyadınızı girin"
                          placeholderTextColor="#444"
                          editable={isEditing}
                        />
                      </View>
                    </View>

                    {/* Yaş */}
                    <View style={styles.modernInputGroup}>
                      <Text style={styles.modernLabel}>Yaş</Text>
                      <View style={styles.inputWrapper}>
                        <TextInput
                          style={[
                            styles.modernInput,
                            !isEditing && styles.inputDisabled,
                          ]}
                          value={editedProfile.age}
                          onChangeText={(text) =>
                            setEditedProfile({ ...editedProfile, age: text })
                          }
                          placeholder="Yaşınızı girin"
                          placeholderTextColor="#444"
                          keyboardType="numeric"
                          editable={isEditing}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                {/* Physical Info Card */}
                <View style={styles.infoCard}>
                  <View style={styles.cardHeader}>
                    <View style={[styles.iconContainer, styles.physicalIcon]}>
                      <Ionicons
                        name="fitness-outline"
                        size={18}
                        color="#4ECDC4"
                      />
                    </View>
                    <Text style={styles.cardTitle}>Fiziksel Özellikler</Text>
                  </View>

                  <View style={styles.cardContent}>
                    {/* Kilo */}
                    <View style={styles.modernInputGroup}>
                      <Text style={styles.modernLabel}>Kilo</Text>
                      <View style={styles.inputWrapper}>
                        <TextInput
                          style={[
                            styles.modernInput,
                            !isEditing && styles.inputDisabled,
                          ]}
                          value={editedProfile.weight}
                          onChangeText={(text) =>
                            setEditedProfile({
                              ...editedProfile,
                              weight: text,
                            })
                          }
                          placeholder="Kilonuzu girin"
                          placeholderTextColor="#444"
                          keyboardType="numeric"
                          editable={isEditing}
                        />
                        {editedProfile.weight !== "" && (
                          <Text style={styles.unitText}>kg</Text>
                        )}
                      </View>
                    </View>

                    {/* Boy */}
                    <View style={styles.modernInputGroup}>
                      <Text style={styles.modernLabel}>Boy</Text>
                      <View style={styles.inputWrapper}>
                        <TextInput
                          style={[
                            styles.modernInput,
                            !isEditing && styles.inputDisabled,
                          ]}
                          value={editedProfile.height}
                          onChangeText={(text) =>
                            setEditedProfile({
                              ...editedProfile,
                              height: text,
                            })
                          }
                          placeholder="Boyunuzu girin"
                          placeholderTextColor="#444"
                          keyboardType="numeric"
                          editable={isEditing}
                        />
                        {editedProfile.height !== "" && (
                          <Text style={styles.unitText}>cm</Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              {isEditing && (
                <Animated.View
                  style={[
                    styles.actionButtons,
                    {
                      opacity: fadeAnim,
                      transform: [
                        {
                          translateY: fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [20, 0],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={handleCancel}
                    activeOpacity={0.8}
                  >
                    <View style={styles.cancelButton}>
                      <Text style={styles.cancelButtonText}>İptal</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.saveButton]}
                    onPress={handleSaveImproved}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={[AppColors.limeGreenColor, "#4ECDC4"]}
                      style={styles.gradientSaveButton}
                    >
                      <Text style={styles.saveButtonText}>Kaydet</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>
              )}
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>

      <CustomModal
        visible={modalVisible}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default React.memo(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: vs(16),
  },
  gradientBg: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: vs(30),
  },

  // Minimal Header
  header: {
    paddingHorizontal: s(20),
    paddingTop: vs(20),
    paddingBottom: vs(30),
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: s(24),
    fontFamily: "Roboto-Bold",
    color: "#FFF",
    marginBottom: vs(4),
  },
  headerName: {
    fontSize: s(16),
    fontFamily: "Roboto-Regular",
    color: "#666",
  },
  editButton: {
    borderRadius: s(20),
  },
  editButtonGradient: {
    width: s(40),
    height: s(40),
    borderRadius: s(20),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  // Cards
  cardsContainer: {
    paddingHorizontal: s(20),
    gap: vs(16),
  },
  infoCard: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: s(16),
    padding: s(20),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: vs(20),
  },
  iconContainer: {
    width: s(32),
    height: s(32),
    borderRadius: s(8),
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: s(12),
  },
  physicalIcon: {
    backgroundColor: "rgba(78,205,196,0.1)",
  },
  cardTitle: {
    fontSize: s(16),
    fontFamily: "Roboto-Medium",
    color: "#FFF",
  },
  cardContent: {
    gap: vs(16),
  },

  // Modern Inputs
  modernInputGroup: {
    gap: vs(6),
  },
  modernLabel: {
    fontSize: s(12),
    fontFamily: "Roboto-Regular",
    color: "#666",
    marginLeft: s(2),
  },
  inputWrapper: {
    position: "relative",
  },
  modernInput: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: s(12),
    paddingHorizontal: s(16),
    paddingVertical: vs(14),
    fontSize: s(16),
    color: "#FFF",
    fontFamily: "Roboto-Regular",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  inputDisabled: {
    backgroundColor: "transparent",
    borderColor: "rgba(255,255,255,0.05)",
  },
  unitText: {
    position: "absolute",
    right: s(16),
    top: "50%",
    transform: [{ translateY: -10 }],
    fontSize: s(14),
    color: "#999",
    fontFamily: "Roboto-Regular",
  },

  // Action Buttons
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: s(20),
    marginTop: vs(24),
    gap: s(12),
  },
  actionButton: {
    flex: 1,
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: vs(16),
    borderRadius: s(12),
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  cancelButtonText: {
    fontSize: s(16),
    fontFamily: "Roboto-Medium",
    color: "#d6d6d6",
  },
  saveButton: {
    flex: 1.5,
  },
  gradientSaveButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: vs(16),
    borderRadius: s(12),
  },
  saveButtonText: {
    fontSize: s(16),
    fontFamily: "Roboto-Bold",
    color: "#FFF",
  },
});
