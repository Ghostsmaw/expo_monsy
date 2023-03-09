import React, { memo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import FONTS from '@utils/fonts';
import Text from '@elements/Text';

const WalkThrough = memo(() => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.walkThrough}>Walk Through</Text>
      </ScrollView>
    </View>
  );
});

export default WalkThrough;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  walkThrough: {
    fontSize: 28,
    color: 'black',
    fontFamily: FONTS.MUKTA.Bold,
  },
});
