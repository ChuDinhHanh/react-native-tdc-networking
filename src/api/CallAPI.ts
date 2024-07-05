import axios, {AxiosResponse} from 'axios';
import {SERVER_ADDRESS} from '../constants/SystemConstant';
import {Business} from '../types/Business';
import {Data} from '../types/Data';
import {Faculty} from '../types/Faculty';
import {Student} from '../types/Student';

const getUserInfoByToken = async (token: string) => {
  try {
    const response = await axios.get<
      void,
      AxiosResponse<Data<Student | Faculty | Business>>
    >(SERVER_ADDRESS + `api/users/token/${token}`);
    if (response.status === 200 || response.status === 201) {
      return response.data.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export {getUserInfoByToken};
