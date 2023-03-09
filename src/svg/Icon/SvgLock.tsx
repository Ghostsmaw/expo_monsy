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
        d="M7 7v3H6c-1.068 0-2 .776-2 1.833v8.334C4 21.224 4.932 22 6 22h12c1.068 0 2-.776 2-1.833v-8.334C20 10.776 19.068 10 18 10h-1V7A5 5 0 007 7zm8 0v3H9V7a3 3 0 116 0zM6 20v-8h12v8H6zm7-4a1 1 0 11-2 0 1 1 0 012 0z"
        fill="#9448BC"
      />
    </Svg>
  );
}

const SvgLock = React.memo(SvgComponent);
export default SvgLock;
