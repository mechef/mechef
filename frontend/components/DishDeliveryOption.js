// @flow
import React from 'react';

import { MeetupObject } from '../utils/flowTypes';
import {
  primaryColor,
  textHintColor,
  textColor,
  fontSize,
} from '../utils/styleVariables';

type Props = MeetupObject;

class Meetup extends React.Component<Props> {
  render() {
    const {
      meetupAddress,
      meetupStartTime,
      meetupEndTime,
      note,
      ...meetupDetail
    } = this.props;

    const formatDeliveryDays = (meetupDetail) => {
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];
      const deliveryDays = days.map(day => Boolean(meetupDetail[`meetup${day}`]));
      const everyday = deliveryDays.every(day => day === true);
      const noday = deliveryDays.every(day => day === false);
      const deliveryDaysString = `Every ${
        deliveryDays.reduce((all, deliver, index) => {
          if (deliver) {
            all.push(days[index]);
          }
          return all;
        }, []).join(', ')
      }`;
      return everyday ?
        'Everyday' :
        noday ?
          '-' :
          deliveryDaysString;
    };

    return (
      <div>
        <div className="meetup__type">Meet up</div>
        <div>{meetupAddress}</div>
        <div>
          <span className="meetup__days">
            { formatDeliveryDays(meetupDetail) }
          </span>
          <span>{meetupStartTime} - {meetupEndTime}</span>
        </div>
        {
          note ?
            <div className="meetup__note">
              {note}
            </div> :
            null
        }
        <style jsx>
          {`
            div + div {
              margin-top: 12px;
            }
            .meetup__type {
              color: ${textHintColor};
            }
            .meetup__days {
              margin-right: 45px;
            }
            .meetup__note {
              font-size: 12px;
            }
          `}
        </style>
      </div>
    );
  }
}

const Shipping = ({ meetupAddress, note }) => (
  <div>
    <div className="shipping__cell">
      <div className="shipping__title">Shipping to</div>
      <div>{meetupAddress}</div>
    </div>
    <div className="shipping__cell">
      <div className="shipping__title">Shipping Cost</div>
      <div>$0.00</div>
    </div>
    {
      note ?
        <div className="shipping__note">
          {note}
        </div> :
        null
    }
    <style jsx>
      {`
        .shipping__cell {
          display: inline-block;
        }
        .shipping__cell + .shipping__cell {
          margin-left: 54px;
        }
        .shipping__cell > div + div {
          margin-top: 12px;
        }
        .shipping__title {
          color: ${textHintColor};
        }
        .shipping__note {
          font-size: 12px;
        }
      `}
    </style>
  </div>
);

const DishDeliveryOption = ({ type, ...deliveryOption }: Props) => (
  <div className="dish-delivery-option">
    {
      type === 'meetup' ?
        <Meetup {...deliveryOption} /> :
        <Shipping {...deliveryOption} />
    }
    <style jsx>
      {`
        .dish-delivery-option {
          border-left: 2px solid ${primaryColor};
          padding-left: 20px;
          line-height: 1;
          font-size: ${fontSize};
          color: ${textColor};
        }
      `}
    </style>
  </div>
);

export default DishDeliveryOption;
