import Header from '../components/Header';

const WalkthroughMenuDetail = () => (
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
        <p className="title">Menu Details</p>
        <p id="addImage" className="subtitle">
          Add Images*
        </p>
        <p className="description">Description text?</p>
        <div className="addPhotoContainer">
          <div className="addPhoto" />
          <div className="addPhoto" />
          <div className="addPhoto" />
        </div>
        <p id="dishName" className="subtitle">
          Dish Name*
        </p>
        <input type="text" className="fullInput" />
        <div className="inputbox">
          <label htmlFor="unitPrice" className="subtitle">
            Unit Price*
          </label>
          <input id="unitPrice" type="text" className="halfInput" />
        </div>
        <div className="inputbox rightHalfInput">
          <label htmlFor="quantity" className="subtitle">
            Quantity*
          </label>
          <input id="quantity" type="text" className="halfInput" />
        </div>
        <div className="menu-button-group">
          <div className="menu-button">ADD LATER</div>
          <div className="menu-button">SAVE & CONTINUED</div>
        </div>
      </div>
    </div>
    <style jsx>
      {`
        .mainContent {
          transition: all 0.5s;
          background-image: url('../static/img/background.png');
          height: 786px;
          width: 100%;
          padding-top: 83px;
        }
        .mechef-container {
          margin: 0 auto;
          width: 552px;
          height: 1469px;
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
          font-size: 2.4rem;
          line-height: 1;
          text-align: center;
          color: #4a4a4a;
          margin: 40px auto 0 auto;
        }
        .subtitle {
          width: 138px;
          height: 16px;
          font-size: 1.6rem;
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0.7px;
          color: #4a4a4a;
          text-align: left;
        }
        #addImage {
          margin: 43px 397px 0 17px;
        }
        #dishName {
          margin: 41px 0 17px 17px;
        }
        #unitPrice {
          margin-top: 16px;
          text-align: left;
        }
        #quantity {
          margin-top: 16px;
          text-align: left;
        }
        .description {
          width: 341px;
          height: 14px;
          font-size: 1.4rem;
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0.6px;
          color: #9b9b9b;
          text-align: left;
          margin: 12px 193px 0 18px;
        }
        .addPhoto {
          width: 161px;
          height: 161px;
          opacity: 0.6;
          border-radius: 4px;
          border: solid 2px #3e9f40;
          border-style: dotted;
          display: inline-block;
        }
        .addPhoto:nth-child(2) {
          margin-left: 12px;
          margin-right: 12px;
        }
        .addPhotoContainer {
          margin: 16px 0 0 17px;
          text-align: left;
        }
        .fullInput {
          width: 520px;
          height: 50px;
          border-radius: 4px;
          background-color: #ffffff;
          border: solid 1px #979797;
        }
        .halfInput {
          width: 100%;
          height: 50px;
          border-radius: 4px;
          border: solid 1px #979797;
        }
        .rightHalfInput {
          margin-left: 12px;
        }
        .inputbox {
          display: inline-block;
          height: 85px;
          width: 254px;
          text-align: left;
          margin-top: 40px;
        }
        .inputbox label {
          margin-bottom: 0px;
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

export default WalkthroughMenuDetail;
