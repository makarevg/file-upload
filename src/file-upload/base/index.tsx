import * as React from 'react';
import {
  createFileData,
  fileListSpread,
  isDragDataWithFiles,
  toArray,
} from '../utils';
import {
  UploadLayout,
  FileListLayout,
} from '../layout';
import { FileView } from '../view';
import { FileProps } from '../types';
import { UploadLabel } from './UploadLabel';
import styles from '../styles.scss';

type FileRenderProps<F extends FileData> = {
  FileComponent?: React.ComponentType<FileProps<F>>;
} | {
  children(file: FileProps<F>): React.ReactNode;
}

type FileRenderer<F extends FileData> = (props: FileProps<F>) => React.ReactNode;

type CommonProps<F extends FileData> = {
  accept?: string;
  disabled?: boolean;
} & FileRenderProps<F>

type MultipleOnChange<F extends FileData> = (value: Array<F | FileData>) => void;
type SingleOnChange<F extends FileData> = (value: F | FileData | undefined) => void;

type ValueProps<F extends FileData> = {
  isMultiple?: false;
  value: F | undefined
  onChange: SingleOnChange<F>;
} | {
  isMultiple: true;
  value: F[] | undefined
  onChange: MultipleOnChange<F>;
}

type Props<F extends FileData> = CommonProps<F> & ValueProps<F>;

type ValueChangeResolver<F extends FileData> = (
  onMultiple: (onChange: MultipleOnChange<F>) => void,
  onSingle: (onChange: SingleOnChange<F>) => void,
) => void

export function FileUpload<F extends FileData>(props: Props<F>) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const files: F[] = React.useMemo(() => toArray(props.value || []), [props.value]);
  const disabled = React.useMemo(() => props.disabled || false, [props.disabled]);
  const accept = React.useMemo(() => props.accept || '', [props.accept]);

  const changeResolver = React.useCallback<ValueChangeResolver<F>>((onMultiple, onSingle) => {
    if (disabled) {
      return;
    }

    if (props.isMultiple) {
      onMultiple(props.onChange);
    } else {
      onSingle(props.onChange);
    }
  }, [props.isMultiple, props.onChange, disabled]);

  const changeFiles = React.useCallback((newFiles: File[]) => {
    changeResolver(
      multiChange => multiChange([...files, ...newFiles.map(createFileData)]),
      singleChange => singleChange(newFiles[0] && createFileData(newFiles[0])),
    );
  }, [files, changeResolver]);

  const remove = React.useCallback((id: string) => {
    changeResolver(
      multiChange => multiChange(files.filter(file => file.id !== id)),
      singleChange => files[0] && files[0].id === id && singleChange(undefined),
    );
  }, [files, changeResolver]);

  const edit = React.useCallback((id: string, data: F) => {
    changeResolver(
      multiChange => multiChange(files.map(file => file.id !== id ? file : data)),
      singleChange => files[0] && files[0].id === id && singleChange(data),
    );
  }, [files, changeResolver]);

  const handleSelectBtnClick = React.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const handleDrop = React.useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.persist();

    if (isDragDataWithFiles(event)) {
      const files = fileListSpread(event.dataTransfer.files);
      changeFiles(files);
    }
  }, []);

  const handleInputChange = React.useCallback(({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
    const files = fileListSpread(currentTarget.files);
    changeFiles(files);
    currentTarget.setAttribute('value', '');
  }, []);

  const renderer: FileRenderer<F> = React.useMemo(() => {
    if ('children' in props) {
      return props.children;
    } else {
      const FileComponent = props.FileComponent || FileView;
      return (props: FileProps<F>) => (
        <FileComponent {...props} />
      );
    }
  }, [props]);

  return (
    <UploadLayout
      onDrop={handleDrop}
      disabled={disabled}
    >
      <input
        value=""
        ref={inputRef}
        className={styles['input']}
        type="file"
        multiple={props.isMultiple}
        onChange={handleInputChange}
        accept={accept}
      />
      <UploadLabel
        hasFiles={Boolean(files.length)}
        isMultiple={props.isMultiple}
        disabled={disabled}
        onClick={handleSelectBtnClick}
      />
      {files.length > 0 && (
        <FileListLayout>
          {files.map(data => (
            <React.Fragment key={data.id}>
              {renderer({
                data,
                disabled,
                remove: remove.bind(null, data.id),
                edit: edit.bind(null, data.id),
              })}
            </React.Fragment>
          ))}
        </FileListLayout>
      )}
    </UploadLayout>
  );
}

