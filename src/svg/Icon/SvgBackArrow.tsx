import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({...props}) {
  return (
    <Svg
      width={20}
      height={16}
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.707.293a1 1 0 01.083 1.32l-.083.094L3.415 7H19a1 1 0 01.117 1.993L19 9H3.415l5.292 5.293a1 1 0 01.083 1.32l-.083.094a1 1 0 01-1.32.083l-.094-.083-7-7a1.009 1.009 0 01-.097-.112l-.071-.11L.07 8.37l-.035-.105-.025-.118-.007-.058L0 8l.003-.075.017-.126.03-.111.044-.111.052-.098.064-.092.083-.094 7-7a1 1 0 011.414 0z"
        fill="#252827"
      />
    </Svg>
  );
}

const SvgBackArrow = React.memo(SvgComponent);
export default SvgBackArrow;
