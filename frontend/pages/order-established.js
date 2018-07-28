import * as React from 'react';
import BuyerHeader from '../components/BuyerHeader';
import BuyerFooter from '../components/BuyerFooter';

const OrderEstablishedPage = () => (
  <div className="wrapper">
    <BuyerHeader />
    <section className="content">
      <h1>Order Established!</h1>
      <hr className="divider" />
      <img
        className="order-established-img"
        src="../static/svg/order_established.svg"
        alt="order established"
      />
      <h3>Congratulations</h3>
      <p className="description">
        <span>Thank you for your order</span>
        <br />
        <span>We hope you have a good meal with us</span>
      </p>
    </section>
    <BuyerFooter />
    <style jsx>
      {`
        .wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          justify-content: space-between;
        }
        h1 {
          font-family: 'Playball', cursive;
        }
        .content {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
          padding-top: 90px;
        }

        .divider {
          width: 70%;
          background-color: #9b9b9b;
          margin-bottom: 85px;
        }
        .order-established-img {
          margin-bottom: 65px;
        }
        .description {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 50px;
        }
      `}
    </style>
  </div>
);

export default OrderEstablishedPage;
