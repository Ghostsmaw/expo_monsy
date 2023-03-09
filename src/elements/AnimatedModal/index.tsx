import React from "react";
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  View,
} from "react-native";
import colors from "@utils/colors";

interface Props {
  visible?: boolean;
  children?: any;
  onDismissLayout?: () => void;
}

export default ({ visible, children, onDismissLayout, ...props }: Props) => {
  return (
    <Modal
      {...props}
      visible={visible}
      statusBarTranslucent={true}
      transparent={true}
      animationType={"fade"}
    >
      <TouchableWithoutFeedback onPress={onDismissLayout}>
        <View style={styles.modalOverlay}>{children}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.transparent,
  },
});
