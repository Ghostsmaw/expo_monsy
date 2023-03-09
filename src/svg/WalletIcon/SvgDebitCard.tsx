import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: any) {
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
        d="M2.818 3h18.364C22.186 3 23 3.895 23 5v12c0 1.105-.814 2-1.818 2H2.818C1.814 19 1 18.105 1 17V5c0-1.105.814-2 1.818-2zM3 10v7h18v-7H3zm0-2h18V5H3v3z"
        fill={props.color ? props.color : "#9448BC"}
      />
    </Svg>
  );
}

const SvgDebitCard = React.memo(SvgComponent);
export default SvgDebitCard;
