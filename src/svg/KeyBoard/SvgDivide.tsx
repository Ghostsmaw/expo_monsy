import * as React from "react"
import Svg, { Path } from "react-native-svg"

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
        d="M13.5 6.75a1.75 1.75 0 11-3.5 0 1.75 1.75 0 013.5 0zM19 11v2H5v-2h14zm-7.25 7.5a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5z"
        fill="#9448BC"
      />
    </Svg>
  )
}

const SvgDivide = React.memo(SvgComponent)
export default SvgDivide
