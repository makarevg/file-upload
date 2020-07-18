// import { ComponentType } from 'react';
//
//
// type CommonFileItem = {
//   id: number
//   file?: File;
// };
//
// export type AsyncFileItem<F extends FileData> = CommonFileItem & ({
//   data: F,
//   status: FileUploadStatus.READY
// } | {
//   data: null,
//   status: FileUploadStatus.LOADING
// })
//
//
// export enum FileUploadStatus {
//   INIT = 'init',
//   LOADING = 'loading',
//   READY = 'ready',
// }
//
//
// export type AsyncUploadProps<F extends FileData> = {
//   FileComponent?: ComponentType<FileProps<F>>
//   saveFile: (file: File, oldFile: F | null) => MaybePromise<F | false>;
//   editFile?: (file: F) => void;
//   accept?: string;
//   disabled?: boolean;
//   isMultiple?: boolean;
//   deleteFile: (data: F | null) => void;
//   value?: F[]|F;
// };
