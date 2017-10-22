import React from 'react';
import PropTypes from 'prop-types';

import { connect } from '../state/RxState';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import ErrorModal from './ErrorModal';

class OrderPage extends React.Component {
  componentDidMount() {
    // this.props.fetchDelivery$();
  }
  render() {
    const { setError$, error, global: { backArrow }, toggleBackArrow$ } = this.props;
    return (
      <div className="dashboard-content">
        <p className="dashboard-content__title">
          <span className="dashboard-content__title-text">Order</span>
          <span className="dashboard-content__order-count">
            <span className="dashboard-content__order-count-num">
              14
            </span>
          </span>
        </p>
        <div className="order">
          <div className="order__image"></div>
          <div className="order__detail">
            <p className="order__detail-first-line">
              <span className="order__user-name">@alvinarmstrong</span>
              <i className="fa fa-envelope order__mail-icon" aria-hidden="true"></i>
            </p>
            <p className="order__detail-second-line">
              <span className="order__content">Jasmine Honey Green Tea X 1</span>
              <span className="order__price">$100.00</span>
            </p>
            <p className="order__detail-third-line">
              <span className="order__order-time">Order Time: JUN 20 18:12:34</span>
              <span className="order__delivery-time">Delivery Time: JUN 22 18:12:00</span>
              <i className="fa fa-check-circle order__checked-icon" aria-hidden="true"></i>
            </p>
            <p className="order__detail-fourth-line">
              <span className="order__delivery-to">Delivery To: 1040N st. Suite B Sanjose 95112, USA</span>
            </p>
          </div>
        </div>
        <style jsx>
          {`
            .dashboard-content {
              padding-top: 49px;
              padding-left: 19px;
              width: 100%;
              height: 998px;
              background-color: #f8f7f7;
            }
            .dashboard-content__title {
              padding-bottom: 30px;
              display: flex;
              align-items: center;
            }
            .dashboard-content__title-text {
              width: 61px;
              height: 20px;
              font-size: 18px;
              line-height: 1.11;
              letter-spacing: 0.5px;
              color: #4a4a4a;
            }
            .dashboard-content__order-count {
              width: 40px;
              height: 26px;
              border-radius: 26px;
              background-color: #3e9f40;
              display: flex;
            }
            .dashboard-content__order-count-num {
              font-size: 16px;
              line-height: 1;
              letter-spacing: 0.4px;
              color: #ffffff;
              margin: auto;
            }
            .order {
              height: 164px;
              border-radius: 4px;
              background-color: #ffffff;
              margin-right: 20px;
              display: flex;
            }
            .order__image {
              background-image: url('../static/pancake.jpg');
              background-size: cover;
              background-position: center;
              width: 164px;
              height: 164px;
              position: relative;
            }
            .order__image:after {
              content: '';
              position: absolute;
              width: 52px;
              height: 52px;
              border-radius: 26px;
              top: 20px;
              left: 138px;
              background-image: url('../static/avatar.jpg');
              background-size: cover;
              background-position: center;
            }
            .order__detail {
              padding-left: 42px;
              padding-right: 20px;
              width: calc(100% - 164px - 42px - 20px);
              display: flex;
              flex-direction: column;
            }
            .order__detail-first-line {
              display: flex;
              justify-content: space-between;
              margin-bottom: 16px;
            }
            .order__user-name {
              font-size: 14px;
              font-weight: bold;
              line-height: 1;
              color: #4a4a4a;
            }
            .order__detail-second-line {
              display: flex;
              justify-content: space-between;
              height: 32px;
              border-bottom: solid 1px #979797;
              margin-bottom: 16px;
            }
            .order__detail-third-line {
              display: flex;
              margin-bottom: 12px;
            }
            .order__order-time {
              font-size: 12px;
              line-height: 1;
              color: #9b9b9b;
              margin-right: auto;
            }
            .order__delivery-time {
              background-color: #f8f7f7;
            }
            .order__checked-icon {
              margin-left: 16.4px;
            }
            .order__delivery-to {
              font-size: 12px;
              line-height: 1;
              color: #9b9b9b;
            }
          `}
        </style>
      </div>
    );
  }
}

OrderPage.propTypes = {
  setError$: PropTypes.func.isRequired,
  error: PropTypes.shape({
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    isShowModal: PropTypes.bool.isRequired,
  }),
};

OrderPage.defaultProps = {
  error: {
    title: '',
    message: '',
    isShowModal: false,
  },
};


const stateSelector = ({ error, global }) => ({ error, global });

const actionSubjects = {
  ...errorActions,
  ...globalActions,
};

export default connect(stateSelector, actionSubjects)(OrderPage);
