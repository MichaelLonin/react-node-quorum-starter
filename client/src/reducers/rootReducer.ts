import { combineReducers } from 'redux';
import { user, UserState } from './user';

export interface RootState {
  user: UserState;
}

const rootReducer = combineReducers<RootState>({ user });

export default rootReducer;
