import React, { memo } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useTheme, Icon, Input } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import useLayout from "@hooks/useLayout";

import Container from "@components/Container";
import CurrencyItem from "@components/CurrencyItem";

import ROUTES from "@utils/routes";
import changeAlias from "@utils/stringAlias";
import keyExtractor from "@utils/keyExtractor";
import { CurrencyFragment } from "@constant/Types";
import { IMasterState } from "@store/models/reducers/master";
import { RefreshControl } from "react-native-web-refresh-control";
import { onUpdateCurrencyRequest } from "@store/actions/currencyAction";

interface IState {
  masterReducer: IMasterState;
}

const Currency = memo(() => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { bottom } = useLayout();

  const [search, setSearch] = React.useState<string>("");

  const [dataSearch, setDataSearch] = React.useState<CurrencyFragment[]>([]);

  const currencies = useSelector(
    (state: IState) => state.masterReducer.currencies
  );

  React.useEffect(() => {
    try {
      setDataSearch(currencies);
    } catch (e) {}
  }, [currencies]);

  React.useEffect(() => {
    let data = dataSearch;
    if (search === "" || search === null || search === undefined) {
      setDataSearch(currencies);
    } else {
      data = [];
      currencies.map((item) => {
        if (
          changeAlias(item.name).includes(changeAlias(search)) ||
          changeAlias(item.currency).includes(changeAlias(search)) ||
          changeAlias(item.description).includes(changeAlias(search))
        ) {
          data.push(item);
        }
      });
      setDataSearch(data);
    }
  }, [search]);

  const onPressCurrencyItem = React.useCallback((item: CurrencyFragment) => {
    if (item.id) {
      dispatch(onUpdateCurrencyRequest(item.id));
      navigate(ROUTES.ProfileBottomTab);
    }
  }, []);

  const renderItem = React.useCallback(({ item }) => {
    return (
      <CurrencyItem onPress={() => onPressCurrencyItem(item)} item={item} />
    );
  }, []);

  return (
    <Container>
      <Input
        style={styles.searchView}
        placeholder={"Search currency"}
        value={search}
        onChangeText={setSearch}
        size="medium"
        status="search"
        accessoryLeft={<Icon pack="assets" name="search" />}
      />
      <FlatList
        data={dataSearch}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl style={{ tintColor: theme["color-primary-500"] }} />
        }
        contentContainerStyle={{ paddingBottom: bottom + 8 }}
      />
    </Container>
  );
});

export default Currency;

const styles = StyleSheet.create({
  searchView: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
