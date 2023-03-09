import React, { memo } from "react";
import { StyleSheet, Animated } from "react-native";
import { Button, Input, TopNavigation, useTheme } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Content from "@components/Content";
import Container from "@components/Container";
import ButtonBottom from "@components/ButtonBottom";
import NavigationAction from "@components/NavigationAction";

import ROUTES from "@utils/routes";
import useKeyboard from "@hooks/useKeyBoard";

const AddTransactionNote = memo(({ route }: any) => {
  const { navigate } = useNavigation();
  const [note, setNote] = React.useState<string>("");
  const [goback, setGoBack] = React.useState<string>(ROUTES.CreateTransaction);

  const onDone = React.useCallback(() => {
    const noteContent = { note: note };
    navigate(goback, noteContent);
  }, [note, goback]);

  React.useEffect(() => {
    if (route.params?.route) {
      setGoBack(route.params?.route);
    } else {
      setGoBack(ROUTES.CreateTransaction);
    }
    if (route.params?.note) {
      setNote(route.params?.note);
    }
  }, [route.params?.note]);

  const { height: keyboardHeight } = useKeyboard();

  const theme = useTheme();

  return (
    <Container paddingTop>
      <TopNavigation title="Note" accessoryLeft={<NavigationAction />} />
      <Content>
        <Input
          style={styles.input}
          value={note}
          placeholder={"Write a note"}
          onChangeText={setNote}
        />
      </Content>
      <Animated.View
        style={[
          styles.keyboard,
          {
            bottom: Animated.subtract(keyboardHeight, 0),
            backgroundColor: theme["background-basic-color-2"],
          },
        ]}
      >
        <Button disabled={note === ""} children="Done" onPress={onDone} />
      </Animated.View>
      <ButtonBottom disabled={note === ""} title="Done" onPress={onDone} />
    </Container>
  );
});

export default AddTransactionNote;

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 32,
    marginTop: 24,
  },
  keyboard: {
    paddingVertical: 16,
    position: "absolute",
    right: 0,
    left: 0,
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
});
