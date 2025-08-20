import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";

const { width } = Dimensions.get("window");

type CustomModalProps = {
  visible: boolean;
  type: "success" | "error";
  title: string;
  message: string;
  onClose: () => void;
};

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  type,
  title,
  message,
  onClose,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 150,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        handleClose();
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 150,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 150,
        friction: 8,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const getIcon = () => {
    return type === "success" ? "✅" : "❌";
  };

  const getColor = () => {
    return type === "success" ? "#4ECDC4" : "#FF6B6B";
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
    >
      <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
        <TouchableOpacity
          style={styles.overlayTouch}
          activeOpacity={1}
          onPress={handleClose}
        >
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [{ scale: scaleAnim }],
                borderColor: getColor(),
              },
            ]}
          >
            {/* Icon */}
            <View
              style={[styles.iconContainer, { backgroundColor: getColor() }]}
            >
              <Text style={styles.icon}>{getIcon()}</Text>
            </View>

            {/* Content */}
            <View style={styles.content}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <Animated.View
                style={[styles.progressBar, { backgroundColor: getColor() }]}
              />
            </View>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayTouch: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modalContainer: {
    backgroundColor: AppColors.grayBgColor || "#1C1C1E",
    borderRadius: s(20),
    padding: s(24),
    marginHorizontal: s(20),
    maxWidth: width - s(40),
    minWidth: width - s(80),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 1,
  },
  iconContainer: {
    width: s(60),
    height: s(60),
    borderRadius: s(30),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: vs(16),
  },
  icon: {
    fontSize: s(28),
  },
  content: {
    alignItems: "center",
    marginBottom: vs(20),
  },
  title: {
    fontSize: s(20),
    fontFamily: "Roboto-Bold",
    color: AppColors.whiteColor,
    marginBottom: vs(8),
    textAlign: "center",
  },
  message: {
    fontSize: s(16),
    fontFamily: "Roboto-Regular",
    color: AppColors.lightGray,
    textAlign: "center",
    lineHeight: s(22),
  },
  progressContainer: {
    width: "100%",
    height: s(3),
    backgroundColor: AppColors.grayBgColor || "#000",
    borderRadius: s(2),
    overflow: "hidden",
    marginBottom: vs(12),
  },
  progressBar: {
    height: "100%",
    width: "100%",
    borderRadius: s(2),
  },
  closeButton: {
    position: "absolute",
    top: s(12),
    right: s(12),
    width: s(30),
    height: s(30),
    borderRadius: s(15),
    backgroundColor: AppColors.grayBgColor || "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: s(16),
    color: AppColors.lightGray,
    fontFamily: "Roboto-Medium",
  },
});
