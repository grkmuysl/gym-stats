import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";

const CustomInput = ({
  type = "string",
  value,
  onValueChange,
  error,
  maxLength,
  minLength,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  style,
  inputStyle,
  labelStyle,
  errorStyle,
  showPasswordToggle = true,
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setInputValue(value.toString());
    } else if (value === null && inputValue !== "") {
      setInputValue("");
    }
  }, [value]);

  const handleValueChange = (text) => {
    let processedValue = text;

    switch (type) {
      case "number":
        processedValue = text.replace(/[^0-9.]/g, "");
        const dotCount = (processedValue.match(/\./g) || []).length;
        if (dotCount > 1) {
          processedValue = processedValue.substring(
            0,
            processedValue.lastIndexOf(".")
          );
        }
        break;

      case "phone":
        processedValue = text.replace(/[^0-9+\-\s()]/g, "");
        break;

      case "email":
        processedValue = text.toLowerCase().trim();
        break;

      case "string":
      default:
        processedValue = text;
        break;
    }

    setInputValue(processedValue);

    if (onValueChange) {
      if (type === "number") {
        if (processedValue === "") {
          onValueChange(null);
        } else {
          const numValue = parseFloat(processedValue);
          onValueChange(isNaN(numValue) ? null : numValue);
        }
      } else {
        onValueChange(processedValue);
      }
    }
  };

  const getKeyboardType = () => {
    switch (type) {
      case "number":
        return "numeric";
      case "email":
        return "email-address";
      case "phone":
        return "phone-pad";
      default:
        return "default";
    }
  };

  const getSecureTextEntry = () => {
    return type === "password" && !isPasswordVisible;
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validateInput = () => {
    if (inputValue && minLength && inputValue.length < minLength) {
      return `En az ${minLength} karakter olmalıdır`;
    }

    if (type === "email" && inputValue) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputValue)) {
        return "Geçerli bir email adresi giriniz";
      }
    }

    if (type === "phone" && inputValue) {
      const phoneRegex = /^[\+]?[0-9\-\s\(\)]{10,}$/;
      if (!phoneRegex.test(inputValue.replace(/\s/g, ""))) {
        return "Geçerli bir telefon numarası giriniz";
      }
    }

    return null;
  };

  const currentError = error || validateInput();

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          currentError && styles.inputContainerError,
          !editable && styles.inputContainerDisabled,
        ]}
      >
        <TextInput
          style={[styles.input, inputStyle]}
          value={inputValue}
          onChangeText={handleValueChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={getKeyboardType()}
          secureTextEntry={getSecureTextEntry()}
          maxLength={maxLength}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          autoCapitalize={type === "email" ? "none" : "sentences"}
          autoCorrect={type !== "email" && type !== "password"}
        />

        {type === "password" && showPasswordToggle && inputValue.length > 0 && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={togglePasswordVisibility}
          >
            <Text style={styles.passwordToggleText}>
              {isPasswordVisible ? "🙈" : "👁️"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {currentError && (
        <Text style={[styles.errorText, errorStyle]}>{currentError}</Text>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: vs(20),
  },
  label: {
    fontSize: s(16),
    fontWeight: "600",
    color: AppColors.whiteColor,
    marginBottom: vs(8),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: s(8),
    paddingHorizontal: s(15),
    minHeight: vs(50),
  },
  inputContainerFocused: {
    borderColor: AppColors.limeGreenColor,
    backgroundColor: "#f9f9f9",
  },
  inputContainerError: {
    borderColor: "#ff4444",
    backgroundColor: "#fff5f5",
  },
  inputContainerDisabled: {
    backgroundColor: "#f0f0f0",
    opacity: 0.6,
  },
  input: {
    flex: 1,
    fontSize: s(16),
    color: "#333",
    paddingVertical: vs(12),
  },
  passwordToggle: {
    padding: s(5),
  },
  passwordToggleText: {
    fontSize: s(18),
  },
  errorText: {
    fontSize: s(14),
    color: "#ff4444",
    marginTop: vs(5),
  },
});
