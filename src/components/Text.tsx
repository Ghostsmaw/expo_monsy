import React, { memo } from "react";
import { StyleProp, TextStyle } from "react-native";
import { Text, TextProps } from "@ui-kitten/components";
import { EvaStatus } from "@ui-kitten/components/devsupport";

export interface MyTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  category?:
    | "header"
    | "title1"
    | "title2"
    | "title3"
    | "title4"
    | "headline"
    | "body"
    | "callout"
    | "subhead"
    | "footnote"
    | "caption1"
    | "caption2";
  status?:
    | EvaStatus
    | "white"
    | "body"
    | "black"
    | "note"
    | "description"
    | "placeholder";
  children?: any;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  margin?: number;
  opacity?: number;
  maxWidth?: number;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  left?: boolean;
  right?: boolean;
  center?: boolean;
  underline?: boolean;
  italic?: boolean;
}
const getLineHeight = (
  category:
    | "header"
    | "title1"
    | "title2"
    | "title3"
    | "title4"
    | "headline"
    | "body"
    | "callout"
    | "subhead"
    | "footnote"
    | "caption1"
    | "caption2"
): number => {
  switch (category) {
    case "header":
      return 50;
    case "title1":
      return 41;
    case "title2":
      return 34;
    case "title3":
      return 36;
    case "title4":
      return 24;
    case "headline":
    case "body":
      return 22;
    case "callout":
      return 21;
    case "subhead":
      return 20;
    case "footnote":
      return 18;
    case "caption1":
      return 16;
    case "caption2":
      return 13;
    default:
      return 22;
  }
};
export default memo(
  ({
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    marginVertical,
    marginHorizontal,
    margin,
    opacity,
    uppercase,
    lowercase,
    capitalize,
    left,
    right,
    center,
    underline,
    category = "body",
    status,
    children,
    maxWidth,
    style,
    ...rest
  }: MyTextProps) => {
    let textAlign: "left" | "center" | "right" | "auto" | "justify" | "left";

    left
      ? (textAlign = "left")
      : right
      ? (textAlign = "right")
      : center
      ? (textAlign = "center")
      : (textAlign = "left");

    let textTransform: "uppercase" | "lowercase" | "capitalize" | "none";

    uppercase
      ? (textTransform = "uppercase")
      : lowercase
      ? (textTransform = "lowercase")
      : capitalize
      ? (textTransform = "capitalize")
      : (textTransform = "none");

    let textDecorationLine:
      | "none"
      | "underline"
      | "line-through"
      | "underline line-through";
    underline
      ? (textDecorationLine = "underline")
      : (textDecorationLine = "none");

    return (
      <Text
        category={category}
        status={status}
        style={[
          {
            marginLeft: marginLeft,
            marginRight: marginRight,
            marginTop: marginTop,
            marginBottom: marginBottom,
            marginVertical: marginVertical,
            marginHorizontal: marginHorizontal,
            margin: margin,
            opacity: opacity,
            textAlign: textAlign,
            maxWidth: maxWidth,
            lineHeight: getLineHeight(category),
            textTransform: textTransform,
            textDecorationLine: textDecorationLine,
          },
          style,
        ]}
        {...rest}
      >
        {children}
      </Text>
    );
  }
);
