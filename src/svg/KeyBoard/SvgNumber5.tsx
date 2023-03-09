import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={10}
      height={15}
      viewBox="0 0 10 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8.913.096v2.266l-4.84.044-.308 2.772c.205-.03.367-.044.484-.044h.506c.616 0 1.21.088 1.782.264a4.246 4.246 0 011.518.77c.44.337.792.777 1.056 1.32s.396 1.188.396 1.936c0 .66-.117 1.283-.352 1.87a4.062 4.062 0 01-1.034 1.518c-.455.44-1.041.792-1.76 1.056-.719.25-1.562.374-2.53.374-.704 0-1.35-.073-1.936-.22a7.937 7.937 0 01-1.518-.528l.616-2.134c.381.176.777.323 1.188.44.41.117.873.176 1.386.176.953 0 1.68-.22 2.178-.66.499-.44.748-1.012.748-1.716 0-.807-.286-1.408-.858-1.804-.557-.396-1.276-.594-2.156-.594-.381 0-.77.03-1.166.088-.396.044-.77.103-1.122.176L1.873.14l7.04-.044z"
        fill="#414742"
      />
    </Svg>
  )
}

const SvgNumber5 = React.memo(SvgComponent)
export default SvgNumber5