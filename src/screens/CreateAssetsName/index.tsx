import React, { memo } from "react";
import { StyleSheet, Animated } from "react-native";
import { Button, Input } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useKeyboard from "@hooks/useKeyBoard";

import Content from "@components/Content";
import Container from "@components/Container";
import ButtonBottom from "@components/ButtonBottom";

import ROUTES from "@utils/routes";

const CreateAssetsName = memo(({ route }: any) => {
  const { navigate } = useNavigation();
  const { height, keyboardVisible } = useKeyboard();

  const [goBack, setGoBack] = React.useState<string>("");
  const [walletName, setWalletName] = React.useState<string>("");

  const disabled = walletName === "";

  React.useEffect(() => {
    if (route.params?.route) {
      setGoBack(route.params?.route);
    } else {
      setGoBack(ROUTES.CreateAssets);
    }
    console.log("route: ", route.params);
    setWalletName(route.params?.name || "");
  }, []);

  const onDone = React.useCallback(() => {
    const name = { name: walletName };
    navigate(goBack, name);
  }, [walletName]);

  return (
    <Container>
      <Content>
        <Input
          style={styles.input}
          placeholder="Enter your wallet name"
          value={walletName}
          onChangeText={setWalletName}
        />
      </Content>
      <Animated.View
        style={[
          styles.keyboard,
          {
            bottom: Animated.subtract(height, 0),
          },
        ]}
      >
        <Button disabled={disabled} onPress={onDone} children="Done" />
      </Animated.View>
    </Container>
  );
});

export default CreateAssetsName;

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 32,
    marginTop: 24,
  },
  keyboard: {
    paddingVertical: 22,
    paddingHorizontal: 16,
    position: "absolute",
    right: 0,
    left: 0,
  },
});
