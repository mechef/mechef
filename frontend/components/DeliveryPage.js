// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import { connect } from '../state/RxState';
import deliveryActions from '../actions/deliveryActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import ErrorModal from './ErrorModal';
import DeliveryList from './DeliveryList';
import DeliveryEdit from './DeliveryEdit';
import { MeetupObject } from '../utils/flowTypes';

type Props = {
  delivery: {
    meetupList: Array<MeetupObject>,
    currentMeetupId: string,
    currentShippingId: string,
  },
  fetchDelivery$: any => Rx.Observable,
  createMeetup$: (meetup: MeetupObject) => Rx.Observable,
  updateMeetup$: (meetup: MeetupObject) => Rx.Observable,
  deleteMeetup$: () => Rx.Observable,
  setCurrentMeetupId$: (meetupId: string) => Rx.Observable,
  setError$: ({ isShowModal: boolean, title: string, message: string }) => Rx.Observable,
  error: {
    title: string,
    message: string,
    isShowModal: bool,
  },
  global: {
    backArrow: {
      isShow: boolean,
      title: string,
    },
  },
  toggleBackArrow$: string => Rx.Observable,
}

export class DeliveryPage extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchDelivery$();
  }
  render() {
    const {
      delivery: { meetupList, currentMeetupId },
      setError$, error,
      global: { backArrow },
      toggleBackArrow$,
      createMeetup$,
      updateMeetup$,
      deleteMeetup$,
      setCurrentMeetupId$,
    } = this.props;
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
            <DeliveryEdit
              meetupList={meetupList}
              currentMeetupId={currentMeetupId}
              onCreateMeetup={createMeetup$}
              onUpdateMeetup={updateMeetup$}
              onDeleteMeetup={deleteMeetup$}
              goBack={() => toggleBackArrow$('')}
            />
            :
            <DeliveryList
              meetupList={meetupList}
              onEditDelivery={(meetupId) => {
                setCurrentMeetupId$(meetupId);
                toggleBackArrow$('Edit Delivery');
              }}
            />
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


const stateSelector = ({ delivery, error, global }) => ({ delivery, error, global });

const actionSubjects = {
  ...errorActions,
  ...deliveryActions,
  ...globalActions,
};

export default connect(stateSelector, actionSubjects)(DeliveryPage);
