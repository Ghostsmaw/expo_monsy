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
        d="M3.25 6.25v11.5h17.5V6.25H3.25zm-2-.25c0-.966.784-1.75 1.75-1.75h18c.966 0 1.75.784 1.75 1.75v12A1.75 1.75 0 0121 19.75H3A1.75 1.75 0 011.25 18V6z"
        fill={props.color ? props.color : "#9448BC"}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.75 15.75a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1zM10.25 15.75a1 1 0 011-1h1.5a1 1 0 110 2h-1.5a1 1 0 01-1-1zM1.25 9.08a1 1 0 011-1h19.5a1 1 0 110 2H2.25a1 1 0 01-1-1z"
        fill={props.color ? props.color : "#9448BC"}
      />
    </Svg>
  );
}

const SvgCreditCard = React.memo(SvgComponent);
export default SvgCreditCard;
