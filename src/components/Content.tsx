import React from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import { useTheme } from "@ui-kitten/components";

interface ContentProps extends ScrollViewProps {
  padder?: boolean;
  level?: "1" | "2" | "3" | "4" | "5" | "6" | "7";
}

const Content: React.FC<ContentProps> = ({
  style,
  contentContainerStyle,
  children,
  padder,
  level = "2",
  ...props
}) => {
  const theme = useTheme();
  return (
    <ScrollView
      {...props}
      style={[
        padder && { paddingHorizontal: 16 },
        { backgroundColor: theme[`background-basic-color-${level}`] },
        style,
      ]}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
    >
      {children}
    </ScrollView>
  );
};

export default Content;
