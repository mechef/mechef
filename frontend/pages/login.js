import React from 'react';
import fetch from 'isomorphic-unfetch';
import urlencoder from 'form-urlencoded';

import Header from '../components/header/header';
import { API_REGISTER, API_LOGIN } from '../utils/constants';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: {
        firstName: '',
        lastName: '',
        password: '',
        email: '',
      },
      login: {
        id: '',
        password: '',
      },
    };
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.onSubmitSignup = this.onSubmitSignup.bind(this);
  }
  componentDidMount() {
    // 3rd party script for handling login animation
    /* eslint-disable */
    $('.veen .rgstr-btn button').click(() => {
      $('.veen .wrapper').addClass('move');
    });
    $('.veen .login-btn button').click(() => {
      $('.veen .wrapper').removeClass('move');
    });
    /* eslint-enable */
  }

  async onSubmitLogin() {
    const formValues = urlencoder({
      email: this.state.login.id,
      password: this.state.login.password,
    });
    const res = await fetch(API_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: formValues,
    });
    const data = await res.json();
    if (res.ok) {
      window.localStorage.setItem('jwt', data.token);
      alert('Successfully Login!');
    } else {
      alert('Something wrong...');
    }
  }

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
    } else {
      alert('Something wrong...');
    }
  }

  render() {
    return (
      <div>
        <Header selectedItem="join" />
        <div className="login-panel">
          <div className="veen">
            <div className="login-btn splits">
              <p>Have an account?</p>
              <button>SIGN IN</button>
            </div>
            <div className="rgstr-btn splits">
              <p>Dont have an account?</p>
              <button>JOIN NOW</button>
            </div>
            <div className="wrapper">
              <div id="login">
                <p className="title">SIGN IN</p>
                <div className="mail">
                  <input
                    type="mail"
                    placeholder="Mail or Username"
                    value={this.state.login.id}
                    onChange={(evt) => {
                      this.setState({
                        login: {
                          ...this.state.login,
                          id: evt.target.value,
                        },
                      });
                    }}
                  />
                </div>
                <div className="passwd">
                  <input
                    type="password"
                    placeholder="Password"
                    value={this.state.login.password}
                    onChange={(evt) => {
                      this.setState({
                        login: {
                          ...this.state.login,
                          password: evt.target.value,
                        },
                      });
                    }}
                  />
                </div>
                <div className="submit">
                  <button className="dark" onClick={this.onSubmitLogin}>SIGN IN</button>
                </div>
              </div>
              <div id="register">
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
            .login-panel{
              transition: all .5s;
              background-image: url("../static/main-background.jpg");
              height: 786px;
              width: 100%;
              padding-top: 130px;
              padding-bottom: 176px;
            }
            .veen{
              width: 794px;
              height: 480px;
              background-color: rgba(0, 0, 0, 0.67);
              border-radius: 4px;
              min-height: 400px;
              display:table;
              position: relative;
              box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
              margin: 0 auto;
            }
            .veen > div {
              display: table-cell;
              vertical-align: middle;
              text-align: center;
              color: #fff;
            }
            .veen button{
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

            .veen button.dark{
              width: 356px;
              height: 50px;
              border-radius: 4px;
              background-color: #3e9f40;
            }

            .veen .move button.dark{
              width: 356px;
              height: 50px;
              border-radius: 4px;
              background-color: #3e9f40;
            }
            .veen .splits p{
              width: 217px;
              height: 16px;
              font-family: SignPainter-HouseScript;
              font-size: 24px;
              line-height: 0.67;
              text-align: center;
              color: #ffffff;
              margin-left: 81px;
              margin-bottom: 46px;
            }
            .veen button:active{
              box-shadow: none;
            }
            .veen button:focus{
              outline: none;
            }
            .veen > .wrapper {
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
            .veen .wrapper > div{
              width: 100%;
              transition: all .5s;
              background: #fff;
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .veen .wrapper #register{
              left: 100%;
            }
            .veen .wrapper.move #register{
              left: 0%;
            }
            .veen .wrapper.move #login{
              left: -100%;
            }
            .veen .wrapper > div> div {
              position: relative;
              margin-bottom: 15px;
            }
            .veen .wrapper .title{
              margin: 48px auto 30px auto;
              width: 129px;
              height: 24px;
              font-family: SignPainter-HouseScript;
              font-size: 24px;
              line-height: 1;
              text-align: center;
              color: #4a4a4a;
            }
            .veen .wrapper input{
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
            .veen .wrapper input:focus{
              outline: none;
              border-color: #ff4931;
            }
            .veen > .wrapper.move{
              left: 45%;
            }
            .veen > .wrapper.move input:focus{
              border-color: #e0b722;
            }
            .wrapper__submit {
              margin-top: 75px;
            }
            .wrapper .wrapper__note {
              width: 321px;
              height: 12px;
              font-family: AvenirNext;
              font-size: 12px;
              font-weight: 500;
              line-height: 1;
              color: #4a4a4a;
              margin: 20px 0 0 16px;
              text-align: left;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Login;
