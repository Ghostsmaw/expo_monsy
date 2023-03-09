import "react-native-gesture-handler";
import { LogBox } from "react-native";
import { enableScreens } from "react-native-screens";
import App from "./src/Entrypoint";
import { patchFlatListProps } from "react-native-web-refresh-control";

patchFlatListProps();

enableScreens();

LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
  "ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.",
]);
export default App;
