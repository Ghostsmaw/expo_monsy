import React, { memo, useRef, useState, useCallback } from "react";
import Animated, { event, set, Value } from "react-native-reanimated";
import { View, StyleSheet, Platform } from "react-native";
import { widthScreen } from "@utils/dimensions";
import ScrollTab from "./ScrollTab";

interface Props {
  titles: string[];
  children: any;
}

const ScrollableTab = memo(({ titles, children }: Props) => {
  const [layouts, setLayouts] = useState<number[]>([]);
  const [indexPage, setIndex] = useState<number>(0);
  const scrollX = useRef(new Value(0)).current;
  const scrollRef: any = useRef();
  const tabScrollRef: any = useRef();
  const onScrollTo = useCallback(
    (index: number, isPress?: boolean) => {
      if (isPress) {
        setIndex(index);
      }
      tabScrollRef.current.scrollTo({
        x: layouts[index],
        y: 0,
        animated: true,
      });
    },
    [layouts]
  );
  const onPressTab = useCallback(
    (index: number) => {
      scrollRef.current
        .getNode()
        .scrollTo({ x: widthScreen * index, y: 0, animated: true });
      onScrollTo(index);
    },
    [onScrollTo]
  );
  React.useEffect(() => {
    onPressTab(1);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.scrollableTab}>
        <ScrollTab
          {...{
            scrollX,
            titles,
            onPressTab,
            tabScrollRef,
            onScrollTo,
            indexPage,
            setIndex,
            layouts,
            setLayouts,
          }}
        />
      </View>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        scrollEnabled={Platform.OS === "ios" ? true : false}
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={event([
          {
            nativeEvent: {
              contentOffset: { x: (x) => set(scrollX, x) },
            },
          },
        ])}
        showsHorizontalScrollIndicator={false}
      >
        {children}
      </Animated.ScrollView>
    </View>
  );
});

export default ScrollableTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollableTab: {
    flexDirection: "row",
  },
});
