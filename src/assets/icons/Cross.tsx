import * as React from 'react';
import { IconProps, SvgIcon } from '../../svg-icon';

export const CrossIcon: React.FC<IconProps> = ({ children, ...props }) => (
  <SvgIcon viewBox="0 0 19 19" {...props}>
    <path
      fillRule="nonzero"
      clipRule="evenodd"
      d="M2 0L19 17L17 19L0 2ZM0 17L17 0L19 2L2 19Z"
      fill="currentColor"
    />
  </SvgIcon>
);
