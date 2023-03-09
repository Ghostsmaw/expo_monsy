import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props: any) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.025 6.036v7.857h15.388V6.036H2.025zm-1.62-.197c0-.76.634-1.375 1.417-1.375h15.793c.783 0 1.418.616 1.418 1.375v8.25c0 .76-.635 1.375-1.418 1.375H1.822c-.783 0-1.417-.615-1.417-1.375V5.84z"
        fill={props.color ? props.color : "#9448BC"}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.719 8.393c-.895 0-1.62.703-1.62 1.571s.725 1.572 1.62 1.572c.894 0 1.62-.704 1.62-1.572 0-.868-.726-1.571-1.62-1.571zm-3.24 1.571c0-1.736 1.45-3.143 3.24-3.143 1.789 0 3.24 1.407 3.24 3.143 0 1.736-1.451 3.143-3.24 3.143-1.79 0-3.24-1.407-3.24-3.143zM12.754 4.732a.827.827 0 011.143-.073l4.859 4.125a.77.77 0 01.076 1.108.827.827 0 01-1.143.074l-4.86-4.125a.77.77 0 01-.075-1.109z"
        fill={props.color ? props.color : "#9448BC"}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.832 10.036a.77.77 0 01-.076 1.109l-4.86 4.125a.827.827 0 01-1.142-.074.77.77 0 01.076-1.109l4.86-4.125a.827.827 0 011.142.074zM6.684 4.732a.77.77 0 01-.076 1.11l-4.86 4.124a.827.827 0 01-1.143-.074.77.77 0 01.076-1.108l4.86-4.125a.827.827 0 011.143.074z"
        fill={props.color ? props.color : "#9448BC"}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.605 10.036a.827.827 0 011.143-.074l4.86 4.125a.77.77 0 01.076 1.109.827.827 0 01-1.143.074L.68 11.145a.77.77 0 01-.076-1.109z"
        fill={props.color ? props.color : "#9448BC"}
      />
    </Svg>
  )
}

const SvgCash = React.memo(SvgComponent)
export default SvgCash
