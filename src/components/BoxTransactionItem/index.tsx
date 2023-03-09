import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { Layout } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Text from "@components/Text";
import TransactionItem from "./TransactionItem";

import ROUTES from "@utils/routes";
import { TransactionFragment } from "@constant/Types";
import colors from "@utils/colors";

interface Props {
  style?: ViewStyle;
  title?: string;
  content?: TransactionFragment[];
}

const BoxTransactionItem = ({ title, content, style }: Props) => {
  const navigation = useNavigation();
  return (
    <Layout style={[styles.container, style]}>
      <Text uppercase={true} category="title4" margin={16} >
        {title}
      </Text>
      <Layout level="3" style={styles.line} />
      {content &&
        content.map((item: any, index: number) => {
          const onPress = () => {
            navigation.navigate(ROUTES.EditTransaction, item);
          };
          return <TransactionItem onPress={onPress} {...item} key={index} />;
        })}
    </Layout>
  );
};

export default BoxTransactionItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
    backgroundColor: colors.white,
  },
  line: {
    height: 1,
  },
});
