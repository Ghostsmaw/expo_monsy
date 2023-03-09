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
        d="M9.707 14.293L19 5l1.414 1.414L9.707 17.121 4 11.414 5.414 10l4.293 4.293z"
        fill="#F9F9F9"
      />
    </Svg>
  )
}

const SvgCheckMark = React.memo(SvgComponent)
export default SvgCheckMark
