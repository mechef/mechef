import Header from '../components/header/header';

const WalkthroughMenu = () => (
  <div>
    <Header />
    <div className="mainContent">
      <div className="mechef-container">
        <div className="procedure">
          <div className="oval" />
          <div className="line" />
          <div className="oval" />
          <div className="line" />
          <div className="oval" />
        </div>
        <p className="title">Create your menu!</p>
        <div className="addPhoto" />
        <div className="menu-button-group">
          <div className="menu-button">ADD LATER</div>
          <div className="menu-button">SAVE & CONTINUED</div>
        </div>
      </div>
    </div>
    <style jsx>
      {`
        .mainContent {
          transition: all .5s;
          background-image: url("../static/main-background.jpg");
          height: 786px;
          width: 100%;
          padding-top: 83px;
        }
        .mechef-container {
          margin: 0 auto;
          width: 552px;
          height: 467.1px;
          border-radius: 4px;
          background-color: #ffffff;
          box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.23);
          padding-top: 32px;
          text-align: center;
        }
        .procedure {
          display: inline-block;
          height: 48px;
        }
        .procedure .oval {
          display: inline-block;
          width: 48px;
          height: 48px;
          border: solid 1px #3e9f40;
          border-radius: 48px;
        }
        .procedure .line {
          width: 28px;
          height: 24px;
          border-top: solid 1px #3e9f40;
          display: inline-block;
          margin-left: 10px;
          margin-right: 10px;
        }
        .title {
          width: 161px;
          height: 24px;
          font-family: SignPainter-HouseScript;
          font-size: 24px;
          line-height: 1;
          text-align: center;
          color: #4a4a4a;
          margin: 40px auto 0 auto;
        }
        .addPhoto {
          margin: 40px auto 0 auto;
          width: 161px;
          height: 161px;
          opacity: 0.6;
          border-radius: 4px;
          border: solid 2px #3e9f40;
          border-style: dotted;
        }
        .menu-button-group {
          margin: 59.7px auto 0 auto;
        }
        .menu-button {
          display: inline-block;
          width: 253px;
          height: 48.7px;
          border-radius: 4px;
          background-color: #3e9f40;
          color: #ffffff;
          font-family: AvenirNext;
          text-align: center;
          line-height: 48.7px;
        }
        .menu-button:nth-child(2n) {
          margin-left: 12px;
        }
      `}
    </style>
  </div>
);

export default WalkthroughMenu;
