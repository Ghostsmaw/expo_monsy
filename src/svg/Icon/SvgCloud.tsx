import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.714 18.428v2.286h1.143a5.714 5.714 0 00.83-11.369A8.005 8.005 0 007.393 7.057a6.859 6.859 0 00.892 13.657v-2.286a4.571 4.571 0 01-.183-9.139l.63-.025.314-.545a5.716 5.716 0 0110.588 1.9l.164.973.987-.02H20.857a3.429 3.429 0 010 6.856h-1.143zM15.143 23v-7.527l2.62 2.62 1.617-1.616-5.38-5.38-5.38 5.38 1.617 1.617 2.62-2.62V23h2.286z"
        fill="#FF8552"
      />
    </Svg>
  );
}

const SvgCloud = React.memo(SvgComponent);
export default SvgCloud;
