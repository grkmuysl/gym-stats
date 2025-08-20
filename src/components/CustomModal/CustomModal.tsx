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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (visible) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

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

      timeoutRef.current = setTimeout(() => {
        if (visible) {
          handleClose();
        }
      }, 2000);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [visible]);

  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    onClose();
  };

  const getIcon = () => {
    return type === "success" ? "✅" : "❌";
  };

  const getColor = () => {
    return type === "success" ? "#4ECDC4" : "#FF6B6B";
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
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
                opacity: opacityAnim,
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
              <View
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
      </View>
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
    backgroundColor: "#1C1C1E",
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
    color: "#FFFFFF",
    marginBottom: vs(8),
    textAlign: "center",
  },
  message: {
    fontSize: s(16),
    fontFamily: "Roboto-Regular",
    color: "#A0A0A0",
    textAlign: "center",
    lineHeight: s(22),
  },
  progressContainer: {
    width: "100%",
    height: s(3),
    backgroundColor: "#000",
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
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: s(16),
    color: "#A0A0A0",
    fontFamily: "Roboto-Medium",
  },
});
