import React, { useState } from "react";
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
} from "react-native";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import CustomModal from "../components/CustomModal/CustomModal";

type UserProfile = {
  firstName: string;
  lastName: string;
  age: string;
  weight: string; // kg
  height: string; // cm
};

const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "Ahmet",
    lastName: "Yılmaz",
    age: "28",
    weight: "75",
    height: "180",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });

  const handleSave = () => {
    if (!editedProfile.firstName.trim()) {
      setModalConfig({
        type: "error",
        title: "Hata",
        message: "Ad alanı boş olamaz!",
      });
      setModalVisible(true);
      return;
    }
    if (!editedProfile.lastName.trim()) {
      setModalConfig({
        type: "error",
        title: "Hata",
        message: "Soyad alanı boş olamaz!",
      });
      setModalVisible(true);
      return;
    }

    setProfile(editedProfile);
    setIsEditing(false);
    setModalConfig({
      type: "success",
      title: "Başarılı",
      message: "Profil bilgileri güncellendi!",
    });
    setModalVisible(true);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const getFullName = () => {
    return `${profile.firstName} ${profile.lastName}`.trim();
  };

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
            </View>
            {!isEditing && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.editButtonText}>✏️ Düzenle</Text>
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
                  <Text style={styles.buttonText}>İptal</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={handleSave}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[AppColors.limeGreenColor, "#4ECDC4"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.button, styles.gradientButton]}
                >
                  <Text style={styles.buttonText}>Kaydet</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: vs(20),
  },
  headerTitle: {
    fontSize: s(22),
    fontFamily: "Roboto-Bold",
    color: AppColors.whiteColor,
  },
  headerSubtitle: {
    fontSize: s(16),
    fontFamily: "Roboto-Regular",
    color: AppColors.lightGray,
    marginTop: vs(4),
  },
  editButton: {
    backgroundColor: AppColors.limeGreenColor,
    paddingHorizontal: s(16),
    paddingVertical: vs(8),
    borderRadius: s(20),
  },
  editButtonText: {
    color: AppColors.grayBgColor,
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
  bmiContainer: {
    backgroundColor: "#000",
    borderRadius: s(12),
    padding: s(15),
  },
  bmiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: vs(8),
  },
  bmiLabel: {
    fontSize: s(14),
    fontFamily: "Roboto-Regular",
    color: AppColors.lightGray,
  },
  bmiValue: {
    fontSize: s(20),
    fontFamily: "Roboto-Bold",
    color: AppColors.whiteColor,
  },
  bmiCategory: {
    fontSize: s(16),
    fontFamily: "Roboto-Bold",
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
  cancelButton: {
    backgroundColor: "#FF3B30",
  },
  saveButton: {
    backgroundColor: "#34C759",
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
