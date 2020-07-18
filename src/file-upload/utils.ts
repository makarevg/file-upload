import { DragEvent } from 'react';

export function getUniqueCounter(start = 0): () => number {
  let count = start;
  return () => {
    count += 1;
    return count;
  };
}

export const uniqueId = getUniqueCounter();

export function isDragDataWithFiles({ dataTransfer }: DragEvent): boolean {
  if (!dataTransfer) {
    return true;
  }

  return [...dataTransfer.types].every((type) => (type === 'Files' || type === 'application/x-moz-file'));
}

export function fileListSpread(fileList: FileList | null): File[] {
  const spread: File[] = [];
  if (fileList) {
    for (let i = 0; i < fileList.length; i += 1) {
      const file = fileList.item(i);
      if (file) {
        spread.push(file);
      }
    }
  }
  return spread;
}

// TODO: change to regex
export const isImage = (file: File) => [
  'image/jpeg',
  'image/png',
].includes(file.type);

export const createFileData = (file: File): FileData => ({
  id: String(-uniqueId()),
  name: file.name,
  src: '',
  file,
});

export const toArray = <A>(value: A | A[]): A[] => Array.isArray(value) ? value : [value];

export const stopPropagation = (e: DragEvent): void => {
  e.preventDefault();
  e.stopPropagation();
};
