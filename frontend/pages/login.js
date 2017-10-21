// @flow

import React from 'react';
import Rx from 'rxjs/Rx';
import fetch from 'isomorphic-unfetch';
import urlencoder from 'form-urlencoded';

import { connect } from '../state/RxState';
import authActions from '../actions/authActions';
import errorActions from '../actions/errorActions';
import { API_REGISTER } from '../utils/constants';
import Header from '../components/Header';
import ErrorModal from '../components/ErrorModal';

type Props = {
  setLoginField$: (any) => Rx.Observable,
  login$: ({ email: string, password: string }) => Rx.Observable,
  auth: {
    email: string,
    password: string,
  },
  setError$: ({
    isShowModal: boolean,
    title: string,
    message: string,
  }) => Rx.Observable,
  error: {
    title: string,
    message: string,
    isShowModal: boolean,
  }
}

type State = {
  signup: {
    firstName: string,
    lastName: string,
    password: string,
    email: string,
  },
  isWrapperMove: boolean,
};

class Login extends React.Component<Props, State> {
  static defaultProps: {
    auth: {
      email: '',
      password: '',
    },
    error: {
      title: '',
      message: '',
      isShowModal: false,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      signup: {
        firstName: '',
        lastName: '',
        password: '',
        email: '',
      },
      isWrapperMove: false,
    };
    this.onSubmitSignup = this.onSubmitSignup.bind(this);
  }

  onSubmitSignup: Function;

  async onSubmitSignup() {
    const formValues = urlencoder({
      name: `${this.state.signup.firstName} ${this.state.signup.lastName}`,
      email: this.state.signup.email,
      password: this.state.signup.password,
    });

    const res = await fetch(API_REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: formValues,
    });
    if (res.ok) {
      alert('Successfully Registered！');
    }
  }

  render() {
    const { setLoginField$, login$, auth: { email, password }, error, setError$ } = this.props;
    return (
      <div>
        {
          error.isShowModal ?
            <ErrorModal
              title={error.title}
              message={error.message}
              onCancel={() => setError$({ isShowModal: false, title: '', message: '' })}
            />
            : null
        }
        <Header selectedItem="join" />
        <div className="login-panel">
          <div className="login-form">
            <div className="login-btn splits">
              <p className="splits-title">Have an account?</p>
              <button
                onClick={() => {
                  this.setState({ isWrapperMove: false });
                }}
              >
                SIGN IN
              </button>
            </div>
            <div className="rgstr-btn splits">
              <p className="splits-title">Dont have an account?</p>
              <button
                onClick={() => {
                  this.setState({ isWrapperMove: true });
                }}
              >
                JOIN NOW
              </button>
            </div>
            <div className={`wrapper ${this.state.isWrapperMove ? 'move' : ''}`}>
              <div className="login">
                <p className="title">SIGN IN</p>
                <div className="mail">
                  <input
                    type="mail"
                    placeholder="Mail or Username"
                    value={email}
                    onChange={(evt) => {
                      setLoginField$({ email: evt.target.value });
                    }}
                  />
                </div>
                <div className="passwd">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(evt) => {
                      setLoginField$({ password: evt.target.value });
                    }}
                  />
                </div>
                <div className="submit">
                  <button
                    className="dark"
                    onClick={() => {
                      login$({ email, password });
                    }}
                  >
                    SIGN IN
                  </button>
                </div>
              </div>
              <div className="register">
                <p className="title">Be a Chef today!</p>
                <input
                  type="text"
                  name=""
                  placeholder="First Name"
                  value={this.state.signup.firstName}
                  onChange={(evt) => {
                    this.setState({
                      signup: {
                        ...this.state.signup,
                        firstName: evt.target.value,
                      },
                    });
                  }}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={this.state.signup.lastName}
                  onChange={(evt) => {
                    this.setState({
                      signup: {
                        ...this.state.signup,
                        lastName: evt.target.value,
                      },
                    });
                  }}
                />
                <input
                  type="tel"
                  placeholder="Password"
                  value={this.state.signup.password}
                  onChange={(evt) => {
                    this.setState({
                      signup: {
                        ...this.state.signup,
                        password: evt.target.value,
                      },
                    });
                  }}
                />
                <input
                  type="mail"
                  placeholder="Email Address"
                  value={this.state.signup.email}
                  onChange={(evt) => {
                    this.setState({
                      signup: {
                        ...this.state.signup,
                        email: evt.target.value,
                      },
                    });
                  }}
                />
                <div className="wrapper__submit">
                  <button className="dark" onClick={this.onSubmitSignup}>JOIN NOW</button>
                </div>
                <div className="wrapper__note">
                  <span >If you click JOIN NOW, it means you agree with terms of service.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .login-panel {
              display: flex;
              justify-content: center;
              width: 100%;
              height: 786px;
              padding-top: 130px;
              padding-bottom: 176px;
              transition: all .5s;
              background-image: url("../static/main-background.jpg");
            }
            .login-form {
              display: flex;
              position: relative;
              margin: 0 auto;
              width: 794px;
              height: 480px;
              min-height: 400px;
              background-color: rgba(0, 0, 0, 0.67);
              border-radius: 4px;
              box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
            }
            .login-form > div {
              margin: auto;
              color: #fff;
            }
            .login-form button {
              width: 153px;
              height: 50px;
              border-radius: 4px;
              background: transparent;
              display: inline-block;
              padding: 10px 30px;
              border: solid 1px #ffffff;
              background-clip: padding-box;
              position: relative;
              color: #FFF;
              transition: all .25s;
              font-family: AvenirNext;
              font-size: 14px;
              font-weight: 500;
              line-height: 1.14;
              text-align: center;
              color: #ffffff;
            }

            .login-form button.dark {
              width: 356px;
              height: 50px;
              border-radius: 4px;
              background-color: #3e9f40;
            }

            .login-form .move button.dark {
              width: 356px;
              height: 50px;
              border-radius: 4px;
              background-color: #3e9f40;
            }

            .splits {
              display: flex;
              flex-direction: column;
              align-items: center;
            }

            .splits-title {
              font-family: SignPainter-HouseScript;
              font-size: 24px;
              line-height: 0.67;
              text-align: center;
              color: #ffffff;
            }
            .login-form button:active {
              box-shadow: none;
            }
            .login-form button:focus {
              outline: none;
            }
            .login-form > .wrapper {
              display: flex;
              justify-content: center;
              position: absolute;
              width: 388px;
              height: 519px
              border-radius: 4px;
              top: -15px;
              left: 16px;
              background: #ffffff;
              box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.23);
              transition: all .5s;
              color: #303030;
              overflow: hidden;
            }
            .login-form .wrapper > div {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;
              transition: all .5s;
              background: #fff;
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .login-form .wrapper .register {
              left: 100%;
            }
            .login-form .wrapper.move .register {
              left: 0%;
            }
            .login-form .wrapper.move .login {
              left: -100%;
            }
            .login-form .wrapper > div> div {
              position: relative;
              margin-bottom: 15px;
            }
            .login-form .wrapper .title {
              margin: 48px auto 30px auto;
              width: 129px;
              height: 24px;
              font-family: SignPainter-HouseScript;
              font-size: 24px;
              line-height: 1;
              text-align: center;
              color: #4a4a4a;
            }
            .login-form .wrapper input {
              width: 356px;
              height: 50px;
              border-radius: 4px;
              background-color: #ffffff;
              border: solid 1px #979797;
              margin: 12px auto 0 auto;
              padding-top: 18px;
              padding-bottom: 16px;
              padding-left: 16px;
            }
            .login-form .wrapper input:focus {
              outline: none;
              border-color: #ff4931;
            }
            .login-form > .wrapper.move {
              left: 45%;
            }
            .login-form > .wrapper.move input:focus {
              border-color: #e0b722;
            }
            .wrapper__submit {
              padding: 20px;
            }
            .wrapper .wrapper__note {
              font-size: 12px;
              font-weight: 500;
              line-height: 1;
              color: #4a4a4a;
            }
            @media screen and (max-width: 768px) {
              * {
                transition: all 0.5s;
              }
              .login-form {
                justify-content: center;
                background-color: rgba(0, 0, 0, 0);
              }
              .login-form > .wrapper {
                width: 90%;
                left: auto;
              }
              .splits {
                display: none;
              }
              .login-form button.dark,
              .login-form .move button.dark,
              .login-form .wrapper input {
                width: 330px;
              }
              .login-form > .wrapper.move {
                left: auto;
              }
            }
          `}
        </style>
      </div>
    );
  }
}


const stateSelector = ({ auth, error }) => ({ auth, error });

const actionSubjects = {
  ...errorActions,
  ...authActions,
};

export default connect(stateSelector, actionSubjects)(Login);
