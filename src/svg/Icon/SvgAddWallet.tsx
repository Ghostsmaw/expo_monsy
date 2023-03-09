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
        d="M21.182 3H2.818C1.814 3 1 3.895 1 5v12c0 1.105.814 2 1.818 2H14v-2H3v-7h18v3h2V5c0-1.105-.814-2-1.818-2zM21 8V5H3v3h18zm-4 11v-2h2v-2h2v2h2v2h-2v2h-2v-2h-2z"
        fill="#fff"
      />
    </Svg>
  )
}

const SvgAddWallet = React.memo(SvgComponent)
export default SvgAddWallet
