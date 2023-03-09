import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 15.333A7.333 7.333 0 118 .667a7.333 7.333 0 010 14.666zM8 14A6 6 0 108 2a6 6 0 000 12zm-.862-9.138l-.943.943L8.391 8l-2.196 2.195.943.943L10.276 8 7.138 4.862z"
        fill="#fff"
      />
    </Svg>
  );
}

const SvgCircleChevronRight = React.memo(SvgComponent);
export default SvgCircleChevronRight;
