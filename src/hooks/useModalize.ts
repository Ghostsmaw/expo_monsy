import React from "react";
import { Modalize } from "react-native-modalize";

const useModalize = () => {
  const modalizeRef = React.useRef<Modalize>(null);

  const open = React.useCallback(() => {
    return modalizeRef.current?.open();
  }, []);

  const close = React.useCallback(() => {
    return modalizeRef.current?.close();
  }, []);

  return { modalizeRef, open, close };
};

export default useModalize;
