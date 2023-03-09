import React, { memo, useCallback } from "react";
import { ScrollView } from "react-native";
import ScrollTabButton from "./ScrollTabButton";
import Animated, { useCode, call } from "react-native-reanimated";
import { widthScreen } from "@utils/dimensions";

interface Props {
  scrollX: Animated.Node<number>;
  titles: string[];
  onPressTab: (index: number) => void;
  tabScrollRef: any;
  onScrollTo: (event: any, isPress?: boolean) => void;
  indexPage: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  layouts: number[];
  setLayouts: React.Dispatch<React.SetStateAction<number[]>>;
}

const ScrollTab = memo(
  ({
    scrollX,
    titles,
    onPressTab,
    tabScrollRef,
    onScrollTo,
    indexPage,
    setIndex,
    layouts,
    setLayouts,
  }: Props) => {
    let timeout;
    useCode(() => {
      return call([scrollX], (value) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          setIndex(Math.round(value[0] / widthScreen));
          onScrollTo(Math.round(value[0] / widthScreen));
        }, 50);
      });
    }, [scrollX]);

    const onLayout = useCallback(
      (event) => {
        const x = event.nativeEvent.layout.x;
        const _layouts = [...layouts, x];
        _layouts.sort(function (a, b) {
          return a - b;
        });
        setLayouts([...layouts, x]);
      },
      [layouts, setLayouts]
    );

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={tabScrollRef}
        bounces={false}
        scrollEventThrottle={16}
        pagingEnabled={true}
      >
        {titles &&
          titles.map((i, index) => (
            <ScrollTabButton
              index={index}
              title={i}
              key={index.toString()}
              focus={index === indexPage}
              {...{ onPressTab, onLayout, onScrollTo }}
            />
          ))}
      </ScrollView>
    );
  }
);

export default ScrollTab;
