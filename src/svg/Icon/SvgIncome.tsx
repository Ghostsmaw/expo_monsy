import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.879 2H14.12c.67 0 1.212.597 1.212 1.333v8c0 .737-.542 1.334-1.212 1.334H7.333v-1.334H14V6.667H2V8H.667V3.333C.667 2.597 1.209 2 1.879 2zM14 3.333v2H2v-2h12zm-13.333 8h3.057l-.862.862.943.943 2.471-2.471-2.471-2.472-.943.943.862.862H.667v1.333z"
        fill="#008BF8"
      />
    </Svg>
  )
}

const SvgIncome = React.memo(SvgComponent)
export default SvgIncome
