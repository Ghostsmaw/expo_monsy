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
        d="M15.45 1.403A2 2 0 0118 3.326V5h2a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2h.027A2.001 2.001 0 012 18.674V6.754a2 2 0 011.45-1.923l12-3.428zM10.14 19H20v-8h-2v4.246a2 2 0 01-1.45 1.923L10.14 19zM20 7v2h-2V7h2zM4 6.754v11.92l12-3.428V3.326L4 6.754zM14 9a1 1 0 11-2 0 1 1 0 012 0z"
        fill="#9448BC"
      />
    </Svg>
  );
}

const SvgWallet = React.memo(SvgComponent);
export default SvgWallet;
