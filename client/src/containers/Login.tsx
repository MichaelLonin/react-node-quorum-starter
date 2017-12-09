import { connect } from 'react-redux';
import Login from '../components/Login/Login';
import { registerUser } from '../actions/user';
import { RootState } from '../reducers/rootReducer';

const stateToProps = (state: RootState) => ({
  user: state.user
});

export default connect(stateToProps, { registerUser })(Login);
