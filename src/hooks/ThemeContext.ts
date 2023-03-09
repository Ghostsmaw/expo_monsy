import React from "react";

type AppTheme = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export default React.createContext<AppTheme>({
  theme: "light",
  toggleTheme: () => {},
});
