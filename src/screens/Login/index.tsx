import React, { memo, useCallback, useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import colors from "@utils/colors";
import { widthScreen } from "@utils/dimensions";
import FocusAwareStatusBar from "@components/FocusAwareStatusBar";
import ButtonPrimaryIcon from "@elements/Button/ButtonPrimaryIcon";
import { LOGIN_SCREEN } from "@svg/Login";
import { useDispatch } from "react-redux";
// @ts-ignore
import { apiSignIn } from "@api/index";
import {
  saveToken,
  saveUuidUser,
  getUuidUser,
  saveGuestFlag,
} from "../../utils/store/Store";
// @ts-ignore
import { navigateToBottomMain } from "@actions/navigationActions";
// @ts-ignore
import * as loginActions from "@actions/loginActions";
// @ts-ignore
import * as dashboardActions from "@actions/dashboardActions";
import LoadingView from "@elements/LoadingView";
import Page from "./components/Page";
import Dots from "./components/Dots";
import { LOGIN_DATA } from "@data/index";
import { ICON } from "@svg/Icon";
import Text from "@elements/Text";
import useLayout from "@hooks/useLayout";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

const Login = memo(() => {
  const dispatch = useDispatch();
  const { bottom } = useLayout();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "1058017311089-q6bp4rt2gvs8uu53e3nnpsipel1rccgn.apps.googleusercontent.com",
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("MINHDEBUG response", response);
      console.log("MINHDEBUG authentication", authentication);

      checkLogin(`${authentication?.accessToken}`);
    }
  }, [response]);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [policyCheck, setPolicyCheck] = useState(false);
  const [error, setError] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;

  const onCheckPolicy = useCallback(() => {
    setPolicyCheck(!policyCheck);
    setError(false);
  }, [policyCheck]);

  const onPolicy = () => {
    WebBrowser.openBrowserAsync("https://timivietnam.github.io/monsy/policy");
  };
  const onTerm = () => {
    WebBrowser.openBrowserAsync("https://timivietnam.github.io/monsy/term");
  };

  useEffect(() => {
    setData(LOGIN_DATA);
    setLoading(false);
  }, []);

  const checkLogin = async (firebaseToken: string) => {
    const googleLoginResponse = await apiSignIn({
      firebaseToken,
      isGuest: false,
    });
    const { user, token, typeWallets, categories, currencies } =
      googleLoginResponse;

    await saveToken(token);
    await saveGuestFlag(false);

    dispatch(
      loginActions.onLoginResponse(user, categories, currencies, typeWallets)
    );
    dispatch(dashboardActions.onDashboardRequest());
    navigateToBottomMain({});
  };

  const signInWithGoogleAsync = async () => {
    try {
      await promptAsync();

      // WARNING: the old way of sign
      // const firebaseToken = await currentUser
      //   .getIdToken()
      //   .then((data: any) => data);
      // await checkLogin(firebaseToken);

      setLoading(false);
    } catch (e: any) {
      setLoading(false);

      // DEBUG
      console.log("DEBUG ERROR: Login Google ", e);

      // Handle error
      Alert.alert("Login google failed");
      return { error: true };
    }
  };

  const onLoginGoogle = useCallback(async () => {
    try {
      signInWithGoogleAsync();
    } catch (e) {
      console.log("Error: Login Google ", e);
    }
  }, [promptAsync]);

  const alertCheckPolicy = useCallback(() => {
    setError(true);
  }, [error]);

  const onLoginAsGuest = useCallback(async () => {
    try {
      const uuid = await getUuidUser();

      // Send login request to server
      const { user, token, typeWallets, categories, currencies } =
        await apiSignIn({ uuid, isGuest: true });

      // Save token
      await saveToken(token);
      // Update uuid for new user case
      await saveUuidUser(user.uuid);
      await saveGuestFlag(true);

      // Update store
      dispatch(
        loginActions.onLoginResponse(user, categories, currencies, typeWallets)
      );
      dispatch(dashboardActions.onDashboardRequest());

      // Navigate to dashboard
      navigateToBottomMain({});
    } catch (e) {
      Alert.alert("Login Guest failed");
      console.log("Error: Login Guest", e);
    }
  }, []);

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content" />
      {loading ? (
        <LoadingView isLoading={loading} />
      ) : (
        <>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              width: widthScreen * data.length,
            }}
            scrollEventThrottle={16}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          >
            {data.map((item: any, index: number) => {
              return <Page {...item} key={index} />;
            })}
          </ScrollView>
          <View style={[styles.contentView, { paddingBottom: bottom }]}>
            <Dots scrollX={scrollX} />
            <TouchableOpacity
              onPress={onCheckPolicy}
              activeOpacity={0.7}
              style={styles.check}
            >
              <View
                style={[
                  styles.checkBox,
                  {
                    backgroundColor: policyCheck
                      ? colors.emerald
                      : colors.white,
                    borderColor: error
                      ? colors.redCrayola
                      : policyCheck
                      ? colors.white
                      : colors.lightSlateGrey,
                    borderWidth: policyCheck ? 0 : 1,
                  },
                ]}
              >
                {ICON.check}
              </View>
              <Text>
                <Text color={error ? colors.redCrayola : colors.grey1}>
                  I Agree to{" "}
                </Text>
                <Text
                  size={16}
                  onPress={onPolicy}
                  style={styles.policyText}
                  bold
                  color={error ? colors.redCrayola : colors.emerald}
                >
                  Privacy Policy
                </Text>
                <Text color={error ? colors.redCrayola : colors.grey1}>
                  {" "}
                  And{" "}
                </Text>
                <Text
                  size={16}
                  onPress={onTerm}
                  style={styles.policyText}
                  bold
                  color={error ? colors.redCrayola : colors.emerald}
                >
                  Term {"&"} Condition
                </Text>
              </Text>
            </TouchableOpacity>
            <ButtonPrimaryIcon
              disabled={!policyCheck || !request}
              onPress={onLoginGoogle}
              style={styles.button}
              colorFocus={colors.bitterSweet}
              colorBlur={colors.redCrayola}
              iconLeft={LOGIN_SCREEN.google}
              underlayColor={colors.monaLisa}
              title={"Login with Google"}
            />
            <ButtonPrimaryIcon
              onPress={policyCheck ? onLoginAsGuest : () => {}}
              style={styles.buttonSkip}
              titleStyle={{
                color: policyCheck ? colors.emerald : colors.grey5,
              }}
              underlayColor={colors.white}
              title={"Login as Guest"}
            />
          </View>
        </>
      )}
    </View>
  );
});

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.emerald,
  },
  contentView: {
    width: widthScreen,
    alignItems: "center",
    backgroundColor: colors.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingTop: 24,
  },
  button: {
    marginTop: 24,
  },
  buttonApple: {
    width: 295,
    height: 48,
    marginTop: 24,
  },
  buttonSkip: {
    backgroundColor: "transparent",
    marginTop: 10,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  check: {
    flexDirection: "row",
    alignItems: "center",
  },
  policyText: {
    textDecorationLine: "underline",
  },
});
