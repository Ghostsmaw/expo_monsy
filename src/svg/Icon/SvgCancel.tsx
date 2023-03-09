import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props: any) {
  return (
    <Svg
      width={8}
      height={8}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M4.009 3.039L6.096.945A.679.679 0 017.043.94a.659.659 0 01.017.942L4.929 4.022l1.962 2.09a.659.659 0 01.018.943.68.68 0 01-.956-.005l-1.96-2.088-2.088 2.093a.679.679 0 01-.947.005.659.659 0 01-.018-.943l2.13-2.138-1.96-2.092a.659.659 0 01-.018-.942.681.681 0 01.956.005l1.96 2.089z"
        fill="#fff"
      />
    </Svg>
  );
}

const SvgCancel = React.memo(SvgComponent);
export default SvgCancel;
