import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

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
      <G clipPath="url(#prefix__clip0)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.556 12.142l6.364 6.364-1.414 1.414-6.364-6.364-6.364 6.364-1.414-1.414 6.364-6.364-6.364-6.364 1.414-1.414 6.364 6.364 6.364-6.364 1.414 1.414-6.364 6.364z"
          fill="#9448BC"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

const SvgMultiply = React.memo(SvgComponent)
export default SvgMultiply
