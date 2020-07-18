declare module '*.scss' {
  const styles: any;
  export default styles;
}

declare module '*.svg' {
  const content: any;
  export default content;
}


declare interface FileData {
  id: string;
  name: string;
  src: string;
  file?: File;
}

declare interface ImageFileData extends FileData {
  srcSet?: string | null;
}

