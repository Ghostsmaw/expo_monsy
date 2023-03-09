import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={10}
      height={15}
      viewBox="0 0 10 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M9.086.14v1.87L3.234 14.506l-2.53-1.078L6.27 2.252H.132V.14h8.954z"
        fill="#414742"
      />
    </Svg>
  )
}

const SvgNumber7 = React.memo(SvgComponent)
export default SvgNumber7
