import React, { memo } from "react";
import { StyleSheet, FlatList, View, Button } from "react-native";
import { Avatar } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import useModal from "@hooks/useModal";
import useToggle from "@hooks/useToggle";
import useAppTheme from "@hooks/useAppTheme";

import Text from "@components/Text";
import Container from "@components/Container";
import ModalConfirm from "@components/ModalConfirm";
import SettingItem from "@components/SettingItem";
import ButtonIcon from "@components/ButtonIcon";

import ROUTES from "@utils/routes";
import keyExtractor from "@utils/keyExtractor";
import { IMAGE_ICON } from "@assets/Icon";
import { removeAllData } from "@utils/store/Store";
import { IMasterState } from "@store/models/reducers/master";
import { SettingFragment } from "@constant/Types";
import colors from "@utils/colors";

interface IState {
  masterReducer: IMasterState;
}

const ProfileNormal = memo(() => {
  const { navigate } = useNavigation();
  const { toggleTheme } = useAppTheme();

  const user = useSelector((state: IState) => state.masterReducer.user);

  const [checked, setChecked] = useToggle(false);

  const { modalRef, show, hide } = useModal();

  const data: SettingFragment[] = [
    // {
    //   title: "Dark Mode",
    //   icon: "moon",
    //   isToggle: true,
    //   checked: checked,
    //   onChange: () => {
    //     setChecked();
    //     toggleTheme();
    //   },
    // },
    // {
    //   title: "General",
    //   icon: "general",
    //   onPress: () => {},
    // },
    {
      title: "Wallets",
      icon: "wallet",
      onPress: () => navigate(ROUTES.MyWallets),
    },
    {
      title: "Currency",
      icon: "currency",
      currency: user.currency.currency,
      onPress: () => navigate(ROUTES.Currency),
    },
    // {
    //   title: "Categories",
    //   icon: "category",
    //   onPress: () => {},
    // },
    {
      title: "Logout",
      icon: "lock",
      onPress: show,
    },
  ];
  const onGetPremium = React.useCallback(() => {
    navigate(ROUTES.GetPremium);
  }, []);

  const listHeaderComponent = React.useCallback(() => {
    return (
      <>
        <Avatar
          style={styles.avatar}
          loadingIndicatorSource={IMAGE_ICON.profileGuest}
          source={
            !!user.avatar && user.avatar !== null
              ? { uri: user.avatar }
              : IMAGE_ICON.profileGuest
          }
        />
        <Text category="title3" marginTop={4} center>
          {user.name}
        </Text>
        <Text status="note" center>
          {user.email || "Email@chuaco.dau"}
        </Text>
        <ButtonIcon title="Get premium" onPress={onGetPremium} />
        <Text category="headline" marginTop={28} marginLeft={29}>
          Account Settings
        </Text>
      </>
    );
  }, [user]);

  const renderItem = React.useCallback(({ item }) => {
    return <SettingItem {...item} />;
  }, []);

  return (
    <Container>
      <FlatList
        data={data || []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={listHeaderComponent}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <ModalConfirm
        ref={modalRef}
        title="Are you sure you want to logout?"
        buttonLeft={{
          title: "Yes",
          onPress: async () => {
            hide();
            await removeAllData();
            navigate(ROUTES.Login);
          },
        }}
        buttonRight={{
          title: "No",
          onPress: hide,
        }}
      />
    </Container>
  );
});

export default ProfileNormal;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
  avatar: {
    marginTop: 24,
    alignSelf: "center",
  },
});
