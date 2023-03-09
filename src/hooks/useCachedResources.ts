import * as Font from "expo-font";
import * as React from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState<boolean>(
    false
  );

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          "Mukta-Bold": require("../assets/fonts/Mukta-Bold.ttf"),
          "Mukta-Medium": require("../assets/fonts/Mukta-Medium.ttf"),
          "Mukta-Regular": require("../assets/fonts/Mukta-Regular.ttf"),
          "Mukta-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
