import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import colors from "@utils/colors";
import SvgSearch from "@svg/Icon/SvgSearch";

interface Props {
  style?: ViewStyle;
  inputStyle?: ViewStyle | TextStyle;
  placeholder?: string;
  placeholderTextColor?: string,
  value?: any;
  onChangeText?: (text: string) => void;
  onSearch?: () => void;
}

export default ({
  style,
  inputStyle,
  placeholder,
  value,
  onChangeText,
  onSearch,
  placeholderTextColor,
  ...props
}: Props) => {
  const refInput = React.useRef<any>(null);
  const [focus, setFocus] = useState<boolean>(false);

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const borderStyle = focus
    ? { borderColor: colors.emerald, borderWidth: 2 }
    : { borderColor: colors.snow, borderWidth: 1 };

  return (
    <View style={[styles.container, borderStyle, style]}>
      <TextInput
        {...props}
        ref={refInput}
        style={[styles.textInput, inputStyle]}
        onFocus={onFocus}
        onBlur={onBlur}
        returnKeyType={"search"}
        placeholder={placeholder}
        clearButtonMode={"always"}
        clearTextOnFocus={true}
        onSubmitEditing={onSearch}
        onChangeText={onChangeText}
      />
      <SvgSearch style={styles.svgSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 343,
    height: 40,
    borderRadius: 24,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.snow,
    shadowColor: colors.grey1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: 40,
  },
  svgSearch: {
    position: "absolute",
    left: 17,
  },
  cancelButton: {
    position: "absolute",
    right: 0,
    width: 50,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  svgCancel: {
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.grey2,
  },
});
