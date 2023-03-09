import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props: any) {
  const { color } = props;

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
        d="M12 2a1 1 0 011 1v9a1 1 0 11-2 0V3a1 1 0 011-1z"
        fill={color ? color : '#9C9E9D'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.66 7a1 1 0 01-.366 1.366l-15.588 9a1 1 0 11-1-1.732l15.588-9A1 1 0 0120.66 7zM9.577 2.695a1 1 0 01.423.817v6.756a1 1 0 01-.5.866l-5.85 3.377a1 1 0 01-1.483-.684A10.014 10.014 0 018.665 2.57a1 1 0 01.912.125zM8 5.071A8.014 8.014 0 004 12l4-2.31V5.072z"
        fill={color ? color : '#9C9E9D'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 3a1 1 0 011-1 10 10 0 11-8.623 15.067A1 1 0 015.1 16.053 8 8 0 1012 4a1 1 0 01-1-1z"
        fill={color ? color : '#9C9E9D'}
      />
    </Svg>
  );
}

const SvgChart = React.memo(SvgComponent);
export default SvgChart;
