import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={13}
      height={10}
      viewBox="0 0 13 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.707 2.392L6.252 8.848a.904.904 0 01-1.278 0L1.257 5.132a.904.904 0 011.277-1.277l3.079 3.078 5.817-5.817a.904.904 0 011.277 1.277z"
        fill="#fff"
      />
    </Svg>
  )
}

const SvgCheck = React.memo(SvgComponent)
export default SvgCheck
