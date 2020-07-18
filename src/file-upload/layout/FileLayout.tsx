import * as React from 'react';
import { Button } from '../../button';
import { CrossIcon } from '../../assets/icons/Cross';
import styles from '../styles.scss';

type Props = {
  disabled: boolean,
  deleteFile?: () => void,
  children: React.ReactNode,
}

export const FileLayout = React.memo(({
  deleteFile,
  disabled,
  children,
}: Props) => (
  <div className={styles['files__item']}>
    <div className={styles['files__item-name']}>
      {children}
    </div>
    {!disabled && (
      <Button
        type="button"
        // className={styles['file-delete-btn']}
        size="fit"
        colors="dangerous"
        variant="icon"
        onClick={deleteFile}
        title="Удалить"
      >
        <CrossIcon
          width={12}
          height={12}
        />
      </Button>
    )}
  </div>
));
