import React from "react";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import ROUTES from "@utils/routes";

export const onCreateTransaction = (navigation) => {
  const params = { route: ROUTES.Transaction };
  navigation.navigate(ROUTES.CreateTransaction, params);
};

export const onSubmit = () => {
  const schedulingOptions = {
    content: {
      title: "Good evening",
      body: "Did you spend on anything?",
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      color: "blue",
    },
    trigger: {
      hour: 20,
      minute: 30,
      repeats: true,
    },
  };
  Notifications.cancelAllScheduledNotificationsAsync();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  // Notifications show only when app is not active.
  // (ie. another app being used or device's screen is locked)
  Notifications.scheduleNotificationAsync(schedulingOptions);
};

export const askNotification = async () => {
  // We need to ask for Notification permissions for ios devices
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (Constants.isDevice && status === "granted") {
    onSubmit();
  }
};
