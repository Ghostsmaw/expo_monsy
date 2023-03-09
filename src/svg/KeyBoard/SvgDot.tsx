import * as React from "react"
import Svg, { Circle } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={4}
      height={4}
      viewBox="0 0 4 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={2} cy={2} r={2} fill="#414742" />
    </Svg>
  )
}

const SvgDot = React.memo(SvgComponent)
export default SvgDot
