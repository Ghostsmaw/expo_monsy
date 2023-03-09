import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Calendar,
  CalendarRange,
  I18nConfig,
  NativeDateService,
  RangeCalendar,
  useTheme,
} from "@ui-kitten/components";
import { Modalize } from "react-native-modalize";
import { useTranslation } from "react-i18next";

import Text from "./Text";
import useLayout from "@hooks/useLayout";

interface BottomSheetProps {
  title: string;
  date?: Date | undefined;
  min?: Date;
  max?: Date;
  rangeCalendar?: boolean;
  range?: CalendarRange<Date> | undefined;
  onChangeDate?: ((date: Date) => void) | undefined;
  onSelect?: ((range: CalendarRange<Date>) => void) | undefined;
}

const ModalizeCalendar = React.forwardRef(
  (
    {
      title,
      date,
      min,
      max,
      range,
      rangeCalendar,
      onChangeDate,
      onSelect,
    }: BottomSheetProps,
    ref
  ) => {
    const theme = useTheme();
    const { t } = useTranslation("calendar");

    const { width, bottom } = useLayout();

    const modalizeRef = React.useRef<Modalize>();

    React.useImperativeHandle(ref, () => ({
      open: () => {
        modalizeRef.current?.open();
      },
      close: () => {
        modalizeRef.current?.close();
      },
    }));

    const close = React.useCallback(() => {
      modalizeRef.current?.close();
    }, []);

    const i18n: I18nConfig = {
      dayNames: {
        short: ["S", "M", "T", "W", "T", "F", "S"],
        long: ["S", "M", "T", "W", "T", "F", "S"],
      },
      monthNames: {
        short: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        long: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
    };

    const localeDateService = new NativeDateService("en", {
      i18n,
      startDayOfWeek: 1,
    });

    const headerComponent = React.useCallback(() => {
      return (
        <View style={styles.headerModal}>
          <Text category="title3" capitalize>
            {title}
          </Text>
        </View>
      );
    }, []);

    return (
      <Modalize
        ref={modalizeRef}
        HeaderComponent={headerComponent}
        handleStyle={styles.handleStyle}
        modalStyle={[
          styles.modalStyle,
          { backgroundColor: theme["background-basic-color-1"] },
        ]}
        adjustToContentHeight={true}
        scrollViewProps={{
          bounces: false,
          showsVerticalScrollIndicator: false,
        }}
      >
        {rangeCalendar ? (
          <RangeCalendar
            style={[
              styles.calendar,
              { width: width, paddingBottom: bottom + 16 },
            ]}
            range={range}
            onSelect={onSelect}
            dateService={localeDateService}
          />
        ) : (
          <Calendar
            min={min}
            max={max}
            style={[
              styles.calendar,
              { width: width, paddingBottom: bottom + 16 },
            ]}
            date={date}
            onSelect={onChangeDate}
            dateService={localeDateService}
          />
        )}
      </Modalize>
    );
  }
);

export default ModalizeCalendar;

const styles = StyleSheet.create({
  modalStyle: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  handleStyle: {
    height: 0,
  },
  headerModal: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  styleFlatList: {
    paddingHorizontal: 24,
  },
  line: {
    height: 1,
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
  },
  calendar: {
    alignSelf: "center",
  },
  button: {
    marginTop: 24,
    marginHorizontal: 24,
  },
});
