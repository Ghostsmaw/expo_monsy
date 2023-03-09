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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.738 3.101a1.92 1.92 0 01.812-.178.964.964 0 00.002-1.928 3.848 3.848 0 00-2.948 1.37.964.964 0 101.474 1.241 1.92 1.92 0 01.66-.505zM6.522 5.086a6.865 6.865 0 016.415.43 6.866 6.866 0 019.01 1.594c.484.615.39 1.503-.21 2.004a1.45 1.45 0 01-.177.126 2.892 2.892 0 00.19 5.055c.678.332.991 1.137.701 1.846-.633 1.546-1.537 2.918-2.57 3.924-.999.975-2.29 1.767-3.692 1.767H9.686c-1.039 0-2.009-.437-2.82-1.027-.824-.598-1.579-1.42-2.217-2.364-1.273-1.884-2.19-4.42-2.19-7.087a6.865 6.865 0 014.063-6.268z"
        fill="#fff"
      />
    </Svg>
  );
}

const SvgApple = React.memo(SvgComponent);
export default SvgApple;
