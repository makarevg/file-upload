import * as React from 'react';
import * as classNames from 'classnames';
import { stopPropagation } from '../utils';
import styles from '../styles.scss';

type Props = {
  onDrop(event: React.DragEvent): void;
  disabled: boolean;
  children: React.ReactNode;
}

export const UploadLayout = React.memo(({
  onDrop,
  disabled,
  children,
}: Props) => (
  <div
    className={classNames(styles['container'], {
      [styles['container--disabled']]: disabled,
    })}
    onDrop={onDrop}
    onDragOver={stopPropagation}
    onDragLeave={stopPropagation}
  >
    {children}
  </div>
));
