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
        d="M2 6a2 2 0 104 0 2 2 0 00-4 0zm6-1h14v2H8V5zm14 6H8v2h14v-2zM8 19h14v-2H8v2zm-6-1a2 2 0 104 0 2 2 0 00-4 0zm2-4a2 2 0 110-4 2 2 0 010 4z"
        fill="#9448BC"
      />
    </Svg>
  );
}

const SvgList = React.memo(SvgComponent);
export default SvgList;
