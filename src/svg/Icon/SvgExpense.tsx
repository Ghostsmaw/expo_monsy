
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
        d="M1.879 2H14.12c.67 0 1.212.597 1.212 1.333V8H14V6.667H2v4.666h6v1.334H1.879c-.67 0-1.212-.597-1.212-1.334v-8C.667 2.597 1.209 2 1.879 2zM14 3.333v2H2v-2h12zm-4.667 8h3.057l-.861.862.942.943 2.472-2.471-2.472-2.472-.942.943.861.862H9.333v1.333z"
        fill="#F85F5F"
      />
    </Svg>
  )
}

const SvgExpense = React.memo(SvgComponent)
export default SvgExpense
