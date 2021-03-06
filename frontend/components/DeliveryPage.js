// @flow

import React from 'react';
import Rx from 'rxjs/Rx';
import { translate } from 'react-i18next';
import i18n from '../i18n';
import { connect } from '../state/RxState';
import deliveryActions from '../actions/deliveryActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import Modal from './Modal';
import DeliveryList from './DeliveryList';
import DeliveryEdit from './DeliveryEdit';
import DefaultComponent from './DefaultComponent';
import DashboardContentLayout from './DashboardContentLayout';
import type { MeetupObject } from '../utils/flowTypes';
import * as styles from '../utils/styleVariables';
import Spinner from '../components/Spinner';

type Props = {
  delivery: {
    meetupList: Array<MeetupObject>,
    updatedMeetupFields: MeetupObject,
    currentMeetupId: string,
    currentShippingId: string,
    isLoading: boolean,
  },
  fetchDelivery$: any => Rx.Observable,
  createMeetup$: (meetup: MeetupObject) => Rx.Observable,
  updateMeetup$: (meetup: MeetupObject) => Rx.Observable,
  deleteMeetup$: (meetupId: string) => Rx.Observable,
  setCurrentMeetupId$: (meetupId: string) => Rx.Observable,
  setMeetupFields$: (updatedField: MeetupObject) => Rx.Observable,
  setError$: ({
    isShowModal: boolean,
    title: string,
    message: string,
  }) => Rx.Observable,
  error: {
    title: string,
    message: string,
    isShowModal: boolean,
  },
  global: {
    backArrow: {
      isShow: boolean,
      title: string,
    },
  },
  toggleBackArrow$: string => Rx.Observable,
  setLoading$: boolean => Rx.Observable,
  t: (key: string) => string,
};

export class DeliveryPage extends React.Component<Props> {
  componentWillMount() {
    this.props.setLoading$(true);
  }
  componentDidMount() {
    this.props.fetchDelivery$();
  }
  render() {
    const {
      delivery: { meetupList, currentMeetupId, updatedMeetupFields, isLoading },
      setError$,
      error,
      global: { backArrow },
      toggleBackArrow$,
      createMeetup$,
      updateMeetup$,
      deleteMeetup$,
      setCurrentMeetupId$,
      setMeetupFields$,
    } = this.props;

    const currentMeetup =
      meetupList.find(delivery => delivery._id === currentMeetupId) || {};

    const displayMeetup = { ...currentMeetup, ...updatedMeetupFields };

    return (
      <DashboardContentLayout>
        {error.isShowModal ? (
          <Modal
            title={error.title}
            message={error.message}
            onCancel={() =>
              setError$({ isShowModal: false, title: '', message: '' })
            }
          />
        ) : null}
        {isLoading ? <Spinner /> : null}
        {backArrow.isShow ? (
          <DeliveryEdit
            meetupList={meetupList}
            displayMeetup={displayMeetup}
            onChangeMeetupField={setMeetupFields$}
            onCreateMeetup={() => {
              createMeetup$({
                ...updatedMeetupFields,
                type: 'meetup',
              });
            }}
            onUpdateMeetup={() => {
              updateMeetup$({
                _id: currentMeetup._id,
                ...updatedMeetupFields,
              });
            }}
            onDeleteMeetup={deleteMeetup$}
            goBack={() => toggleBackArrow$('')}
            t={this.props.t}
          />
        ) : meetupList && meetupList.length ? (
          <DeliveryList
            meetupList={meetupList}
            onEditDelivery={meetupId => {
              setCurrentMeetupId$(meetupId);
              toggleBackArrow$('Edit Delivery');
            }}
            onDeleteMeetup={deleteMeetup$}
            t={this.props.t}
          />
        ) : !isLoading ? (
          <DefaultComponent coverPhotoSrc="../static/img/delivery_default.jpg">
            <div className="textSection">
              <h2 className="title">{this.props.t('hello_there')}</h2>
              <p className="subtitle">{this.props.t('meetup_default')}</p>
              <p className="description">
                {this.props.t('meetup_default_description')}
              </p>
            </div>
            <button
              className="addDish"
              onClick={() => {
                setCurrentMeetupId$('');
                toggleBackArrow$('Edit Delivery');
              }}
            >
              {this.props.t('add_meetup_option')}
            </button>
          </DefaultComponent>
        ) : null}
        <style jsx>
          {`
            .textSection {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding-top: 31px;
            }
            .title {
              font-family: 'Playball', cursive;
              font-size: 2.4rem;
              color: ${styles.textColor};
            }

            .subtitle {
              font-size: ${styles.textSize};
              font-weight: 500;
              color: ${styles.textColor};
            }

            .description {
              width: 315px;
              display: flex;
              justify-content: center;
              line-height: 1.5;
              font-size: 1.6rem;
              text-align: center;
              color: ${styles.textColor};
            }
            .addDish {
              border: 0;
              padding: 0;
              margin-top: 70px;
              background-color: ${styles.whiteColor};
              color: ${styles.primaryColor};
              font-size: 1.6rem;
              margin: auto;
              cursor: pointer;
              outline: none;
            }
            .addDish:hover {
              color: ${styles.primaryBtnHoverColor};
            }
          `}
        </style>
      </DashboardContentLayout>
    );
  }
}

const stateSelector = ({ delivery, error, global }) => ({
  delivery,
  error,
  global,
});

const actionSubjects = {
  ...errorActions,
  ...deliveryActions,
  ...globalActions,
};

const Extended = translate(['common'], {
  i18n,
  wait: typeof window !== 'undefined',
})(DeliveryPage);

export default connect(
  stateSelector,
  actionSubjects,
)(Extended);
