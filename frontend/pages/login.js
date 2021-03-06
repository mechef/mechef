// @flow

import React from 'react';
import Rx from 'rxjs/Rx';
import fetch from 'isomorphic-unfetch';
import urlencoder from 'form-urlencoded';
import { translate } from 'react-i18next';

import i18n from '../i18n';
import { connect } from '../state/RxState';
import authActions from '../actions/authActions';
import errorActions from '../actions/errorActions';
import { API_REGISTER } from '../utils/constants';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Spinner from '../components/Spinner';
import { primaryColor, borderColor } from '../utils/styleVariables';

type Props = {
  setLoginField$: any => Rx.Observable,
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
  },
  global: {
    isShowSpinner: boolean,
  },
  t: (key: string) => string,
};

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
    const {
      setLoginField$,
      login$,
      auth: { email, password },
      error,
      setError$,
      global: { isShowSpinner },
    } = this.props;
    return (
      <div>
        {error.isShowModal ? (
          <Modal
            title={error.title}
            message={error.message}
            onCancel={() =>
              setError$({ isShowModal: false, title: '', message: '' })
            }
          />
        ) : null}
        {isShowSpinner ? <Spinner /> : null}
        <Header selectedItem="join" />
        <div className="login-panel">
          <div className="login-form">
            <div className="login-btn splits">
              <p className="splits-title">
                {this.props.t('dont_have_account')}
              </p>
              <Button
                buttonStyle="whiteBorderOnly"
                size="small"
                onClick={() => {
                  this.setState({ isWrapperMove: false });
                }}
              >
                SIGN IN
              </Button>
            </div>
            <div className="rgstr-btn splits">
              <p className="splits-title">
                {this.props.t('dont_have_account')}
              </p>
              <Button
                buttonStyle="whiteBorderOnly"
                size="small"
                onClick={() => {
                  this.setState({ isWrapperMove: true });
                }}
              >
                {this.props.t('button_joinnow')}
              </Button>
            </div>
            <div
              className={`wrapper ${this.state.isWrapperMove ? 'move' : ''}`}
            >
              <div className="login">
                <p className="title">{this.props.t('button_signin')}</p>
                <div className="mail">
                  <TextInput
                    type="email"
                    pattern="^.+@.+\..+$"
                    validationMessage={this.props.t('validationmessage_email')}
                    placeholder="Mail or Username"
                    size="medium"
                    value={email}
                    onChange={evt => {
                      if (evt && evt.currentTarget) {
                        setLoginField$({ email: evt.currentTarget.value });
                      }
                    }}
                    onKeyPress={evt => {
                      if (evt && evt.key === 'Enter') {
                        login$({ email, password });
                      }
                    }}
                    align="center"
                  />
                </div>
                <div className="passwd">
                  <TextInput
                    type="password"
                    placeholder="Password"
                    size="medium"
                    value={password}
                    onChange={evt => {
                      if (evt && evt.currentTarget) {
                        setLoginField$({ password: evt.currentTarget.value });
                      }
                    }}
                    onKeyPress={evt => {
                      if (evt && evt.key === 'Enter') {
                        login$({ email, password });
                      }
                    }}
                    align="center"
                  />
                </div>
                <Button
                  type="primary"
                  size="medium"
                  onClick={() => {
                    login$({ email, password });
                  }}
                >
                  {this.props.t('button_signin')}
                </Button>
              </div>
              <div className="register">
                <p className="title">{this.props.t('beacheftoday')}</p>
                <TextInput
                  type="text"
                  placeholder="First Name"
                  size="medium"
                  value={this.state.signup.firstName}
                  onChange={evt => {
                    if (evt && evt.currentTarget) {
                      this.setState({
                        signup: {
                          ...this.state.signup,
                          firstName: evt.currentTarget.value,
                        },
                      });
                    }
                  }}
                  align="center"
                />
                <TextInput
                  type="text"
                  placeholder="Last Name"
                  size="medium"
                  value={this.state.signup.lastName}
                  onChange={evt => {
                    if (evt && evt.currentTarget) {
                      this.setState({
                        signup: {
                          ...this.state.signup,
                          lastName: evt.currentTarget.value,
                        },
                      });
                    }
                  }}
                  align="center"
                />
                <TextInput
                  type="tel"
                  placeholder="Telephone Number"
                  size="medium"
                  value={this.state.signup.password}
                  onChange={evt => {
                    if (evt && evt.currentTarget) {
                      this.setState({
                        signup: {
                          ...this.state.signup,
                          password: evt.currentTarget.value,
                        },
                      });
                    }
                  }}
                  align="center"
                />
                <TextInput
                  type="email"
                  pattern="^.+@.+\..+$"
                  validationMessage={this.props.t('validationmessage_email')}
                  placeholder="Email Address"
                  size="medium"
                  value={this.state.signup.email}
                  onChange={evt => {
                    if (evt && evt.currentTarget) {
                      this.setState({
                        signup: {
                          ...this.state.signup,
                          email: evt.currentTarget.value,
                        },
                      });
                    }
                  }}
                  align="center"
                />
                <div className="wrapper__submit">
                  <Button
                    type="primary"
                    size="medium"
                    onClick={this.onSubmitSignup}
                  >
                    {this.props.t('button_joinnow')}
                  </Button>
                </div>
                <div className="wrapper__note">
                  <span>{this.props.t('user_agreement')}</span>
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
              transition: all .5s;
              background-image: url("../static/img/background.png");
            }
            .login-form {
              display: flex;
              position: relative;
              margin: 0 auto;
              width: 794px;
              height: 420px;
              min-height: 400px;
              background-color: rgba(0, 0, 0, 0.67);
              border-radius: 4px;
              box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
            }
            .login-form > div {
              margin: auto;
              color: #fff;
            }

            .splits {
              display: flex;
              flex-direction: column;
              align-items: center;
            }

            .splits-title {
              font-size: 2.4rem;
              line-height: 0.67;
              text-align: center;
              color: #ffffff;
              font-family: 'Playball', cursive;
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
              position: relative;
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
              font-size: 2.4rem;
              line-height: 1;
              text-align: center;
              color: #4a4a4a;
              font-family: 'Playball', cursive;
            }
            .login-form .wrapper input {
              width: 356px;
              height: 50px;
              border-radius: 4px;
              background-color: #ffffff;
              border: solid 1px ${borderColor};
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
            .register {
              width: 100%;
            }

            .mail {
              width: 100%;
            }

            .passwd {
              width: 100%;
            }
            .wrapper__submit {
              padding: 20px;
            }
            .wrapper .wrapper__note {
              font-size: 1.2rem;
              line-height: 1;
              color: ${primaryColor};
            }

            .register > div {
              margin-bottom: 15px;
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
              .mail {
                width: 90%;
              }
              .passwd {
                width: 90%;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

const stateSelector = ({ auth, error, global }) => ({ auth, error, global });

const actionSubjects = {
  ...errorActions,
  ...authActions,
};

const Extended = translate(['common'], {
  i18n,
  wait: typeof window !== 'undefined',
})(Login);

// Passing down initial translations
// use req.i18n instance on serverside to avoid overlapping requests set the language wrong
Extended.getInitialProps = async ({ req }) => {
  if (req && !(typeof window !== 'undefined'))
    return i18n.getInitialProps(req, ['common']);
  return {};
};

export default connect(
  stateSelector,
  actionSubjects,
)(Extended);
