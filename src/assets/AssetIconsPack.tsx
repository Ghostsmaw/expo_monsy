import React from "react";
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import { IconPack, IconProvider } from "@ui-kitten/components";
import { SvgProps } from "react-native-svg";
import { Icons } from "./icons";

const createIcon = (source: ImageSourcePropType): IconProvider<ImageProps> => {
  return {
    toReactElement: (props) => (
      <Image
        style={styles.icon}
        {...props}
        source={source}
        resizeMode="cover"
      />
    ),
  };
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const AssetIconsPack: IconPack<ImageProps | SvgProps> = {
  name: "assets",
  icons: {
    arrowLeft: createIcon(Icons.arrowLeft),
    arrowRight: createIcon(Icons.arrowRight),
    plus: createIcon(Icons.plus),
    search: createIcon(Icons.search),
    award: createIcon(Icons.award),
    moon: createIcon(Icons.moon),
    general: createIcon(Icons.general),
    wallet: createIcon(Icons.wallet),
    currency: createIcon(Icons.currency),
    category: createIcon(Icons.category),
    lock: createIcon(Icons.lock),
    calendar: createIcon(Icons.calendar),
    checkMark: createIcon(Icons.checkMark),
    clear: createIcon(Icons.clear),
    delete: createIcon(Icons.delete),
    divide: createIcon(Icons.divide),
    minus: createIcon(Icons.minus),
    multiply: createIcon(Icons.multiply),
    0: createIcon(Icons[0]),
    1: createIcon(Icons[1]),
    2: createIcon(Icons[2]),
    3: createIcon(Icons[3]),
    4: createIcon(Icons[4]),
    5: createIcon(Icons[5]),
    6: createIcon(Icons[6]),
    7: createIcon(Icons[7]),
    8: createIcon(Icons[8]),
    9: createIcon(Icons[9]),
    plusSubtract: createIcon(Icons.plusSubtract),
    dot: createIcon(Icons.dot),
    income: createIcon(Icons.income),
    expense: createIcon(Icons.expense),
  },
};

export default AssetIconsPack;
