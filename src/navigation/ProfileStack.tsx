import React, { memo } from "react";
import ROUTES from "@utils/routes";
import Profile from "@screens/Profile";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const ProfileStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.Profile} component={Profile} />
    </Stack.Navigator>
  );
});

export default ProfileStack;
