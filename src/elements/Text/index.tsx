import React from "react";
import { StyleSheet, Text, TextStyle, TextProps as TProps } from "react-native";
import FONTS from "@utils/fonts";
import colors from "@utils/colors";

type SizeHeight = {
  [key: string]: number;
};

const FontSize: SizeHeight = {
  H1: 41,
  T1: 41,
  T2: 34,
  T3: 37,
  T4: 24,
  P1: 22,
  P2: 22,
  P3: 20,
  P4: 18,
  C1: 16,
  C2: 13,
};

export interface TextProps extends TProps {
  bold?: boolean;
  semiBold?: boolean;
  color?: string;
  size?: number;
  style?: any;
  hiLight?: boolean;
  ucFirst?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  children?: any;
  regular?: boolean;
  type?: string;
  left?: boolean;
  right?: boolean;
  center?: boolean;
  lineHeight?: number;
  marginTop?: number;
  marginRight?: number;
  marginLeft?: number;
  marginBottom?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  fontWeight?: string;
  opacity?: number;
}

export default ({
  bold,
  semiBold,
  left,
  right,
  center,
  color = colors.grey1,
  size,
  style: _style,
  hiLight,
  ucFirst,
  uppercase,
  lowercase,
  children,
  regular,
  lineHeight,
  marginTop,
  marginRight,
  marginLeft,
  marginBottom,
  marginHorizontal,
  marginVertical,
  fontWeight,
  type,
  opacity,
  capitalize,
  ...props
}: TextProps) => {
  let style: TextStyle = {};
  if (Array.isArray(_style)) {
    style = { ...StyleSheet.flatten(_style) };
  } else {
    style = { ..._style };
  }

  let fontStyle = "Regular";
  if (style.fontWeight) {
    if (style.fontWeight === "normal") {
      fontStyle = "Regular";
    } else if (style.fontWeight === "bold") {
      fontStyle = "Bold";
    }
    style.fontWeight = undefined;
  }

  let _children = "";
  if (typeof children === "string") {
    if (ucFirst) {
      _children =
        children.charAt(0).toUpperCase() + children.slice(1).toLowerCase();
    } else if (uppercase) {
      _children = children.toUpperCase();
    } else if (lowercase) {
      _children = children.toLowerCase();
    }
  }

  if (bold) {
    fontStyle = "Bold";
  }
  if (semiBold) {
    fontStyle = "Bold";
  }
  if (regular) {
    fontStyle = "Regular";
  }
  let textSize = size;
  if (type) {
    textSize = FontSize[`${type}`];
  }

  let textAlign: "left" | "center" | "right" | "auto" | "justify" | undefined =
    "left";

  if (left) {
    textAlign = "left";
  }
  if (right) {
    textAlign = "right";
  }
  if (center) {
    textAlign = "center";
  }
  let textTransform:
    | "uppercase"
    | "lowercase"
    | "capitalize"
    | "none"
    | undefined = "none";

  if (uppercase) {
    textTransform = "uppercase";
  }
  if (lowercase) {
    textTransform = "lowercase";
  }
  if (capitalize) {
    textTransform = "capitalize";
  }

  return (
    <Text
      {...props}
      style={[
        {
          fontFamily:
            fontStyle == "Bold"
              ? FONTS.MUKTA.Bold
              : fontStyle == "SemiBold"
              ? FONTS.MUKTA.Bold
              : FONTS.MUKTA.Regular,
          color: hiLight ? colors.black : color,
          fontSize: textSize,
          lineHeight: lineHeight,
          textAlign: textAlign,
          marginTop: marginTop,
          marginRight: marginRight,
          marginLeft: marginLeft,
          marginBottom: marginBottom,
          marginHorizontal: marginHorizontal,
          marginVertical: marginVertical,
          opacity: opacity,
          textTransform: textTransform,
        },
        style,
      ]}
    >
      {_children || children}
    </Text>
  );
};
