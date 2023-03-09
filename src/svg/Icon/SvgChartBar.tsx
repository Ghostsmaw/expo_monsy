import colors from "@utils/colors";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

function SvgComponent(props: Props) {
  const { color } = props;
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3a1 1 0 011-1h3a1 1 0 011 1v17h1a1 1 0 110 2H2a1 1 0 110-2h1v-6a1 1 0 011-1h3a1 1 0 011 1v6h1.5V9a1 1 0 011-1h3a1 1 0 011 1v11H16V3zm2 17h1V4h-1v16zm-5.5 0V10h-1v10h1zM6 20v-5H5v5h1z"
        fill={color ? color : colors.grey3}
      />
    </Svg>
  );
}

const SvgChartBar = React.memo(SvgComponent);
export default SvgChartBar;
