import React, { useState } from "react";
import { Modal, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";
import defaultStyle from "../../defaultStyle";
// items, title, props.onClose, props.onSelect, visible
const PickerModal = (props) => {
  const [pickerValue, setPickerValue] = useState("");
  return (
    <Modal transparent visible={props.visible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={props.onClose}>
              <FontAwesome
                name="close"
                color={defaultStyle.colors.mainColorBlue}
                size={25}
                style={{ padding: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.onClose();
                props.onSelect(pickerValue);
              }}
            >
              <FontAwesome
                name="check"
                color={defaultStyle.colors.mainColorBlue}
                size={25}
                style={{ padding: 10 }}
              />
            </TouchableOpacity>
          </View>
          <Picker
            selectedValue={pickerValue}
            onValueChange={(itemValue, itemIndex) => setPickerValue(itemValue)}
          >
            {props.items.map((item, index) => (
              <Picker.Item value={item} label={item} key={index} />
            ))}
          </Picker>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  pickerContainer: {
    height: 200,
    width: "100%",
    backgroundColor: "white",
  },
  label: {
    textTransform: "capitalize",
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default PickerModal;
