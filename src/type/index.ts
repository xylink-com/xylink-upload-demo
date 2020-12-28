export interface IFileData {
  progress: number;
  id: number;
  name: string;
  status: number | string;
}
export interface IClient {
  id: number;
  file: File;
  client: any;
}
export interface IResource {
  preresourceId: string;
  resourceId: string;
  url: string;
}
export interface IError {
  errorMessage: string;
  errorCode: number;
}
