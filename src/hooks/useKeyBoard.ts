import { useEffect, useRef, useState } from "react";
import { Animated, Keyboard } from "react-native";

const useKeyboard = () => {
  const height = useRef(new Animated.Value(0)).current;
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const keyboardWillShow = (e: { endCoordinates: { height: number } }) => {
    Animated.timing(height, {
      duration: 250,
      toValue: e.endCoordinates.height,
      useNativeDriver: false,
    }).start();
    setKeyboardVisible(true);
  };
  const keyboardWillHide = () => {
    Animated.timing(height, {
      duration: 250,
      toValue: 0,
      useNativeDriver: false,
    }).start();
    setKeyboardVisible(false);
  };
  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", keyboardWillHide);
    return () => {
      Keyboard.removeListener("keyboardWillShow", keyboardWillShow);
      Keyboard.removeListener("keyboardWillHide", keyboardWillHide);
    };
  }, []);

  return { height, keyboardVisible };
};

export default useKeyboard;
