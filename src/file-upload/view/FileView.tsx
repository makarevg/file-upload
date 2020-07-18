import * as React from 'react';
import { FileLayout, FileProps } from '../';

export function FileView<F extends FileData>({
  data,
  remove,
  disabled,
}: FileProps<F>) {
  return (
    <FileLayout
      deleteFile={remove}
      disabled={disabled}
    >
      {data?.src ? (
        <a
          href={data.src}
          target="_blank"
          download
          rel="noopener noreferrer"
          title={data.name}
        >
          {data.name}
        </a>
      ) : (
        <>
          {data?.name || 'Ошибка отображения файла'}
        </>
      )}
    </FileLayout>
  );
}
