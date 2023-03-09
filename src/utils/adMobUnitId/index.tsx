import { Platform } from "react-native";

interface AdMobUnitId {
  mainAdUnitId: string;
  createAsset: string;
  profile: string;
  wallets: string;
}

let adMobUnitId: AdMobUnitId;

/*** MUST-CONFIG ***/
if (Platform.OS === "ios") {
  adMobUnitId = {
    mainAdUnitId: "",
    createAsset: "",
    profile: "",
    wallets: "",
  };
} else {
  adMobUnitId = {
    mainAdUnitId: "",
    createAsset: "",
    profile: "",
    wallets: "",
  };
}

export default adMobUnitId;
