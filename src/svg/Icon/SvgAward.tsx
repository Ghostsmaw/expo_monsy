import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0a5.333 5.333 0 00-3.24 9.57l-.754 5.675a.667.667 0 001.004.66L8 14.11l2.99 1.794a.667.667 0 001.004-.66l-.753-5.676A5.333 5.333 0 008 0zm2.22 8.66a.665.665 0 00-.107.07 4 4 0 11.108-.07zm-.23 1.623l.5 3.767-2.147-1.288a.667.667 0 00-.686 0L5.509 14.05l.5-3.767a5.318 5.318 0 001.99.384c.705 0 1.376-.137 1.992-.384z"
        fill="#fff"
      />
    </Svg>
  );
}

const SvgAward = React.memo(SvgComponent);
export default SvgAward;
