import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props: any) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 9h9v2h-9v9H9v-9H0V9h9V0h2v9z"
        fill="#fff"
      />
    </Svg>
  )
}

const SvgAdd = React.memo(SvgComponent)
export default SvgAdd
