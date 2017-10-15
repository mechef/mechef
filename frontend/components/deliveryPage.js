import React from 'react';
import PropTypes from 'prop-types';

import { connect } from '../state/RxState';
import deliveryActions from '../actions/deliveryActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import ErrorModal from './ErrorModal';
import DeliveryList from './DeliveryList';
import DeliveryEdit from './DeliveryEdit';

class DeliveryPage extends React.Component {
  componentDidMount() {
    this.props.fetchDelivery$();
  }
  render() {
    const { delivery: { shippingList, meetupList }, setError$, error, global: { backArrow }, toggleBackArrow$ } = this.props;
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
        {
          backArrow.isShow ?
            <DeliveryEdit />
            :
            <div>
              <DeliveryList title="Shipping List" deliveryList={shippingList} onAdd={() => toggleBackArrow$('Edit Delivery')} />
              <DeliveryList title="Meetup List" deliveryList={meetupList} onAdd={() => toggleBackArrow$('Edit Delivery')} />
            </div>
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


const stateSelector = ({ delivery, error, global }) => ({ delivery, error, global });

const actionSubjects = {
  ...errorActions,
  ...deliveryActions,
  ...globalActions,
};

export default connect(stateSelector, actionSubjects)(DeliveryPage);
