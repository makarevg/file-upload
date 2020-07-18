export type FileProps<F extends FileData> = {
  disabled: boolean
  edit?: (data: F) => void;
  remove: () => void;
  data: F;
}
