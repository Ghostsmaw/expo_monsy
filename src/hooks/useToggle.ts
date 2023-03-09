import React from "react";

const useToggle = (initValue = false): [value: boolean, toggle: () => void] => {
  const [value, setValue] = React.useState<boolean>(initValue);
  const toggle = React.useCallback(() => {
    setValue((prev: boolean): boolean => !prev);
  }, []);
  return [value, toggle];
};

export default useToggle;
