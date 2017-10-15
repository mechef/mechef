const Home = () => (
  <div className="homeContainer">
    <div className="dashboard-content__header" />
    <p className="sellerId">@MomooKitchen</p>
      <p className="sellerName">@MomooKitchen</p>
      <div className="orderTable">
        <p className="orderTableTitle">
          <span className="titleText">ORDERS</span>
          <span className="orderCount">
            <span className="orderCountNum">
              14
            </span>
          </span>
        </p>
        <div className="header">
          <div className="firstCell">Delivery Time</div>
          <div className="secondCell">Buyer's Name</div>
          <div className="thirdCell">Order Name</div>
          <div className="fourthCell">Quantity</div>
        </div>
      </div>
    <style jsx>
      {`
        .homeContainer {
          background-color: #f8f7f7;
        }
        .dashboard-content__header {
          margin-bottom: 25px;
          width: 100%;
          height: 240px;
          background-image: url('../static/pancake.jpg');
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .dashboard-content__header:after {
          content: '';
          position: absolute;
          top: 200px;
          left: 20px;
          background-image: url('../static/avatar.jpg');
          background-size: cover;
          background-position: center;
          width: 80px;
          height: 80px;
          border-radius: 40px;
        }
        .sellerId {
          margin-left: 98px;
          margin-bottom: 11px;
          font-size: 24px;
          font-weight: 600;
          line-height: 0.83;
          letter-spacing: 0.6px;
          color: #4a4a4a;
        }
        .sellerName {
          margin-left: 101px;
          margin-bottom: 20px;
          font-size: 14px;
          line-height: 1.43;
          letter-spacing: 0.6px;
          color: #4a4a4a;
        }
        .orderTable {
          margin-left: 18px;
        }
        .orderTableTitle {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }
        .titleText {
          width: 61px;
          height: 20px;
          font-family: OpenSans;
          font-size: 18px;
          line-height: 1.11;
          letter-spacing: 0.5px;
          color: #4a4a4a;
        }
        .orderCount {
          width: 40px;
          height: 26px;
          border-radius: 26px;
          background-color: #3e9f40;
          display: flex;
        }
        .orderCountNum {
          font-family: OpenSans;
          font-size: 16px;
          line-height: 1;
          letter-spacing: 0.4px;
          color: #ffffff;
          margin: auto;
        }
        .header {
          display: flex;
          padding-top: 20px;
          padding-bottom: 18px;
          padding-left: 19.3px;
          background-color: #ffffff;
        }
        .firstCell {
          width: 83px;
          font-size: 12px;
          font-weight: 500;
          line-height: 1;
          color: #4a4a4a;
        }
        .secondCell {
          margin-left: 28px;
          width: 83px;
          font-size: 12px;
          font-weight: 500;
          line-height: 1;
          color: #4a4a4a;
        }
        .thirdCell {
          margin-left: 94px;
          width: 83px;
          font-size: 12px;
          font-weight: 500;
          line-height: 1;
          color: #4a4a4a;
        }
        .fourthCell {
          margin-left: 227px;
          width: 83px;
          font-size: 12px;
          font-weight: 500;
          line-height: 1;
          color: #4a4a4a;
        }
      `}
    </style>
  </div>
);

export default Home;
