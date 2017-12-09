import * as React from 'react';
import { Button, Form, Header, Message, Segment } from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import { UserState } from '../../reducers/user';
import './Login.css';

export type LoginState = {
  userName: string,
  userType: string,
};

type LoginProps = {
  user: UserState,
  registerUser: (obj: LoginState) => any,
};

class Login extends React.Component<LoginProps, LoginState> {

  state: LoginState = {
    userName: '',
    userType: ''
  };

  registerUser = (): void => {
    this.props.registerUser(this.state)
      .then(() => this.setState({ userName: '', userType: '' }));
  };

  onChange = (e: any): void => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { userName, userType } = this.state;
    const { user } = this.props;
    return (
      <div className="Login">
        <div style={{ width: '450px', marginTop: '-10%' }}>
          <Header as="h2" color="teal" textAlign="center">React SPA Starter</Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="User Name"
                name="userName"
                value={userName}
                onChange={this.onChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="User Type => 0, 1, 2"
                type="number"
                name="userType"
                value={userType}
                onChange={this.onChange}
              />

              <Button onClick={this.registerUser} color="teal" fluid size="large">Register User</Button>
            </Segment>
          </Form>
          {!isEmpty(user) &&
            <Message>
              {JSON.stringify(user, undefined, 2)}
            </Message>
          }
        </div>
      </div>
    );
  }
}

export default Login;
