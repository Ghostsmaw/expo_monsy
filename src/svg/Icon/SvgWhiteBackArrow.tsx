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
        d="M6.414 13l6.293 6.293-1.414 1.414L2.586 12l8.707-8.707 1.414 1.414L6.414 11H21v2H6.414z"
        fill="#fff"
      />
    </Svg>
  )
}

const SvgWhiteBackArrow = React.memo(SvgComponent)
export default SvgWhiteBackArrow
