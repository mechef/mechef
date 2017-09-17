import React from 'react';
import PropTypes from 'prop-types';

import { connect } from '../state/RxState';
import deliveryActions from '../actions/deliveryActions';
import errorActions from '../actions/errorActions';
import ErrorModal from '../components/ErrorModal';

class DeliveryPage extends React.Component {
  componentDidMount() {
    this.props.fetchDelivery$();
  }
  render() {
    const { delivery: { shippingList, meetupList }, setError$, error } = this.props;
    return (
      <div className="container">
        {
          error.isShowModal ?
            <ErrorModal
              title={error.title}
              message={error.message}
              onCancel={() => setError$({ isShowModal: false, title: '', message: '' })}
            />
            : null
        }
        <div className="header">
          <span className="title">Shipping List</span>
          <div className="addButton">
            <i className="fa fa-plus plus-icon" aria-hidden="true" />
          </div>
        </div>
        {
          shippingList.map(delivery => (
            <div className="delivery-list">
              <div className="delivery-item">
                <div className="delivery-content">
                  <p className="delivery-title">{delivery.address}</p>
                  <p className="delivery-detail">
                    <span className="delivery-subtext">Shipping Cost: $300</span>
                  </p>
                </div>
                <span className="update-button">
                  <span className="update-button-text">UPDATE</span>
                </span>
              </div>
            </div>
          ))
        }
        <div className="header">
          <span className="title">Meetup List</span>
          <div className="addButton">
            <i className="fa fa-plus plus-icon" aria-hidden="true" />
          </div>
        </div>
        {
          meetupList.map(delivery => (
            <div className="delivery-list">
              <div className="delivery-item">
                <div className="delivery-content">
                  <p className="delivery-title">{delivery.address}</p>
                  <p className="delivery-detail">
                    <span className="delivery-subtext">Shipping Cost: $300</span>
                  </p>
                </div>
                <span className="update-button">
                  <span className="update-button-text">UPDATE</span>
                </span>
              </div>
            </div>
          ))
        }
        <style jsx>
          {`
            .container {
              margin: 0;
              padding-top: 49px
              padding-left: 19px;
              width: 100%;
              height: 998px;
              background-color: #f8f7f7;
            }
            .header {
              display: flex;
              align-items: center;
              padding-bottom: 22px;
            }
            .title {
              font-size: 18px;
              line-height: 1.11;
              letter-spacing: 0.5px;
              color: #4a4a4a;
            }
            .addButton {
              display: flex;
              width: 36px;
              height: 36px;
              margin-left: 20px;
              border-radius: 4px;
              background-color: #ffffff;
            }
            .plus-icon {
              margin: auto;
              color: #009245;
            }
            .addButton:hover {
              background-color: #3e9f40;
            }
            .addButton:hover .plus-icon {
              color: #ffffff;
            }
            .delivery-item {
              display: flex;
              justify-content: space-between;
              margin-bottom: 12px;
              padding: 30px 20px 30px 15px;
              width: 100%;
              border-radius: 4px;
              background-color: #ffffff;
            }
            .delivery-content {
              display: flex;
              flex-direction: column;
            }
            .delivery-title {
              font-size: 16px;
              font-weight: 500;
              line-height: 1;
              letter-spacing: 0.7px;
              text-align: left;
              color: #4a4a4a;
            }
            .delivery-detail {
              padding-top: 16px;
            }
            .delivery-subtext {
              margin-right: 40px;
              font-size: 14px;
              font-weight: 500;
              line-height: 1.14;
              letter-spacing: 0.6px;
              text-align: left;
              color: #9b9b9b;
            }
            .update-button {
              display: flex;
              margin-top: auto;
              margin-bottom: auto;
              width: 150px;
              height: 40px;
              border-radius: 4px;
              background-color: #3e9f40;
            }
            .update-button-text {
              margin: auto;
              font-size: 14px;
              font-weight: 500;
              line-height: 1.14;
              color: #ffffff;
              cursor: default;
            }
            .update-button:hover, .update-button:active {
              background-color: #969696;
            }
          `}
        </style>
      </div>
    );
  }
}

DeliveryPage.propTypes = {
  delivery: PropTypes.shape({
    shippingList: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      address: PropTypes.string,
      day: PropTypes.string,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
    })),
    meetupList: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      address: PropTypes.string,
      day: PropTypes.string,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
    })),
  }),
  fetchDelivery$: PropTypes.func.isRequired,
  setError$: PropTypes.func.isRequired,
  error: PropTypes.shape({
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    isShowModal: PropTypes.bool.isRequired,
  }),
};

DeliveryPage.defaultProps = {
  delivery: {
    shippingList: [],
    meetupList: [],
  },
  error: {
    title: '',
    message: '',
    isShowModal: false,
  },
};


const stateSelector = ({ delivery, error }) => ({ delivery, error });

const actionSubjects = {
  ...errorActions,
  ...deliveryActions,
};

export default connect(stateSelector, actionSubjects)(DeliveryPage);
