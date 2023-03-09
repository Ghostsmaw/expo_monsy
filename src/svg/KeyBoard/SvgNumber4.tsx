import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={13}
      height={14}
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6.636.14h3.388v8.404h2.024v2.266h-2.024V14H7.23v-3.19H.806V8.94l5.83-8.8zm-.594 5.038L3.798 8.544H7.23V5.42l.132-2.662h-.044l-1.276 2.42z"
        fill="#414742"
      />
    </Svg>
  )
}

const SvgNumber4 = React.memo(SvgComponent)
export default SvgNumber4
