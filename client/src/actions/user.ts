import axios from 'axios';
import { SET_USER } from '../constants/actionTypes';
import { LoginState } from '../components/Login/Login';

const setUser = (payload: any): any => ({ payload, type: SET_USER });

export const registerUser = (data: LoginState): Function => {
  return (dispatch: Function): Promise<boolean> => {
    return axios.post('api/registerUser', data).then((res: any) => {
      if (res.data) {
        dispatch(setUser({ ...res.data, isFetched: true }));
        return true;
      }
      return false;
    });
  };
};
