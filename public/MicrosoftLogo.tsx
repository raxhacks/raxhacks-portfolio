import * as React from "react";

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {}

const SvgIcon: React.FC<SvgIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="800"
    height="800"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#000"
      d="M4 4h7.5v7.5H4zm8.5 0H20v7.5h-7.5zM4 12.5h7.5V20H4zm8.5 0H20V20h-7.5z"
    />
  </svg>
);

export default SvgIcon;
