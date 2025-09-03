import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";

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
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        tickIconStyle={styles.tickIcon}
        placeholder={placeholder}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        placeholderStyle={styles.placeholder}
        listMode="MODAL"
        modalProps={{
          transparent: true,
          animationType: "slide",
          presentationStyle: "overFullScreen",
          statusBarTranslucent: true,
        }}
        modalContentContainerStyle={styles.modalContainer}
        modalTitle="Seçim Yapın"
        modalTitleStyle={styles.modalTitle}
        searchable={true}
        searchPlaceholder="🔍 Ara..."
        searchPlaceholderTextColor={AppColors.whiteColor}
        searchTextInputStyle={styles.searchInput}
        searchContainerStyle={styles.searchContainer}
        maxHeight={400}
        itemSeparator={true}
        itemSeparatorStyle={styles.separator}
        selectedItemContainerStyle={styles.selectedItem}
        selectedItemLabelStyle={styles.selectedItemText}
        listItemContainerStyle={styles.listItem}
        listItemLabelStyle={styles.listItemText}
        flatListProps={{
          showsVerticalScrollIndicator: false,
          keyboardShouldPersistTaps: "handled",
          contentContainerStyle: styles.listContent,
        }}
        closeAfterSelecting={true}
        modalAnimationType="slide"
      />
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: vs(50),
  },

  dropdown: {
    backgroundColor: "#ffffff",
    borderColor: "#e1e5e9",
    borderWidth: 1.5,
    borderRadius: 12,
    minHeight: vs(50),
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tickIcon: {
    width: 20,
    height: 20,
    tintColor: AppColors.whiteColor,
  },
  dropdownText: {
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "500",
  },

  placeholder: {
    color: "#7f8c8d",
    fontSize: 16,
    fontWeight: "400",
  },

  modalContainer: {
    backgroundColor: "#ffffff",
    marginHorizontal: s(20),
    marginTop: vs(100),
    borderRadius: s(12),
    maxHeight: "70%",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,

    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    color: "#2c3e50",
    backgroundColor: "#f8f9fa",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.08)",
  },

  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },

  //SEARCH INPUT
  searchInput: {
    backgroundColor: AppColors.grayBgColor,
    borderColor: AppColors.grayBgColor,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: AppColors.whiteColor,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  listContent: {
    paddingBottom: 20,
  },

  //LIST ITEM
  listItem: {
    height: vs(56),
    backgroundColor: AppColors.grayBgColor,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f2f6",
    marginHorizontal: 10,
    marginVertical: 2,
    borderRadius: 8,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },

  listItemText: {
    fontSize: 16,
    color: AppColors.whiteColor,
    fontWeight: "500",
  },

  // seledted item style
  selectedItem: {
    height: vs(56),
    padding: s(4),
    backgroundColor: AppColors.blackBgColor,
    marginHorizontal: 10,
    marginVertical: 2,
    borderRadius: 8,

    shadowColor: AppColors.blackBgColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },

  selectedItemText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },

  //  SEPARATOR
  separator: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
    marginHorizontal: 20,
  },
});
