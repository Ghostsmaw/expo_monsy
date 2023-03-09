import { heightScreen } from "@utils/dimensions";
import React from "react";
import { StyleSheet } from "react-native";

import { Modalize } from "react-native-modalize";
import { IProps } from "react-native-modalize/lib/options";
import { Calculator } from "./Calculator";

interface BottomSheetProps<T> extends IProps {
  onTextChange?(text: string): void;
  onCalc?(number: number): void;
  onDone?(number: number): void;
}

function ModalizeKeyboard<T>(
  { children, onTextChange, onCalc, onDone, ...props }: BottomSheetProps<T>,
  ref: React.ForwardedRef<Modalize>
) {
  const modalizeRef = React.useRef<Modalize>();

  React.useImperativeHandle(ref, () => ({
    open: () => {
      modalizeRef.current?.open();
    },
    close: () => {
      modalizeRef.current?.close();
    },
  }));

  const close = React.useCallback(() => {
    modalizeRef.current?.close();
  }, []);

  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight
      handleStyle={styles.handleStyle}
      modalStyle={styles.modalStyle}
      overlayStyle={styles.overlayStyle}
      {...props}
    >
      <Calculator
        hasAcceptButton
        hideDisplay={true}
        onTextChange={onTextChange}
        onCalc={onCalc}
        onDone={onDone}
      />
    </Modalize>
  );
}

export default React.forwardRef(ModalizeKeyboard) as <T>(
  props: BottomSheetProps<T> & { ref?: React.ForwardedRef<Modalize> }
) => ReturnType<typeof ModalizeKeyboard>;

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: "transparent",
  },
  handleStyle: {
    height: 0,
  },
  overlayStyle: {
    backgroundColor: "transparent",
  },
});
