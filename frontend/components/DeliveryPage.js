// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import { connect } from '../state/RxState';
import deliveryActions from '../actions/deliveryActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import Modal from './Modal';
import DeliveryList from './DeliveryList';
import DeliveryEdit from './DeliveryEdit';
import DefaultComponent from './DefaultComponent';
import { MeetupObject } from '../utils/flowTypes';
import { whiteColor, primaryColor, textColor, primaryBtnHoverColor, textSize } from '../utils/styleVariables';

type Props = {
  delivery: {
    meetupList: Array<MeetupObject>,
    currentMeetupId: string,
    currentShippingId: string,
  },
  fetchDelivery$: any => Rx.Observable,
  createMeetup$: (meetup: MeetupObject) => Rx.Observable,
  updateMeetup$: (meetup: MeetupObject) => Rx.Observable,
  deleteMeetup$: (meetupId: string) => Rx.Observable,
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
            <Modal
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
            meetupList && meetupList.length ?
              <DeliveryList
                meetupList={meetupList}
                onEditDelivery={(meetupId) => {
                  setCurrentMeetupId$(meetupId);
                  toggleBackArrow$('Edit Delivery');
                }}
              />
              : <DefaultComponent
                coverPhotoSrc="../static/img/delivery_default.jpg"
              >
                <div className="textSection">
                  <h2 className="title">Hello there!</h2>
                  <p className="subtitle">MEET UP</p>
                  <p className="description">Add your first meetup location and available date &amp; time</p>
                </div>
                <button
                  className="addDish"
                  onClick={() => {
                    setCurrentMeetupId$('');
                    toggleBackArrow$('Edit Delivery');
                  }}
                >
                  ADD MEETUP OPTION
                </button>
              </DefaultComponent>
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

            .textSection {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding-top: 31px;
            }
            .title {
              font-family: 'Playball', cursive;
              font-size: 24px;
              color: ${textColor};
            }

            .subtitle {
              font-size: ${textSize};
              font-weight: 500;
              color: ${textColor};
            }

            .description {
              width: 315px;
              display: flex;
              justify-content: center;
              line-height: 1.5;
              font-size: 16px;
              text-align: center;
              color: ${textColor};
            }
            .addDish {
              border: 0;
              padding: 0;
              margin-top: 70px;
              background-color: ${whiteColor};
              color: ${primaryColor};
              font-size: 16px;
              margin: auto;
              cursor: pointer;
              outline: none;
            }
            .addDish:hover {
              color: ${primaryBtnHoverColor};
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
