import * as React from 'react';
import { Skeleton } from '../../skeleton';
import { isImage } from '../utils';
import { FileProps } from '../types';
import { FileLayout } from '../layout';
import styles from '../styles.scss';

type Preview = {
  src: string;
  srcSet?: string | null;
  name: string;
}

export const ImageView = React.memo(({
  disabled,
  remove,
  data,
}: FileProps<ImageFileData>) => {
  const [preview, setPreview] = React.useState<Preview | null>(
    !data?.src
      ? null
      : {
        src: data.src,
        name: data.name,
        srcSet: data.srcSet,
      },
  );

  React.useEffect(() => {
    const file = data?.file;

    if (preview || !file) {
      return;
    }

    if (!isImage(file)) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const pre = {
        src: String(reader.result),
        name: file.name,
      };
      setTimeout(() => setPreview(pre), 300);
    });

    reader.readAsDataURL(file);

    return () => {
      reader.abort();
    };
  }, [setPreview, preview, data?.file]);

  return (
    <FileLayout
      disabled={disabled}
      deleteFile={remove}
    >
      {preview ? (
        <a
          className={styles.preview}
          href={preview.src}
          target="_blank"
          download
          rel="noopener noreferrer"
          title={preview.name}
        >
          <img
            alt={preview.name}
            src={preview.src}
            srcSet={preview.srcSet ?? ''}
          />
        </a>
      ) : (
        <Skeleton className={styles['preview-skeleton']} />
      )}
    </FileLayout>
  );
});
