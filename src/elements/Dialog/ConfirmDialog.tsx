import ButtonPrimary from "@elements/Button/ButtonPrimary";
import ButtonSecondary from "@elements/Button/ButtonSecondary";
import Text from "@elements/Text";
import colors from "@utils/colors";
import { heightScreen, widthScreen } from "@utils/dimensions";
import React from "react";
import { View, ViewStyle, Image, StyleSheet } from "react-native";
import { Dialog } from "react-native-simple-dialogs";

interface Props {
  visible?: boolean;
  onTouchOutside?: any;
  dialogStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  Svg?: any;
  image?: any;
  svgStyle?: ViewStyle;
  title?: string;
  titleStyle?: ViewStyle;
  description?: string;
  descriptionStyle?: ViewStyle;
  onButton1?: any;
  button1Style?: ViewStyle;
  titleButton1?: string;
  titleButton1Style?: ViewStyle;
  onButton2?: any;
  button2Style?: ViewStyle;
  titleButton2?: string;
  titleButton2Style?: ViewStyle;
  renderContent?: any;
}

const ConfirmDialog = (props: Props) => {
  const {
    visible,
    onTouchOutside,
    dialogStyle,
    contentStyle,
    Svg,
    image,
    svgStyle,
    title,
    titleStyle,
    description,
    descriptionStyle,
    onButton1,
    button1Style,
    titleButton1,
    titleButton1Style,
    onButton2,
    button2Style,
    titleButton2,
    titleButton2Style,
    renderContent,
  } = props;
  return (
    <Dialog
      visible={visible}
      onTouchOutside={onTouchOutside}
      animationType={"fade"}
      keyboardDismissMode={"interactive"}
      dialogStyle={[styles.dialogStyle, dialogStyle]}
      contentStyle={[styles.contentStyle, contentStyle]}
    >
      {Svg && <View style={[styles.svg, svgStyle]}>{Svg}</View>}
      {image && <Image style={styles.image} source={image} />}
      <Text center size={22} style={titleStyle}>
        {title}
      </Text>

      {renderContent}
      <View style={styles.btnView}>
        <Text
          bold
          color={colors.grey1}
          center
          size={17}
          lineHeight={22}
          style={descriptionStyle}
          marginBottom={20}
        >
          {description}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <ButtonPrimary
            onPress={onButton1}
            title={titleButton1}
            titleStyle={[styles.titleButton1Style, titleButton1Style]}
            style={[styles.button1Style, button1Style]}
          />
          <ButtonSecondary
            onPress={onButton2}
            title={titleButton2}
            titleStyle={[styles.titleButton2Style, titleButton2Style]}
            style={[styles.button2Style, button2Style]}
          />
        </View>
      </View>
    </Dialog>
  );
};

export default ConfirmDialog;

const styles = StyleSheet.create({
  dialogStyle: {
    width: widthScreen / 1.1,
    height: heightScreen / 2,
    alignSelf: "center",
    borderRadius: 16,
    backgroundColor: colors.white,
  },
  svg: {
    alignSelf: "center",
    marginTop: 30,
  },
  contentStyle: {
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 16,
    flex: 1,
  },
  btnView: {
    position: "absolute",
    width: "100%",
    bottom: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  txtTitle: {
    fontSize: 20,
    lineHeight: 30,
    marginTop: 32,
    marginBottom: 8,
  },
  txtDescription: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.6,
    paddingHorizontal: 25,
  },
  button1Style: {
    width: 96,
    height: 46,
    marginRight: 16,
  },
  titleButton1Style: {
    textTransform: "capitalize",
    fontSize: 17,
  },
  button2Style: {
    width: 96,
    height: 46,
  },
  titleButton2Style: {
    textTransform: "capitalize",
    fontSize: 17,
  },
  image: {
    alignSelf: "center",
    marginTop: 20,
    width: widthScreen / 2,
    height: heightScreen / 4.5,
    resizeMode: "contain",
  },
});
