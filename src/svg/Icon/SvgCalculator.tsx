import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props: any) {
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
        d="M18 1H6a2 2 0 00-2 2v18a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2zM6 7V3h12v4H6zm0 2v12h12V9H6zm4 10H8v-2h2v2zm1 0h2v-2h-2v2zm5 0h-2v-5h2v5zm-8-3h2v-2H8v2zm5 0h-2v-2h2v2zm-3-3H8v-2h2v2zm1 0h2v-2h-2v2zm5 0h-2v-2h2v2z"
        fill="#9448BC"
      />
    </Svg>
  )
}

const SvgCalculator = React.memo(SvgComponent)
export default SvgCalculator
