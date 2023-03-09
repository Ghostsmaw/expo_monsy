import React, { Component } from "react";
import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { widthScreen } from "@utils/dimensions";
import colors from "@utils/colors";
import Text from "@elements/Text";
import FONTS from "@utils/fonts";

export interface IProps {
  titleTab1: string;
  titleTab2: string;
  onPressTab1: () => void;
  onPressTab2: () => void;
}

 export interface IState {
  active: number,
  xTabOne: number,
  xTabTwo: number,
  translateX: any,
  translateXTabOne: any,
  translateXTabTwo: any,
  translateY: number
} 

export default class AnimatedTab extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      active: 0,
      xTabOne: 0,
      xTabTwo: 0,
      translateX: new Animated.Value(0),
      translateXTabOne: new Animated.Value(0),
      translateXTabTwo: new Animated.Value(widthScreen),
      translateY: -1000,
    };
  }
  handleSlide = (type: any) => {
    let {
      active,
      translateX,
      translateXTabOne,
      translateXTabTwo,
    } = this.state;
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
      useNativeDriver: false,
    }).start();
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: widthScreen,
          duration: 100,
          useNativeDriver: false,
        }).start(),
      ]);
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -widthScreen,
          duration: 100,
          useNativeDriver: false,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }).start(),
      ]);
    } 
  };

  render() {
    let { xTabOne, xTabTwo, translateX, active } = this.state;

    const onLayOutTab1 = (event: any) => {
      this.setState({ xTabOne: event.nativeEvent.layout.x });
    };

    const onLayOutTab2 = (event: any) => {
      this.setState({ xTabTwo: event.nativeEvent.layout.x });
    };

    const onPressTab1 = () => {
      this.props.onPressTab1 && this.props.onPressTab1();
      this.setState({ active: 0 }, () => this.handleSlide(xTabOne));
    };

    const onPressTab2 = () => {
      this.props.onPressTab2 && this.props.onPressTab2();
      this.setState({ active: 1 }, () => this.handleSlide(xTabTwo));
    };


    const tab1Style =
      active === 0
        ? { backgroundColor: colors.redCrayola }
        :
        { backgroundColor: colors.bleuDeFrance }

    const textTab1Style =
      active === 0 ? { color: colors.white } : { color: colors.grey3 };

    const textTab2Style =
      active === 1 ? { color: colors.white } : { color: colors.grey3 };

    return (
      <View style={styles.container}>
        <View style={styles.tabView}>
          <Animated.View
            style={[
              styles.tabTranslate,
              tab1Style,
              { transform: [{ translateX }] },
            ]}
          />
          <TouchableOpacity
            style={styles.tabStyle}
            onLayout={onLayOutTab1}
            onPress={onPressTab1}
          >
            <Text style={[styles.title, textTab1Style]}>
              {this.props.titleTab1}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabStyle}
            onLayout={onLayOutTab2}
            onPress={onPressTab2}
          >
            <Text style={[styles.title, textTab2Style]}>
              {this.props.titleTab2}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  tabView: {
    flexDirection: "row",
    position: "relative",
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.snow,
  },
  tabTranslate: {
    position: "absolute",
    width: "50%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: colors.redCrayola,
    borderRadius: 20,
  },
  tabStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  titleTabActive: {
    color: colors.white,
  },
  titleTabInactive: {
    color: colors.grey3,
  },
  title: {
    fontFamily: FONTS.MUKTA.Bold,
    fontWeight: "600",
    fontSize: 17,
  },
});
