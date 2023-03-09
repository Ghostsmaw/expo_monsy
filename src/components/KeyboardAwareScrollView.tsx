import React from "react";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";

interface ContainerProps extends KeyboardAwareScrollViewProps {}

const KeyboardScrollView: React.FC<ContainerProps> = ({
  children,
  ...props
}) => {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      extraScrollHeight={20}
      enableOnAndroid
      {...props}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardScrollView;
