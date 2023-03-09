import React, { memo } from "react";
import ROUTES from "@utils/routes";
import colors from "@utils/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SvgHome from "@svg/BottomMainTab/SvgHome";
import SvgChart from "@svg/BottomMainTab/SvgChart";
import SvgProfile from "@svg/BottomMainTab/SvgProfile";
import DashboardStack from "@navigation/DashboardStack";
import ProfileStack from "@navigation/ProfileStack";
import ChartStack from "./ChartStack";

const Tab = createBottomTabNavigator();

const BottomMainTab = memo(() => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      // @ts-ignore
      tabBarOptions={{
        showLabel: false,
        activeTintColor: colors.emerald,
        inactiveTintColor: colors.grey3,
      }}
      initialRouteName={ROUTES.Dashboard}
    >
      <Tab.Screen
        name={ROUTES.DashboardBottomTab}
        component={DashboardStack}
        options={{
          tabBarIcon: ({ color }) => <SvgHome color={color} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.ChartBottomTab}
        component={ChartStack}
        options={{ tabBarIcon: ({ color }) => <SvgChart color={color} /> }}
      />
      <Tab.Screen
        name={ROUTES.ProfileBottomTab}
        component={ProfileStack}
        options={{ tabBarIcon: ({ color }) => <SvgProfile color={color} /> }}
      />
    </Tab.Navigator>
  );
});

export default BottomMainTab;
