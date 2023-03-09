/**
 * React Native App
 * Everything starts from the entrypoint
 */
import React from "react";
import { ActivityIndicator } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./store/index";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import useCachedResources from "@hooks/useCachedResources";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeContext from "@hooks/ThemeContext";
import {
  ApplicationProvider,
  IconRegistry,
  useTheme,
} from "@ui-kitten/components";
import { default as darkTheme } from "@constant/theme/dark.json";
import { default as lightTheme } from "@constant/theme/light.json";
import { default as customTheme } from "@constant/theme/appTheme.json";
import { default as customMapping } from "@constant/theme/mapping.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import AssetIconsPack from "@assets/AssetIconsPack";
import * as eva from "@eva-design/eva";
import AppContainer from "@navigation/AppContainer";

const { persistor, store } = configureStore();

const Entrypoint: React.FC = () => {
  const isLoadingComplete = useCachedResources();
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    AsyncStorage.getItem("theme").then((value) => {
      if (value === "light" || value === "dark") setTheme(value);
    });
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    AsyncStorage.setItem("theme", nextTheme).then(() => {
      setTheme(nextTheme);
    });
  };

  return (
    <SafeAreaProvider>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
        <ApplicationProvider
          {...eva}
          theme={
            theme === "light"
              ? { ...eva.light, ...customTheme, ...lightTheme }
              : { ...eva.dark, ...customTheme, ...darkTheme }
          }
          // @ts-ignore
          customMapping={customMapping}
        >
          <StatusBar
            style={theme === "light" ? "dark" : "light"}
            translucent={true}
            backgroundColor={"#00000000"}
          />
          <Provider store={store}>
            <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
              <AppContainer cachedResources={isLoadingComplete} />
            </PersistGate>
          </Provider>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </SafeAreaProvider>
  );
};

export default Entrypoint;
