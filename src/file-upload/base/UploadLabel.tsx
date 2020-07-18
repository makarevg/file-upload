import * as React from 'react';
import { Button } from '../../button';
import styles from '../styles.scss';

type Props = {
  disabled: boolean;
  hasFiles: boolean;
  isMultiple?: boolean;
  onClick(): void;
}

export const UploadLabel = React.memo(({
  hasFiles,
  disabled,
  onClick,
  isMultiple = false,
}: Props) => {
  const text = React.useMemo(() => isMultiple ? 'файлы' : 'файл', [isMultiple]);

  if (!hasFiles && disabled) {
    return (
      <div className={styles['label']}>
        Файлов не найдено
      </div>
    );
  }

  if (disabled) {
    return (
      <div className={styles['label']} />
    );
  }

  return (
    <div className={styles['label']}>
      <Button
        type="button"
        variant="outline"
        colors="primary"
        onClick={onClick}
      >
        Выберите&nbsp;
        {text}
      </Button>
      <span>
        {`или перетащите ${text} в эту область`}
      </span>
    </div>
  );
});
