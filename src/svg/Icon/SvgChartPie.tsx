import colors from "@utils/colors";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface Props {
  color?: any;
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
        d="M12 4a8 8 0 100 16 8 8 0 000-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z"
        fill={color ? color : colors.grey3}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2a1 1 0 011 1v9a1 1 0 11-2 0V3a1 1 0 011-1z"
        fill={color ? color : colors.grey3}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.66 7a1 1 0 01-.366 1.366l-15.588 9a1 1 0 11-1-1.732l15.588-9A1 1 0 0120.66 7z"
        fill={color ? color : colors.grey3}
      />
    </Svg>
  );
}

const SvgChartPie = React.memo(SvgComponent);
export default SvgChartPie;
