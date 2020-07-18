// import * as React from 'react';
// import * as classNames from 'classnames';
// import { Button } from 'shared/elements/button';
// import { stopPropagation } from 'shared/helpers/utils';
// import { FileView } from '../FileView';
// import { fileListSpread, isDragDataWithFiles, uniqueId } from '../utils';
// import styles from '../styles.scss';
// import { FileProps } from '../types';
// import {
//   AsyncFileItem,
//   AsyncUploadProps,
//   FileUploadStatus
// } from './types';
//
//
//
// export function AsyncFileUpload<F extends FileData>({
//   deleteFile,
//   saveFile,
//   editFile = () => undefined,
//   accept = '',
//   isMultiple = false,
//   disabled = false,
//   value = [],
// // @ts-ignore-next-line
//   FileComponent = FileView,
// }: AsyncUploadProps<F>) {
//   const inputRef = React.useRef<HTMLInputElement>(null);
//
//   const [files, setFiles] = React.useState<AsyncFileItem<F>[]>(() => {
//     const arrayedValue = Array.isArray(value) ? value : [value];
//     return arrayedValue.map((data: F): AsyncFileItem<F> => ({
//       data,
//       id: uniqueId(),
//       status: FileUploadStatus.READY,
//     }));
//   });
//
//   const saveFileItem = React.useCallback(
//     async (
//       fileItem: AsyncFileItem<F>,
//       oldFile: F | null = null,
//     ): Promise<AsyncFileItem<F> | false> => {
//       if (!fileItem.file) {
//         return false;
//       }
//
//       try {
//         const data = await saveFile(fileItem.file, oldFile);
//
//         if (!data) {
//           return false;
//         }
//
//         return {
//           ...fileItem,
//           data,
//           status: FileUploadStatus.READY,
//         };
//       } catch (e) {
//         // eslint-disable-next-line no-alert
//         alert('Произошла ошибка при сохранении файла');
//         return false;
//       }
//     }, [saveFile]);
//
//   const saveFileList = React.useCallback(async (newFiles: AsyncFileItem<F>[]) => {
//     if (isMultiple) {
//       await Promise.all(newFiles.map((item) =>
//         saveFileItem(item)
//           .then((file) => {
//             if (file) {
//               setFiles((files) => files.map((f) => (f.id === file.id ? file : f)));
//             } else {
//               setFiles((files) => files.filter((f) => f.id !== item.id));
//             }
//           }),
//       ));
//     } else {
//       const meta = files.length ? files[0].data : null;
//       const file = await saveFileItem(newFiles[0], meta);
//
//       if (file) {
//         setFiles([file]);
//       }
//     }
//   }, [files, isMultiple, saveFileItem, setFiles]);
//
//   const deleteFileItem = React.useCallback(async (id: number) => {
//     setFiles((files) => files.filter((fileItem) => fileItem.id !== id));
//
//     const file = files.find((fileItem) => fileItem.id === id);
//     if (!file || !deleteFile) {
//       return;
//     }
//
//     try {
//       await deleteFile(file.data);
//     } catch (e) {
//       // eslint-disable-next-line no-alert
//       alert('Произошла ошибка при удалении файла');
//     }
//   }, [files, setFiles, deleteFile]);
//
//   const editMeta = React.useCallback((id: number, data: F) =>
//     setFiles((files) => files.map((file) => {
//       if (file.id === id) {
//         editFile(data);
//         return {
//           ...file,
//           status: FileUploadStatus.READY,
//           data: {
//             ...file.data,
//             ...data,
//           },
//         };
//       }
//       return file;
//     })), [setFiles, editFile]);
//
//   const changeFiles = React.useCallback((files: File[]) => {
//     const newFiles: FileItem<F>[] = files.map((file) => ({
//       file,
//       id: -uniqueId(),
//       data: null,
//       status: FileUploadStatus.LOADING,
//     }));
//
//     if (!newFiles.length) {
//       return;
//     }
//
//     setFiles((files) => ([...files, ...newFiles]));
//     saveFileList(newFiles);
//   }, [saveFileList, setFiles]);
//
//   const handleSelectBtnClick = React.useCallback(() => {
//     if (inputRef.current) {
//       inputRef.current.click();
//     }
//   }, []);
//
//   const handleDrop = React.useCallback((event: React.DragEvent) => {
//     event.preventDefault();
//     event.stopPropagation();
//     event.persist();
//
//     if (isDragDataWithFiles(event)) {
//       const files = fileListSpread(event.dataTransfer.files);
//       changeFiles(files);
//     }
//   }, [changeFiles]);
//
//   const handleInputChange = React.useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
//     const files = fileListSpread(target.files);
//
//     target.setAttribute('value', '');
//
//     changeFiles(files);
//   }, [changeFiles]);
//
//   const labelNode = React.useMemo(() => {
//     if (!files.length && disabled) {
//       return 'Файлов не найдено';
//     }
//
//     if (disabled) {
//       return false;
//     }
//
//     const text = isMultiple ? 'файлы' : 'файл';
//
//     return (
//       <>
//         {/* eslint-disable-next-line */}
//         <Button
//           type="button"
//           variant="outline"
//           colors="primary"
//           onClick={handleSelectBtnClick}
//         >
//           Выберите&nbsp;
//           {text}
//         </Button>
//         <span>
//           {`или перетащите ${text} в эту область`}
//         </span>
//       </>
//     );
//   }, [isMultiple, disabled, files, handleSelectBtnClick]);
//
//   return (
//     <div
//       className={classNames(styles['container'], {
//         [styles['container--disabled']]: disabled,
//       })}
//       onDrop={handleDrop}
//       onDragOver={stopPropagation}
//       onDragLeave={stopPropagation}
//     >
//       <input
//         ref={inputRef}
//         className={styles['input']}
//         type="file"
//         multiple={isMultiple}
//         onChange={handleInputChange}
//         accept={accept}
//       />
//       <div className={styles['label']}>
//         {labelNode}
//       </div>
//       {files.length > 0 && (
//         <div className={styles['list']}>
//           <div className={styles['files']}>
//             {files.map((item) => (
//               <FileComponent
//                 key={item.id}
//                 data={item.data}
//                 isLoading={item.status === FileUploadStatus.LOADING}
//                 editData={editMeta.bind(null, item.id)}
//                 deleteFile={deleteFileItem.bind(null, item.id)}
//                 disabled={disabled}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
