import * as React from "react"
import Svg, { Path } from "react-native-svg"

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
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.302 4h13a2 2 0 012 2v12a2 2 0 01-2 2h-13c-.505 0-.733-.186-1.197-.682a9.797 9.797 0 01-.572-.677L1 12l.533-.64 4.95-5.935c.105-.148.262-.358.446-.573.073-.086.145-.167.217-.241C7.53 4.209 7.817 4 8.302 4zm.15 2.148c-.136.16-.26.325-.382.492L3.603 12l4.493 5.393a8.853 8.853 0 00.516.607h12.69V6H8.585c-.041.043-.086.093-.133.148zm8.143 2.145l-2.293 2.293-2.293-2.293-1.414 1.414L12.887 12l-2.292 2.293 1.414 1.414 2.293-2.293 2.293 2.293 1.414-1.414L15.716 12l2.293-2.293-1.414-1.414z"
        fill="#252827"
      />
    </Svg>
  )
}

const SvgDelete = React.memo(SvgComponent)
export default SvgDelete
