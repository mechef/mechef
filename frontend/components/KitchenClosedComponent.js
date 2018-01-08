// @flow
import React from 'react';

const KitchenClosedComponent = () => (
  <div className="kitchen-closed-box">
    <div className="kitchen-closed-box__image" />
    <div className="kitchen-closed-box__text">Kitchen is closed!</div>
    <div className="kitchen-closed-box__link">CONTACT CHEF</div>
    <style jsx>
      {`
        .kitchen-closed-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 430px;
          border-radius: 4px;
          background-color: #ffffff;
          box-shadow: 0 5px 7px 0 rgba(201, 201, 201, 0.5);
          margin: 0 auto;
        }
        .kitchen-closed-box__image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-top: 40px;
          background-color: #4a4a4a;
        }
        .kitchen-closed-box__image:after {
          content: '';
          width: 60px;
          height: 60px;
          position: absolute;
          background-image: url('/static/svg/default-icon.svg');
          background-position: center;
          background-repeat: no-repeat;
        }
        .kitchen-closed-box__text {
          padding-top: 30px;
          font-family: Playball;
          font-size: 24px;
          line-height: 1;
          text-align: center;
          color: #4a4a4a;
        }
        .kitchen-closed-box__link {
          padding-top: 38px;
          padding-bottom: 58px;
          font-family: Ubuntu;
          font-size: 16px;
          line-height: 1.25;
          letter-spacing: 0.4px;
          color: #3f9f40;
          cursor: pointer;
        }
      `}
    </style>
  </div>
);

export default KitchenClosedComponent;
