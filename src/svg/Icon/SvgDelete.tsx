import colors from "@utils/colors";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
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
        d="M13.556 12.142l6.364 6.364-1.414 1.414-6.364-6.364-6.364 6.364-1.414-1.414 6.364-6.364-6.364-6.364 1.414-1.414 6.364 6.364 6.364-6.364 1.414 1.414-6.364 6.364z"
        fill={props.color ? props.color : colors.black}
      />
    </Svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
