import * as React from 'react';

export type IconProps = React.SVGProps<SVGSVGElement>

export const SvgIcon: React.FC<IconProps> = ({
  children,
  width = 15,
  height = 15,
  ...props
}) => (
  <svg fill="none" {...props} width={width} height={height}>
    {children}
  </svg>
);
