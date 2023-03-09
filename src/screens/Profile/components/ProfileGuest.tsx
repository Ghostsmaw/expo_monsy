import React, { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Button, Layout } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Text from "@components/Text";
import Content from "@components/Content";
import Container from "@components/Container";

import ROUTES from "@utils/routes";
import { IMAGE_ICON } from "@assets/Icon";
import { removeGuestData } from "@utils/store/Store";

const ProfileGuest = memo(() => {
  const { navigate } = useNavigation();

  const onLogout = React.useCallback(async () => {
    await removeGuestData();
    navigate(ROUTES.Login);
  }, []);

  return (
    <Container>
      <Content level="1">
        <Avatar style={styles.image} source={IMAGE_ICON.profileGuest} />
        <Text category="title3" center marginTop={16}>
          Guest
        </Text>
        <Text category="headline" status="note" center>
          You haven’t log in yet.
        </Text>
        <Button onPress={onLogout} style={styles.button} children="Sign In" />
      </Content>
      <Layout style={styles.bottom}>
        <TouchableOpacity onPress={onLogout} activeOpacity={0.7}>
          <Text>
            Don’t have an account?
            <Text category="headline" status="info">
              {" "}
              Sign Up
            </Text>
          </Text>
        </TouchableOpacity>
      </Layout>
    </Container>
  );
});

export default ProfileGuest;

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    marginTop: 24,
  },
  button: {
    marginTop: 24,
    marginHorizontal: 102,
  },
  bottom: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    paddingBottom: 36,
  },
});
