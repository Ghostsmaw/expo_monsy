import React from "react";
import ThemeContext from "./ThemeContext";

export default () => {
  const appTheme = React.useContext(ThemeContext);
  return appTheme;
};
