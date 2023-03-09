import React from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Text from "@components/Text";
import Transaction from "./Transaction";

import ROUTES from "@utils/routes";
import { TransactionFragment, TransactionProps } from "@constant/Types";

interface TransactionBoxProps {
  item: TransactionProps;
}

const TransactionBox = ({ item }: TransactionBoxProps) => {
  const { title, content } = item;
  const { navigate } = useNavigation();
  return (
    <Layout style={styles.container}>
      <Text category="title4" margin={16}>
        {title}
      </Text>
      <Layout level="3" style={styles.line} />
      {content &&
        content.map((item: TransactionFragment, index: number) => {
          const onPress = () => {
            navigate(ROUTES.EditTransaction, item);
          };
          return <Transaction key={index} item={item} onPress={onPress} />;
        })}
    </Layout>
  );
};

export default TransactionBox;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
  },
  line: {
    height: 1,
  },
});
