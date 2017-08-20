import React from 'react';
import Header from '../components/header/header';

class Login extends React.Component {
  componentDidMount() {
    // 3rd party script for handling login animation
    /* eslint-disable */
    $('.veen .rgstr-btn button').click(() => {
      $('.veen .wrapper').addClass('move');
      $('.body').css('background', '#008080');
    });
    $('.veen .login-btn button').click(() => {
      $('.veen .wrapper').removeClass('move');
      $('.body').css('background', '#008080');
    });
    /* eslint-enable */
  }

  render() {
    return (
      <div className="body">
        <Header />
        <div className="veen">
          <div className="login-btn splits">
            <p>Already an user?</p>
            <button>Login</button>
          </div>
          <div className="rgstr-btn splits">
            <p>Don&apos;t have an account?</p>
            <button>Register</button>
          </div>
          <div className="wrapper">
            <div id="login">
              <h3>Login</h3>
              <div className="mail">
                <input type="mail" name="mail" />
                <label>Mail or Username</label>
              </div>
              <div className="passwd">
                <input type="password" name="" />
                <label>Password</label>
              </div>
              <div className="submit">
                <button className="dark">Login</button>
              </div>
            </div>
            <div id="register">
              <h3>Register</h3>
              <div className="name">
                <input type="text" name="" />
                <label>Full Name</label>
              </div>
              <div className="mail">
                <input type="mail" name="" />
                <label>Mail</label>
              </div>
              <div className="uid">
                <input type="text" name="" />
                <label>User Name</label>
              </div>
              <div className="passwd">
                <input type="password" name="" />
                <label>Password</label>
              </div>
              <div className="mail" />
              <div className="passwd">
                <input type="text" name="" placeholder="dd/mm/yyyy" />
                <label>Date of birth</label>
              </div>
              <div className="mail">
                <div className="submit">
                  <button className="dark">Register</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .body{
              background:#008080;
              transition: all .5s;
              padding:1px;
            }
            .veen{
              width: 70%;
              margin: 100px auto;
              background: rgba(255,255,255,.5);
              min-height: 400px;
              display:table;
              position: relative;
              box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
            }
            .veen > div {
              display: table-cell;
              vertical-align: middle;
              text-align: center;
              color: #fff;
            }
            .veen button{
              background: transparent;
              /* background-image: linear-gradient(#008B8B,#008080 ,#008080); */
              display: inline-block;
              padding: 10px 30px;
              border: 3px solid #fff;
              border-radius: 50px;
              background-clip: padding-box;
              position: relative;
              color: #FFF;
              /* box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28); */
              transition: all .25s;
            }

            .veen button.dark{
              border-color: #008080;
              background: #008080;
            }

            .veen .move button.dark{
              border-color: #008080;
              background: #008080;
            }
            .veen .splits p{
              font-size: 18px;
            }
            .veen button:active{
              box-shadow: none;
            }
            .veen button:focus{
              outline: none;
            }
            .veen > .wrapper {
              position: absolute;
              width: 40%;
              height: 120%;
              top: -10%;
              left: 5%;
              background: #fff;
              box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
              transition: all .5s;
              color: #303030;
              overflow: hidden;
            }
            .veen .wrapper > div{
              padding: 15px 30px 30px;
              width: 100%;
              transition: all .5s;
              background: #fff;
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .veen .wrapper #login{
              padding-top: 20%;
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
            .veen .wrapper label{
              position: absolute;
              top: -7px;
              font-size: 12px;
              white-space: nowrap;
              background: #fff;
              text-align: left;
              left: 15px;
              padding: 0 5px;
              color: #999;
              pointer-events: none;
            }
            .veen .wrapper h3{
              margin-bottom: 25px;
            }
            .veen .wrapper input{
              height: 40px;
              padding: 5px 15px;
              width: 100%;
              border: solid 1px #999;
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
          `}
        </style>
      </div>
    );
  }
}

export default Login;
