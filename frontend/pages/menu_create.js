import React from 'react';
import Header from '../components/header/header';

class MenuCreate extends React.Component {
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

  render() {
    return (
      <div>
        <Header />
        <div className="mainContent">
          <div className="veen">
            <div className="login-btn splits">
              <p>Already an user?</p>
              <button>LOGIN</button>
            </div>
            <div className="rgstr-btn splits">
              <p>Dont have an account?</p>
              <button>JOIN NOW</button>
            </div>
            <div className="wrapper">
              <div id="login">
                <p className="title">Login</p>
                <div className="mail">
                  <input type="mail" name="mail" placeholder="Mail or Username" />
                </div>
                <div className="passwd">
                  <input type="password" name="" placeholder="Password" />
                </div>
                <div className="submit">
                  <button className="dark">Login</button>
                </div>
              </div>
              <div id="register">
                <p className="title">Be a Chef today</p>
                <div className="name">
                  <input type="text" name="" placeholder="Full Name" />
                </div>
                <div className="mail">
                  <input type="mail" name="" placeholder="Mail" />
                </div>
                <div className="uid">
                  <input type="text" name="" placeholder="User Name" />
                </div>
                <div className="mail">
                  <div className="submit">
                    <button className="dark">Register</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .mainContent{
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
              background-color: #8cc63f;
            }

            .veen .move button.dark{
              width: 356px;
              height: 50px;
              border-radius: 4px;
              background-color: #8cc63f;
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
          `}
        </style>
      </div>
    );
  }
}

export default MenuCreate;
