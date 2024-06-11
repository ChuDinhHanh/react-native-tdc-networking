import axios from 'axios';
import {SERVER_ADDRESS} from '../constants/SystemConstant';
import {Data} from '../types/Data';
import {FileUploadRequest} from '../types/request/FileUploadRequest';

export function handleUploadDocumentFiles(
  filesRequest: FileUploadRequest[],
  onResult: (data: Data<string[]>) => void,
) {
  return handleUploadFile<string[]>(
    SERVER_ADDRESS + 'api/upload/files',
    filesRequest,
    onResult,
  );
}

function handleUploadFile<T>(
  url: string,
  filesRequest: FileUploadRequest[],
  onResult: (data: Data<T>) => void,
) {
  const formData = new FormData();

  filesRequest.forEach((item, index) => {
    formData.append('files', item);
  });

  axios
    .post<Data<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      console.log('TEST:', res.data);
      onResult(res.data);
    })
    .catch(error => {
      console.log(error);
    });
}
