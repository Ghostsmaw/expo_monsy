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
        d="M20.639 10.363h-8.59v3.682h4.868c-.778 2.455-2.7 3.273-4.908 3.273a5.318 5.318 0 113.414-9.39L18.1 5.382A9 9 0 1012.009 21c4.962 0 9.45-3.274 8.63-10.638z"
        fill="#fff"
      />
    </Svg>
  );
}

const SvgGoogle = React.memo(SvgComponent);
export default SvgGoogle;
