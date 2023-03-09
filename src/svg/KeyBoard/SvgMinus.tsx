import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={20}
      height={2}
      viewBox="0 0 20 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 0v2H0V0h20z"
        fill="#9448BC"
      />
    </Svg>
  )
}

const SvgMinus = React.memo(SvgComponent)
export default SvgMinus
