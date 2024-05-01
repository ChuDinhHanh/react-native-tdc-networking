import axios, {AxiosResponse} from 'axios';
import React from 'react';
import {Asset} from 'react-native-image-picker';
import {SERVER_ADDRESS} from '../constants/SystemConstant';
import {Data} from '../types/Data';

export const handleUploadImage = (
  imageRequest: Asset[],
  onResult: (data: string[]) => void,
) => {
  const formData = new FormData();
  imageRequest.forEach((item, index) => {
    const tempPhoto = {
      uri: item.uri,
      type: item.type,
      name: item.fileName,
    };
    formData.append('files', tempPhoto);
  });

  //   Upload to server
  axios
    .post<FormData, AxiosResponse<Data<string[]>>>(
      SERVER_ADDRESS + 'api/upload/images',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    .then(res => {
      onResult(res.data.data);
    })
    .catch(error => {
      console.log(error);
    });
};
