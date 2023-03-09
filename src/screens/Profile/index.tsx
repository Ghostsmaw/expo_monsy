import React, { memo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import AdBanner from "@components/AdBanner";
import ProfileGuest from "./components/ProfileGuest";
import ProfileNormal from "./components/ProfileNormal";

import { getGuestFlag } from "@utils/store/Store";
import Text from "@elements/Text";

const Profile = memo(() => {
  const [isGuest, setIsGuest] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      initialized();
    }, [])
  );

  const initialized = async () => {
    let guestFlag = await getGuestFlag();
    if (guestFlag == "guest") {
      setIsGuest(true);
    } else {
      setIsGuest(false);
    }
    setLoaded(true);
  };

  if (!loaded) {
    return <View style={styles.container}></View>;
  }

  return (
    <View style={styles.container}>
      {isGuest ? <ProfileGuest /> : <ProfileNormal />}
      <AdBanner />
      <Text center={true}>Version 3.20220209.01</Text>
    </View>
  );
});

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
