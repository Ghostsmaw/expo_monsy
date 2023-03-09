import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props: any) {
  return (
    <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M20 3H5a1.5 1.5 0 00-1.5 1.5v15A1.5 1.5 0 005 21h8.25v-6.75H11v-3h2.25V9.31c0-2.325 1.42-3.591 3.494-3.591.994 0 1.848.074 2.096.107v2.43h-1.438c-1.128 0-1.346.537-1.346 1.323v1.671h3.33l-.75 3h-2.58V21H20a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0020 3z"
        fill="#fff"
      />
    </Svg>
  );
}

const SvgFacebook = React.memo(SvgComponent);
export default SvgFacebook;
