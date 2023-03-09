import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: any) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.652 10.618l2.13 2.122a.747.747 0 01.008 1.046.76.76 0 01-.525.214.728.728 0 01-.526-.214l-2.138-2.13a6.534 6.534 0 01-4.046 1.4C2.937 13.057 0 10.133 0 6.529 0 2.925 2.937 0 6.555 0c3.617 0 6.554 2.933 6.554 6.528 0 1.49-.514 2.934-1.457 4.09zM6.555 1.474c-2.796 0-5.075 2.27-5.075 5.054 0 2.786 2.279 5.055 5.075 5.055 2.797 0 5.075-2.27 5.075-5.055 0-2.785-2.278-5.054-5.075-5.054z"
        fill="#8E8E93"
      />
    </Svg>
  );
}

const SvgSearch = React.memo(SvgComponent);
export default SvgSearch;
