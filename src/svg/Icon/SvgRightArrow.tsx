import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props: any) {
  return (
    <Svg
      width={5}
      height={8}
      viewBox="0 0 5 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3.335 4L.512 1.177a.69.69 0 01.975-.975l3.31 3.31a.69.69 0 010 .976l-3.31 3.31a.69.69 0 01-.975-.975L3.335 4z"
        fill="#9C9E9D"
      />
    </Svg>
  )
}

const SvgRightArrow = React.memo(SvgComponent)
export default SvgRightArrow
