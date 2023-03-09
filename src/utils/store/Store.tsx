import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_TOKEN = "access_token"; // Token
const KEY_UID = "user_uid"; // Social user's uid
const KEY_UUID = "user_uuid"; // System user's uuid
const KEY_GUEST_FLAG = "is_guest";
const KEY_WALLET = "previous_wallet";
const KEY_CATEGORY = "previous_category";

export const saveCategory = (category: object) => {
  AsyncStorage.setItem(KEY_CATEGORY, JSON.stringify(category));
};
export const getPreviousCategory = async () => {
  const previousCategory = await AsyncStorage.getItem(KEY_CATEGORY);
  if (previousCategory) {
    return JSON.parse(previousCategory);
  }
  return null;
};
export const removeCategory = () => AsyncStorage.removeItem(KEY_WALLET);

export const saveWallet = (wallet: object) => {
  AsyncStorage.setItem(KEY_WALLET, JSON.stringify(wallet));
};
export const getPreviousWallet = async () => {
  const previousWallet = await AsyncStorage.getItem(KEY_WALLET);
  if (previousWallet) {
    return JSON.parse(previousWallet);
  }
  return null;
};
export const removeWallet = () => AsyncStorage.removeItem(KEY_WALLET);

export const saveGuestFlag = async (isGuest: boolean) => {
  if (isGuest) {
    await AsyncStorage.setItem(KEY_GUEST_FLAG, "guest");
  } else {
    await AsyncStorage.setItem(KEY_GUEST_FLAG, "social_user");
  }
};
export const getGuestFlag = () => {
  return AsyncStorage.getItem(KEY_GUEST_FLAG);
};
export const removeGuestFlag = () => AsyncStorage.removeItem(KEY_GUEST_FLAG);

export const saveToken = (token: string) =>
  AsyncStorage.setItem(KEY_TOKEN, token);
export const getToken = async () => {
  return await AsyncStorage.getItem(KEY_TOKEN);
};
export const removeToken = () => AsyncStorage.removeItem(KEY_TOKEN);

export const saveUidUser = (uid: string) => AsyncStorage.setItem(KEY_UID, uid);
export const getUidUser = () => {
  return AsyncStorage.getItem(KEY_UID);
};
export const removeUid = () => AsyncStorage.removeItem(KEY_UID);

export const saveUuidUser = (uuid: string) =>
  AsyncStorage.setItem(KEY_UUID, uuid);
export const getUuidUser = () => {
  return AsyncStorage.getItem(KEY_UUID);
};
export const removeUuid = () => AsyncStorage.removeItem(KEY_UUID);

export const removeAllData = async () => {
  await removeCategory();
  await removeToken();
  await removeUid();
  await removeGuestFlag();
  await removeUuid();
  await removeWallet();
};

export const removeGuestData = async () => {
  await removeToken();
  await removeUid();
  await removeGuestFlag();
  await removeWallet();
};
