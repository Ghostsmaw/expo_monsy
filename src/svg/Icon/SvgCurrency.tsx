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
        d="M12 5.125a1.1 1.1 0 011.1 1.1v1.65a1.1 1.1 0 01-2.2 0v-1.65a1.1 1.1 0 011.1-1.1zM12 15.025a1.1 1.1 0 011.1 1.1v1.65a1.1 1.1 0 01-2.2 0v-1.65a1.1 1.1 0 011.1-1.1z"
        fill="#9448BC"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3.2a8.8 8.8 0 100 17.6 8.8 8.8 0 000-17.6zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"
        fill="#9448BC"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.763 8.975a.962.962 0 100 1.925h2.475a3.163 3.163 0 010 6.325H9.525a1.1 1.1 0 010-2.2h3.713a.962.962 0 100-1.925h-2.475a3.162 3.162 0 010-6.325h3.712a1.1 1.1 0 010 2.2h-3.712z"
        fill="#9448BC"
      />
    </Svg>
  );
}

const SvgCurrency = React.memo(SvgComponent);
export default SvgCurrency;
