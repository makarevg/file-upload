import * as React from 'react';
import styles from './styles.scss';

type Props = {
  className?: string;
}

export const Skeleton: React.FC<Props> = ({
  className,
  children,
}) => (
  <div className={styles['container']}>
    <div className={className}>
      {children}
    </div>
  </div>
);
