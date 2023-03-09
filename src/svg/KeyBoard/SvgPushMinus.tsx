import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={27}
      height={20}
      viewBox="0 0 27 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.551 9.41v1.892H7.107v4.444H5.215v-4.444H.771V9.41h4.444V4.966h1.892V9.41h4.444zm.896 9.988L18.475.5h2.134L14.58 19.398h-2.134zm13.82-9.878v2.222h-4.84V9.52h4.84z"
        fill="#252827"
      />
    </Svg>
  )
}

const SvgPushMinus = React.memo(SvgComponent)
export default SvgPushMinus
