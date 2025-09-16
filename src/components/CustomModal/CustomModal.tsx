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
import { Ionicons } from "@expo/vector-icons";
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
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (visible) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 10,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      timeoutRef.current = setTimeout(() => {
        if (visible) {
          handleClose();
        }
      }, 3000);
    } else {
      translateY.setValue(-100);
      opacity.setValue(0);
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

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const getIcon = () => {
    return type === "success" ? "checkmark" : "close";
  };

  const getColor = () => {
    return type === "success" ? "#00D9A3" : "#FF4757";
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleClose}
      >
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ translateY }],
              opacity,
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={[styles.iconWrapper, { backgroundColor: getColor() }]}>
              <Ionicons name={getIcon()} size={20} color="#FFF" />
            </View>

            <View style={styles.textContent}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={20} color={AppColors.whiteColor} />
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-start",
    paddingTop: vs(50),
  },
  container: {
    marginHorizontal: s(16),
  },
  modalContent: {
    backgroundColor: AppColors.blackBgColor,
    borderRadius: s(12),
    padding: s(16),
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  iconWrapper: {
    width: s(36),
    height: s(36),
    borderRadius: s(18),
    justifyContent: "center",
    alignItems: "center",
    marginRight: s(12),
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: s(16),
    fontFamily: "Roboto-Medium",
    color: AppColors.whiteColor,
    marginBottom: vs(2),
  },
  message: {
    fontSize: s(14),
    fontFamily: "Roboto-Regular",
    color: "#666",
    lineHeight: s(18),
  },
  closeButton: {
    marginLeft: s(8),
    padding: s(4),
  },
});
