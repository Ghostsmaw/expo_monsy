import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

const useImagePicker = (
  setImage: (image: any) => void,
  //Close Modal
  close?: () => void,
  //Image Prefered Aspect
  aspect?: [number, number]
): [() => void, () => void] => {
  const takePhoto = async () => {
    !!close && close();
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: !!aspect ? aspect : [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result);
    }
  };
  const choosePhoto = async () => {
    !!close && close();
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: !!aspect ? aspect : [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };
  return [takePhoto, choosePhoto];
};

export default useImagePicker;
