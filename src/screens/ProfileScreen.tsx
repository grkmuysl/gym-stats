import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import CustomModal from "../components/CustomModal/CustomModal";
import { useProfile } from "../context/ProfileContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen: React.FC = () => {
  const {
    profileInformation,
    setName,
    setSurname,
    setAge,
    setWeight,
    setHeight,
    saveProfileInformation,
    isLoading,
  } = useProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    firstName: "",
    lastName: "",
    age: "",
    weight: "",
    height: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });

  useEffect(() => {
    setEditedProfile({
      firstName: profileInformation.name,
      lastName: profileInformation.surname,
      age: profileInformation.age,
      weight: profileInformation.weight,
      height: profileInformation.height,
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

    try {
      setName(editedProfile.firstName.trim());
      setSurname(editedProfile.lastName.trim());
      setAge(editedProfile.age.trim());
      setWeight(editedProfile.weight.trim());
      setHeight(editedProfile.height.trim());

      // Direkt değerleri AsyncStorage'a kaydet
      const profileData = {
        name: editedProfile.firstName.trim(),
        surname: editedProfile.lastName.trim(),
        age: editedProfile.age.trim(),
        weight: editedProfile.weight.trim(),
        height: editedProfile.height.trim(),
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
    });
    setIsEditing(false);
  };

  const getFullName = () => {
    return `${profileInformation.name} ${profileInformation.surname}`.trim();
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={AppColors.limeGreenColor} />
          <Text style={styles.loadingText}>Profil yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Profil Bilgileri</Text>
              {getFullName() && (
                <Text style={styles.headerSubtitle}>{getFullName()}</Text>
              )}
            </View>

            {!isEditing && (
              <TouchableOpacity
                onPress={() => setIsEditing(true)}
                activeOpacity={0.8}
                style={styles.editBtnContainer}
              >
                <LinearGradient
                  colors={[AppColors.limeGreenColor, "#4ECDC4"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.editButton, styles.gradientButton]}
                >
                  <Text style={styles.editButtonText}>✏️ Düzenle</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            {/* Kişisel Bilgiler */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📝 Kişisel Bilgiler</Text>

              {/* Ad */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Ad</Text>
                <TextInput
                  style={[styles.input, !isEditing && styles.inputDisabled]}
                  value={editedProfile.firstName}
                  onChangeText={(text) =>
                    setEditedProfile({ ...editedProfile, firstName: text })
                  }
                  placeholder="Adınızı girin"
                  placeholderTextColor={AppColors.lightGray}
                  editable={isEditing}
                />
              </View>

              {/* Soyad */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Soyad</Text>
                <TextInput
                  style={[styles.input, !isEditing && styles.inputDisabled]}
                  value={editedProfile.lastName}
                  onChangeText={(text) =>
                    setEditedProfile({ ...editedProfile, lastName: text })
                  }
                  placeholder="Soyadınızı girin"
                  placeholderTextColor={AppColors.lightGray}
                  editable={isEditing}
                />
              </View>

              {/* Yaş */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Yaş</Text>
                <TextInput
                  style={[styles.input, !isEditing && styles.inputDisabled]}
                  value={editedProfile.age}
                  onChangeText={(text) =>
                    setEditedProfile({ ...editedProfile, age: text })
                  }
                  placeholder="Yaşınızı girin"
                  placeholderTextColor={AppColors.lightGray}
                  keyboardType="numeric"
                  editable={isEditing}
                />
              </View>
            </View>

            {/* Fiziksel Özellikler */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📏 Fiziksel Özellikler</Text>

              {/* Kilo */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Kilo (kg)</Text>
                <TextInput
                  style={[styles.input, !isEditing && styles.inputDisabled]}
                  value={editedProfile.weight}
                  onChangeText={(text) =>
                    setEditedProfile({ ...editedProfile, weight: text })
                  }
                  placeholder="Kilonuzu girin"
                  placeholderTextColor={AppColors.lightGray}
                  keyboardType="numeric"
                  editable={isEditing}
                />
              </View>

              {/* Boy */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Boy (cm)</Text>
                <TextInput
                  style={[styles.input, !isEditing && styles.inputDisabled]}
                  value={editedProfile.height}
                  onChangeText={(text) =>
                    setEditedProfile({ ...editedProfile, height: text })
                  }
                  placeholder="Boyunuzu girin"
                  placeholderTextColor={AppColors.lightGray}
                  keyboardType="numeric"
                  editable={isEditing}
                />
              </View>
            </View>

            {/* Özet Bilgiler */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📊 Özet Bilgiler</Text>
              <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>👤 Yaş</Text>
                  <Text style={styles.summaryValue}>
                    {editedProfile.age
                      ? `${editedProfile.age} yaşında`
                      : "Belirtilmemiş"}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>⚖️ Kilo</Text>
                  <Text style={styles.summaryValue}>
                    {editedProfile.weight
                      ? `${editedProfile.weight} kg`
                      : "Belirtilmemiş"}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>📏 Boy</Text>
                  <Text style={styles.summaryValue}>
                    {editedProfile.height
                      ? `${editedProfile.height} cm`
                      : "Belirtilmemiş"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          {isEditing && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={handleCancel}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#FF6B6B", "#ff554cea"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.button, styles.gradientButton]}
                >
                  <Text style={styles.buttonText}>❌ İptal</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={handleSaveImproved}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[AppColors.limeGreenColor, "#4ECDC4"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.button, styles.gradientButton]}
                >
                  <Text style={styles.buttonText}>💾 Kaydet</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

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

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    padding: s(20),
    paddingBottom: vs(40),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: s(16),
    fontFamily: "Roboto-Regular",
    color: AppColors.lightGray,
    marginTop: vs(10),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: vs(12),
  },
  headerTitle: {
    fontSize: s(22),
    position: "relative",
    top: s(6),
    fontFamily: "Roboto-Bold",
    color: AppColors.whiteColor,
  },
  headerSubtitle: {
    fontSize: s(16),
    fontFamily: "Roboto-Regular",
    color: AppColors.lightGray,
    marginTop: vs(12),
  },
  editButton: {
    width: s(112),
    height: vs(40),
    borderRadius: s(12),
    alignItems: "center",
    justifyContent: "center",
  },
  editBtnContainer: {
    position: "absolute",
    right: 10,
    top: 6,
  },
  editButtonText: {
    color: AppColors.whiteColor,
    fontSize: s(14),
    fontFamily: "Roboto-Medium",
  },
  profileCard: {
    backgroundColor: AppColors.grayBgColor || "#1C1C1E",
    borderRadius: s(20),
    padding: s(20),
    marginBottom: vs(20),
  },
  section: {
    marginBottom: vs(12),
  },
  sectionTitle: {
    fontSize: s(18),
    fontFamily: "Roboto-Bold",
    color: AppColors.whiteColor,
    marginBottom: vs(15),
  },
  inputGroup: {
    marginBottom: vs(15),
  },
  label: {
    fontSize: s(14),
    fontFamily: "Roboto-Medium",
    color: AppColors.lightGray,
    marginBottom: vs(6),
  },
  input: {
    backgroundColor: "#000",
    borderRadius: s(12),
    padding: s(15),
    fontSize: s(16),
    color: AppColors.whiteColor,
    fontFamily: "Roboto-Regular",
    borderWidth: 1,
    borderColor: AppColors.lightGray || "#333",
  },
  inputDisabled: {
    backgroundColor: AppColors.grayBgColor || "#2C2C2E",
    color: AppColors.whiteColor || "#999",
    borderColor: "white",
    borderWidth: s(0.5),
  },
  summaryContainer: {
    backgroundColor: "#000",
    borderRadius: s(12),
    padding: s(15),
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: vs(8),
  },
  summaryLabel: {
    fontSize: s(14),
    fontFamily: "Roboto-Regular",
    color: AppColors.lightGray,
  },
  summaryValue: {
    fontSize: s(14),
    fontFamily: "Roboto-Medium",
    color: AppColors.whiteColor,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: s(15),
  },
  button: {
    flex: 1,
    paddingVertical: vs(15),
    borderRadius: s(12),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: s(16),
    fontFamily: "Roboto-Bold",
    color: AppColors.whiteColor,
  },
  buttonWrapper: {
    flex: 1,
    borderRadius: s(16),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  gradientButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
});
