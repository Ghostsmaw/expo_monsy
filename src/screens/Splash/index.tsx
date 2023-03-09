import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ILoading } from "@store/models/reducers/loading";
import LoadingView from "@elements/LoadingView";
import { useDispatch, useSelector } from "react-redux";
import { apiGetUserByToken } from "@api/index";
import { getToken, removeAllData } from "../../utils/store/Store";
import { navigateToBottomMain } from "@actions/navigationActions";
import * as loginActions from "@actions/loginActions";
import * as dashboardActions from "@actions/dashboardActions";
import ROUTES from "@utils/routes";
interface IState {
  loadingReducer: ILoading;
}

const Splash = memo(() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loading = useSelector(
    (state: IState) => state.loadingReducer.isLoading
  );

  useFocusEffect(React.useCallback(() => {
    initialized();
  }, []));

  const initialized = async () => {
    let token = await getToken();
    if (!token) {
      await removeAllData();
      navigation.navigate(ROUTES.Login);
      return;
    }

    try {
      // Get user information
      const {
        user,
        typeWallets,
        categories,
        currencies,
      } = await apiGetUserByToken();

      // Update user information to store redux
      dispatch(
        loginActions.onLoginResponse(
          user,
          categories,
          currencies,
          typeWallets,
        )
      );

      // Send dashboard request
      dispatch(dashboardActions.onDashboardRequest());

      // Navigate to dashboard screen
      navigateToBottomMain({});
    } catch(error) {
      console.log("DEBUG Error:", error);
      await removeAllData();
      navigation.navigate(ROUTES.Login);
    }
  }
  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingView isLoading={loading} />
      ) :
        null
      }
    </View>
  );
});

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
