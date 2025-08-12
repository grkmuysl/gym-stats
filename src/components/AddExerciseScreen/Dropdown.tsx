import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { s, vs } from "react-native-size-matters";
import { ScrollView } from "react-native-gesture-handler";

const Dropdown = ({
  placeholder,
  itemsProp,
  onValueChange,
  selectedValue,
  zIndex = 1000,
  open,
  setOpen,
}) => {
  const [value, setValue] = useState(selectedValue);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (itemsProp && itemsProp.length > 0) {
      setItems(itemsProp);
    }
  }, [itemsProp]);

  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    if (onValueChange && value !== null && value !== selectedValue) {
      onValueChange(value);
    }
  }, [value]);

  return (
    <View
      style={[
        styles.container,
        {
          zIndex: open ? zIndex + 1000 : zIndex,
          elevation: open ? zIndex + 1000 : zIndex,
        },
      ]}
    >
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={placeholder}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
        placeholderStyle={styles.placeholder}
        maxHeight={vs(200)}
        listMode="FLATLIST"
        flatListProps={{
          nestedScrollEnabled: true,
          showsVerticalScrollIndicator: true,
          keyboardShouldPersistTaps: "handled",
          bounces: false,
        }}
        zIndex={open ? zIndex + 1000 : zIndex}
        zIndexInverse={open ? zIndex - 1000 : zIndex - 1000}
      />
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  dropdown: {
    backgroundColor: "#f5f5f5",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
  },
  dropdownContainer: {
    backgroundColor: "#f5f5f5",
    borderColor: "#ddd",
    maxHeight: vs(200),
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  placeholder: {
    color: "#999",
  },
});
