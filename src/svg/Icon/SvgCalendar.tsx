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
        d="M6 6h2V5h8v1h2V5h2v3H4V5h2v1zm-2 4v10h16V10H4zm4-7h8V2h2v1h2a2 2 0 012 2v15a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h2V2h2v1z"
        fill="#9448BC"
      />
    </Svg>
  );
}

const SvgCalendar= React.memo(SvgComponent);
export default SvgCalendar;
