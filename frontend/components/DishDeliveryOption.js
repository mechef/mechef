// @flow
import React from 'react';
import { translate } from 'react-i18next';
import i18n from '../i18n';

import type { MeetupObject } from '../utils/flowTypes';
import {
  primaryColor,
  textHintColor,
  textColor,
  fontSize,
  smallBreak,
} from '../utils/styleVariables';

type MeetupProps = {
  ...MeetupObject,
  t: (key: string) => string,
};

class Meetup extends React.Component<MeetupProps> {
  render() {
    const {
      t,
      meetupAddress,
      meetupStartTime,
      meetupEndTime,
      note,
      ...meetupDetail
    } = this.props;

    const formatDeliveryDays = detail => {
      const days = [
        t('deliveryeditmeetup_sunday'),
        t('deliveryeditmeetup_monday'),
        t('deliveryeditmeetup_tuesday'),
        t('deliveryeditmeetup_wednesday'),
        t('deliveryeditmeetup_thursday'),
        t('deliveryeditmeetup_friday'),
        t('deliveryeditmeetup_saturday'),
      ];
      const deliveryDays = days.map(day => Boolean(detail[`meetup${day}`]));
      const everyday = deliveryDays.every(day => day === true);
      const noday = deliveryDays.every(day => day === false);
      const deliveryDaysString = `${t(
        'deliveryeditmeetup_every',
      )} ${deliveryDays
        .reduce((all, deliver, index) => {
          if (deliver) {
            all.push(days[index]);
          }
          return all;
        }, [])
        .join(', ')}`;
      return everyday
        ? t('deliveryeditmeetup_everyday')
        : noday
          ? '-'
          : deliveryDaysString;
    };

    return (
      <div className="meetup-wrapper">
        <div className="meetup__type">
          {t('menucreatemenu_menu_meetup_description')}
        </div>
        <div>{meetupAddress}</div>
        <div>
          <span className="meetup__days">
            {formatDeliveryDays(meetupDetail)}
          </span>
          <span>
            {meetupStartTime} -&nbsp;
            {meetupEndTime}
          </span>
        </div>
        {note ? <div className="meetup__note">{note}</div> : null}
        <style jsx>
          {`
            .meetup-wrapper > div:not(:last-child) {
              padding-bottom: 12px;
            }
            .meetup__type {
              color: ${textHintColor};
            }
            .meetup__days {
              margin-right: 45px;
            }
            .meetup__note {
              font-size: 1.2rem;
            }
          `}
        </style>
      </div>
    );
  }
}

type ShippingProps = {
  t: (key: string) => string,
  meetupAddress?: string,
  note?: string,
};

const Shipping = ({ meetupAddress, note, t }: ShippingProps) => (
  <div className="shipping-wrapper">
    <div className="shipping__cell">
      <div className="shipping__title">
        {t('menucreatemenu_menu_shipping_description')}
      </div>
      <div>{meetupAddress}</div>
    </div>
    <div className="shipping__cell">
      <div className="shipping__title">
        {t('deliveryeditshipping_enter_shipping_cost')}
      </div>
      <div>$0.00</div>
    </div>
    {note ? <div className="shipping__note">{note}</div> : null}
    <style jsx>
      {`
        .shipping-wrapper {
          vertical-align: top;
        }
        .shipping__cell {
          display: inline-block;
          box-sizing: border-box;
          width: 140px;
          vertical-align: top;
        }
        .shipping__cell:not(:last-child) {
          padding-right: 8px;
        }
        .shipping__title {
          color: ${textHintColor};
          padding-bottom: 12px;
        }
        .shipping__note {
          padding-top: 12px;
          font-size: 1.2rem;
        }
      `}
    </style>
  </div>
);

type Props = {
  ...MeetupObject,
  t: (key: string) => string,
};

const DishDeliveryOption = ({ t, type, ...deliveryOption }: Props) => (
  <div className="dish-delivery-option">
    {type === 'meetup' ? (
      <Meetup {...deliveryOption} t={t} />
    ) : (
      <Shipping {...deliveryOption} t={t} />
    )}
    <style jsx>
      {`
        .dish-delivery-option {
          border-left: 2px solid ${primaryColor};
          padding-left: 18px;
          line-height: 1;
          font-size: ${fontSize};
          color: ${textColor};
        }
      `}
    </style>
  </div>
);

export default translate(['common'], {
  i18n,
  wait: typeof window !== 'undefined',
})(DishDeliveryOption);
