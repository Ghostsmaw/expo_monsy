import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={6}
      height={8}
      viewBox="0 0 6 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3.358 4L.535 1.177a.69.69 0 01.976-.975l3.31 3.31a.69.69 0 010 .976l-3.31 3.31a.69.69 0 11-.976-.975L3.358 4z"
        fill="#fff"
      />
    </Svg>
  )
}

const SvgWhiteRightArrow = React.memo(SvgComponent)
export default SvgWhiteRightArrow
