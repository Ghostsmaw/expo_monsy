import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={7}
      height={14}
      viewBox="0 0 7 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.273.14h2.398V14H3.789V2.824L1.215 4.056.533 1.878 4.273.14z"
        fill="#414742"
      />
    </Svg>
  )
}

const SvgNumber1 = React.memo(SvgComponent)
export default SvgNumber1
