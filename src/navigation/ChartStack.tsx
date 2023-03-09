import React, { memo } from "react";
import ROUTES from "@utils/routes";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Chart from "@screens/Chart";
import colors from "@utils/colors";
import HeaderBackGround from "@elements/Header/HeaderBackGround";
import FONTS from "@utils/fonts";

const Stack = createStackNavigator();

const ChartStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.Chart}
        component={Chart}
        options={() => ({
          headerTitle: "Statistic",
          headerTitleAlign: "center",
          headerTintColor: colors.white,
          headerTitleStyle: styles.headerTitleStyle,
          headerStyle: styles.headerStyle,
          headerBackground: () => (
            <HeaderBackGround style={styles.headerBackGround} />
          ),
        })}
      />
    </Stack.Navigator>
  );
});

export default ChartStack;

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontFamily: FONTS.MUKTA.SemiBold,
    fontSize: 17,
    fontWeight: "600",
  },
  headerStyle: {
    backgroundColor: colors.white,
    borderBottomColor: colors.snow,
  },
  headerBackGround: {
    backgroundColor: colors.emerald,
  },
  headerNonBorder: {
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
});
