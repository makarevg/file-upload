import * as React from 'react';
import styles from '../styles.scss';

type Props = {
  children: React.ReactNode,
}

export const FileListLayout = React.memo(({
  children,
}: Props) => (
  <div className={styles['list']}>
    <div className={styles['files']}>
      {children}
    </div>
  </div>
));
