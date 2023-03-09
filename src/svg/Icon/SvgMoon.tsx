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
        d="M13 9c0-1.975.82-3.815 2.24-5.132l1.477-1.372-1.985-.346C14.163 2.05 13.585 2 13 2 7.477 2 3 6.477 3 12s4.477 10 10 10a9.99 9.99 0 008.327-4.46l1.116-1.676-2.01.123A7 7 0 0113 9zm0 11a8 8 0 01-.495-15.985A8.97 8.97 0 0011 9c0 4.439 3.214 8.127 7.441 8.866A7.98 7.98 0 0113 20z"
        fill="#9448BC"
      />
    </Svg>
  );
}

const SvgMoon = React.memo(SvgComponent);
export default SvgMoon;
