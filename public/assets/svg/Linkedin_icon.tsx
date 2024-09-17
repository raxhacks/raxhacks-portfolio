import * as React from "react";
import { SVGProps, memo } from "react";

interface LiveIconProps extends SVGProps<SVGSVGElement> {
    strokeColor?: string;
}

const SvgComponent = ({ strokeColor = "#fff", ...props }: LiveIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    className={props.className}
    fill="none"
    viewBox="0 0 18 18"
  >
    <path
      fill={strokeColor}
      d="M16 0a2 2 0 012 2v14a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2h14zm-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3V7.13H7.13v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79zM3.88 5.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94V7.13H2.5v8.37h2.77z"
    ></path>
  </svg>
);

const Memo = memo(SvgComponent);
export default Memo;
