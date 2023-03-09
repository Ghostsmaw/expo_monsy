import React, { memo } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { EvaStatus } from "@ui-kitten/components/devsupport";
import { useTheme, Icon, TopNavigationAction } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useAppTheme from "@hooks/useAppTheme";

import Text from "./Text";
import { Images } from "@assets/images";

interface NavigationActionProps {
  style?: ViewStyle;
  icon?: string;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  onPress?: () => void;
  title?: string;
  titleStatus?: EvaStatus | "white" | "body" | "black" | "note" | "description";
  status?: "basic" | "rounded";
  size?: "giant" | "medium"; // giant-56-icon-24  medium-40-icon-24
  disabled?: boolean;
}

const NavigationAction = memo(
  ({
    style,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
    onPress,
    icon = "arrowLeft",
    title,
    size = "medium",
    status = "basic",
    titleStatus = "info",
    disabled,
  }: NavigationActionProps) => {
    const themes = useTheme();

    const { theme } = useAppTheme();
    const { goBack } = useNavigation();
    const _onPress = React.useCallback(() => {
      if (onPress) {
        onPress && onPress();
      } else {
        goBack();
      }
    }, [onPress, goBack]);

    const getIconColor = (status: "basic" | "rounded"): string => {
      switch (status) {
        case "basic":
          return themes["icon-basic-color"];
        case "rounded":
          return themes["color-basic-100"];
        default:
          return themes["icon-basic-color"];
      }
    };

    const getSize = (size: "giant" | "medium"): number => {
      switch (size) {
        case "giant":
          return 56;
        case "medium":
          return 40;
        default:
          return 40;
      }
    };

    return title ? (
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Text
          marginRight={16}
          marginTop={8}
          category="headline"
          status={titleStatus}
        >
          {title}
        </Text>
      </TouchableOpacity>
    ) : status === "rounded" ? (
      <TouchableOpacity
        onPress={_onPress}
        disabled={disabled}
        activeOpacity={0.7}
        style={[
          styles.container,
          {
            marginBottom: marginBottom,
            marginTop: marginTop,
            marginLeft: marginLeft,
            marginRight: marginRight,
            marginHorizontal: marginHorizontal,
            marginVertical: marginVertical,
            height: getSize(size),
            width: getSize(size),
          },
          style,
        ]}
      >
        <ImageBackground
          style={styles.image}
          source={Images.shape}
          children={
            <Icon
              pack="assets"
              name="plus"
              style={{ tintColor: themes["color-basic-100"] }}
            />
          }
        />
      </TouchableOpacity>
    ) : (
      <TopNavigationAction
        onPress={_onPress}
        disabled={disabled}
        activeOpacity={0.7}
        style={[
          styles.container,
          {
            marginBottom: marginBottom,
            marginTop: marginTop,
            marginLeft: marginLeft,
            marginRight: marginRight,
            marginHorizontal: marginHorizontal,
            marginVertical: marginVertical,
            height: getSize(size),
            width: getSize(size),
          },
        ]}
        icon={(props) => (
          <Icon
            {...props}
            pack="assets"
            name={icon}
            style={[
              {
                height: 24,
                width: 24,
              },
              { tintColor: getIconColor(status) },
            ]}
          />
        )}
      />
    );
  }
);

export default NavigationAction;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
