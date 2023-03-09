import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 7V5H2v2h20zm0 4v2H2v-2h20zm-4 6v2H2v-2h16z"
        fill="#000"
      />
    </Svg>
  );
}

const SvgMenu = React.memo(SvgComponent);
export default SvgMenu;
