import React, { memo } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { useTheme, Icon, Input, TopNavigation } from "@ui-kitten/components";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import useLayout from "@hooks/useLayout";

import Content from "@components/Content";
import Container from "@components/Container";
import ListCategory from "@components/ListCategory";
import NavigationAction from "@components/NavigationAction";

import ROUTES from "@utils/routes";
import changeAlias from "@utils/stringAlias";
import keyExtractor from "@utils/keyExtractor";
import { ILoading } from "@store/models/reducers/loading";
import { IMasterState } from "@store/models/reducers/master";
import { RefreshControl } from "react-native-web-refresh-control";
import {
  CategoriesFragment,
  CategoryFragment,
  Category_Types_Enum,
} from "@constant/Types";

interface IState {
  masterReducer: IMasterState;
  loadingReducer: ILoading;
}

const AddTransactionCategory = memo(({ route }: any) => {
  const theme = useTheme();
  const { navigate } = useNavigation();
  const { bottom } = useLayout();

  const [expand, setExpand] = React.useState<boolean>(false);
  const [close, setClose] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");
  const [listCategories, setListCategories] = React.useState<
    CategoriesFragment[]
  >([]);
  const [dataSearch, setDataSearch] = React.useState<CategoriesFragment[]>([]);

  const [goback, setGoBack] = React.useState<string>(ROUTES.CreateTransaction);

  const categories = useSelector(
    (state: IState) => state.masterReducer.categories
  );

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.route) {
        setGoBack(route.params?.route);
      } else {
        setGoBack(ROUTES.CreateTransaction);
      }
      if (route.params.type && categories) {
        const lCategories = categories.filter(
          (i) => i.type === route.params.type
        );
        setListCategories(lCategories);
      }
      if (route.params.type === Category_Types_Enum.Income) {
        setExpand(true);
      }
    }, [route.params?.category, route.params?.route])
  );

  React.useEffect(() => {
    let data: CategoriesFragment[] = [];
    if (search !== "" || search !== null || search !== undefined) {
      listCategories.map((item) => {
        let arr: CategoryFragment[] = [];
        const { children } = item;
        children &&
          children.map((i, idx) => {
            if (i.name && changeAlias(i.name).includes(changeAlias(search))) {
              arr.push(i);
            }
          });
        let dataTemp = {
          ...item,
          children: arr,
        };
        data.push(dataTemp);
      });
      setDataSearch(data);
    } else {
      setDataSearch(listCategories);
    }
  }, [search, listCategories]);

  const renderListCategory = React.useCallback(
    ({ item }) => {
      return (
        <View>
          <ListCategory
            expand={expand}
            close={close}
            item={item}
            idCategorySelected={route.params?.category.id}
            onCategory={(category) => {
              const params = { category: category };
              navigate(goback, params);
            }}
          />
        </View>
      );
    },
    [expand, close, goback]
  );

  return (
    <Container paddingTop>
      <TopNavigation
        title="Expense Categories"
        accessoryLeft={<NavigationAction />}
        accessoryRight={
          <NavigationAction
            title={expand ? "Collapse" : "Expand"}
            onPress={() => {
              if (expand) {
                setExpand(false);
                setClose(true);
              } else {
                setClose(false);
                setExpand(true);
              }
            }}
          />
        }
      />
      <Input
        style={styles.searchView}
        placeholder="Search category"
        value={search}
        onChangeText={setSearch}
        size="medium"
        status="search"
        accessoryLeft={() => (
          <Icon
            style={[
              styles.icon,
              { tintColor: theme["placeholder-text-input-color"] },
            ]}
            pack="assets"
            name="search"
          />
        )}
      />
      <Content
        contentContainerStyle={[styles.list, { paddingBottom: bottom + 16 }]}
        refreshControl={
          <RefreshControl style={{ tintColor: theme["color-primary-500"] }} />
        }
      >
        <FlatList
          scrollEnabled={false}
          data={dataSearch || []}
          renderItem={renderListCategory}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.contentContainerStyle,
            { backgroundColor: theme["background-basic-color-1"] },
          ]}
        />
      </Content>
    </Container>
  );
});

export default AddTransactionCategory;

const styles = StyleSheet.create({
  searchView: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  list: { padding: 16 },
  contentContainerStyle: {
    borderRadius: 12,
    overflow: "hidden",
    paddingHorizontal: 16,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
});
