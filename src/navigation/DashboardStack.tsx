import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "@utils/routes";
import Dashboard from "@screens/Dashboard";

const Stack = createStackNavigator();

const DashboardStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.Dashboard}
        component={Dashboard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});

export default DashboardStack;
