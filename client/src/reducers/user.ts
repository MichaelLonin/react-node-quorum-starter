import { SET_USER } from '../constants/actionTypes';

export interface UserState {
  isFetched: boolean;
  userAddress: string;
  userName: string;
  userType: string;
  userEthAddress: string;
  userConstKey: string;
  userWhisperKey: string;
}

const initialState: UserState = {
  isFetched: false,
  userAddress: '',
  userName: '',
  userType: '',
  userEthAddress: '',
  userConstKey: '',
  userWhisperKey: '',
};

export const user = (state = initialState, action: any = {}): UserState => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
