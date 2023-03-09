import React, { memo, useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Animated, Image, LogBox } from 'react-native';
import Text from '@elements/Text';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import colors from '@utils/colors';
import ButtonBottomAnimated from '@elements/Button/ButtonBottom';
import PremiumItem from './components/PremiumItem';
import { GET_PREMIUM } from '@data/index';
import { Switch } from 'react-native-switch';
import useLayout from '@hooks/useLayout';

const GetPremium = memo(() => {
  const { bottom } = useLayout();
  //const [currency, setCurrency] = useState<object>({});
  const [currency, setCurrency] = useState<string>('$');
  const safePerYear = 48;
  const [amount, setAmount] = useState<number>(13);
  const [enable, setEnable] = useState<boolean>(false);

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  const onPressSwitch = useCallback(() => {
    setEnable(!enable);
  }, [enable]);

  const onPressAccess = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content" />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        bounces={false}
        contentContainerStyle={{ paddingBottom: bottom + 80 }}
      >
        <View style={styles.topView}>
          <Image
            style={styles.image}
            source={require('@assets/GetPremium/Frame.png')}
          />
          <Text
            bold
            size={28}
            lineHeight={34}
            color={colors.white}
            center
            marginTop={24}
          >
            {currency}
            {amount}/month
          </Text>
          <Text size={16} lineHeight={22} color={colors.white} center>
            Save {currency}
            {safePerYear} a year
          </Text>
          <View style={styles.viewFrequency}>
            <Text size={16} color={!enable ? colors.white : colors.honeyDrew}>
              Monthly
            </Text>
            <Switch
              containerStyle={styles.containerStyle}
              value={enable}
              onValueChange={onPressSwitch}
              circleSize={28}
              barHeight={32}
              circleBorderWidth={0}
              backgroundActive={colors.purplePlum}
              backgroundInactive={colors.snow}
              circleActiveColor={colors.white}
              circleInActiveColor={colors.rum}
              renderActiveText={false}
              renderInActiveText={false}
            />
            <Text size={16} color={enable ? colors.white : colors.honeyDrew}>
              Yearly
            </Text>
          </View>
        </View>
        <Animated.View style={styles.contentStyle}>
          <Text bold size={22} lineHeight={37}>
            Monsy Premium
          </Text>
          <Text marginTop={16} size={16} color={colors.grey2} lineHeight={22}>
            Upgrade your premium account to unlock all the special functions of
            the app.
          </Text>
          {GET_PREMIUM.map((item, index) => {
            return (
              <PremiumItem key={index} {...item} style={styles.premiumItem} />
            );
          })}
        </Animated.View>
      </Animated.ScrollView>
      <ButtonBottomAnimated
        onPress={onPressAccess}
        titleStyle={styles.textAccess}
        title={'Access now'}
      />
    </View>
  );
});

export default GetPremium;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentStyle: {
    backgroundColor: colors.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    marginTop: -20,
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  topView: {
    backgroundColor: colors.emerald,
    paddingBottom: 30,
  },
  image: {
    alignSelf: 'center',
    marginTop: 8,
    width: 280,
    height: 118,
  },
  premiumItem: {
    marginTop: 24,
  },
  switch: {
    alignSelf: 'center',
    marginTop: 8,
    width: 56,
  },
  containerStyle: {
    alignSelf: 'center',
    marginHorizontal: 8,
  },
  viewFrequency: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  textAccess: {
    fontSize: 17,
  },
});
