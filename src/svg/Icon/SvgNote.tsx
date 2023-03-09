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
        d="M5.164 15l7.586-7.586 3.836 3.836L9 18.836 5.164 15zm-2.294-.327a1.75 1.75 0 00-.12.637v4.19a1.75 1.75 0 001.75 1.75h4.498M2.87 14.673l.013-.032a1.75 1.75 0 01.38-.568l11.25-11.25.692.693-.692-.693a1.75 1.75 0 012.474 0l-.52.52.52-.52 4.19 4.19a1.75 1.75 0 010 2.474l-2.46 2.461-.01.01-.009.008-7.284 7.284h8.836a1 1 0 110 2H9m-4.25-3.836l1.836 1.836H4.75v-1.836zM14.164 6L18 9.836l1.586-1.586-3.836-3.836L14.164 6z"
        fill="#9448BC"
      />
    </Svg>
  )
}

const SvgNote = React.memo(SvgComponent)
export default SvgNote
