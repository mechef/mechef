// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import Button from './Button';

type Props = {
  meetupList: Array<{
    _id: string,
    note: string,
    meetupEndTime: string,
    meetupStartTime: string,
    meetupSaturday: boolean,
    meetupFriday: boolean,
    meetupThursday: boolean,
    meetupWednesday: boolean,
    meetupTuesday: boolean,
    meetupMonday: boolean,
    meetupSunday: boolean,
    meetLongitude: number,
    meetupLatitude: number,
    meetupAddress: string,
    type: string,
  }>,
  onEditDelivery: (meetupId: string) => Rx.Observable,
}

const DeliveryList = ({ meetupList, onEditDelivery }: Props): React.Element<'div'> => (
  <div>
    <div className="header">
      <span className="title">Delivery List</span>
      <div role="link" tabIndex="-1" className="addButton" onClick={() => onEditDelivery('')}>
        <i className="fa fa-plus plus-icon" aria-hidden="true" />
      </div>
    </div>
    {
      meetupList.map(meetup => (
        <div key={meetup._id} className="delivery-list">
          <div className="delivery-item">
            <div className="delivery-content">
              <p className="delivery-title">{meetup.meetupAddress}</p>
              <p className="delivery-detail">
                <span className="delivery-subtext">Shipping Cost:</span>
              </p>
            </div>
            <Button
              buttonStyle="primary"
              size="small"
              onClick={() => onEditDelivery(meetup._id)}
            >
              UPDATE
            </Button>
          </div>
        </div>
      ))
    }
    <style jsx>
      {`
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
      `}
    </style>
  </div>
);

export default DeliveryList;
