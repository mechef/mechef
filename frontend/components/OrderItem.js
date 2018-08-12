// @flow

import React from 'react';
import Rx from 'rxjs/Rx';
import moment from 'moment';

import {
  borderRadius,
  whiteColor,
  primaryColor,
  lineHeight,
  titleFontSize,
  subtitleFontSize,
  textColor,
  textHintColor,
  transparent,
  fontSize,
  connectErrorColor,
} from '../utils/styleVariables';

type Props = {
  sellerId?: string,
  menuTitle?: string,
  buyerEmail?: string,
  quantity?: number,
  orderTime?: string,
  deliveryTo?: string,
  deliveryTime?: string,
  totalPrice?: number,
  status?: string,
  profileImageUrl?: string,
  menuImageUrl?: string,
  t: (key: string) => string,
};

class OrderItem extends React.Component<Props> {
  static defaultProps = {
    description: '',
    profileImageUrl: '',
    menuImageUrl: '',
  };

  render() {
    return (
      <div className="orderContainer">
        <div className="orderThumbnail" />
        <div className="orderText">
          <div className="firstRow">
            <span className="sellerId">{this.props.sellerId}</span>
            <div className="iconWrapper">
              <a
                className="email"
                href={
                  this.props.buyerEmail ? `mailto:${this.props.buyerEmail}` : ''
                }
                onClick={event => {
                  event.stopPropagation();
                }}
              >
                <div className="icon mailIcon" />
              </a>
            </div>
          </div>
          <div className="secondRow">{this.props.menuTitle}</div>
          <div className="thirdRow">
            <span className="quantity">{this.props.quantity}</span>
            <span className="totalPrice">$ {this.props.totalPrice}</span>
          </div>
          <div className="divider" />
          <div className="infoWrapper">
            <div className="infoTitle">
              {this.props.t('orderdetailview_order_time')}
            </div>
            <span className="infoContent">
              {moment(this.props.orderTime).format('MMM DD hh:mm')}
            </span>
          </div>
          <div className="infoWrapper">
            <div className="infoTitle">
              {this.props.t('orderdetailview_deli_to')}
            </div>
            <span className="infoContent">{this.props.deliveryTo}</span>
          </div>
          <div className="infoWrapper">
            <div className="infoTitle">
              {this.props.t('orderdetailview_Deli_time')}
            </div>
            <span className="infoContent">
              {moment(this.props.deliveryTime).format('MMM DD hh:mm')}
            </span>
          </div>
        </div>
        <style jsx>
          {`
            .orderContainer {
              display: flex;
              border-radius: ${borderRadius};
              background-color: ${whiteColor};
            }

            .orderThumbnail {
              background-image: ${this.props.menuImageUrl
                ? `url('${this.props.menuImageUrl}')`
                : "url('../static/pancake.jpg')"};
              background-size: cover;
              background-position: center;
              width: 195px;
              height: 195px;
              border-top-left-radius: ${borderRadius};
              border-bottom-left-radius: ${borderRadius};
              position: relative;
            }

            .orderText {
              flex: 1;
              display: flex;
              flex-direction: column;
              margin-left: 42px;
              margin-right: 20px;
              padding-top: 20px;
            }

            .firstRow {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .secondRow {
              font-size: ${fontSize};
              margin-bottom: 12px;
            }

            .thirdRow {
              display: flex;
              justify-content: space-between;
              color: ${textColor};
              font-weight: 500;
              margin-bottom: 12px;
            }

            .divider {
              height: 1px;
              width: 100%;
              background-color: ${connectErrorColor};
              margin-bottom: 12px;
            }

            .quantity {
              font-size: ${fontSize};
            }

            .totalPrice {
              font-size: 1.8rem;
            }

            .infoWrapper {
              display: flex;
              margin-bottom: 12px;
            }

            .infoTitle {
              width: 105px;
              font-size: 1.2rem;
              color: ${connectErrorColor};
            }

            .infoContent {
              font-size: 1.2rem;
              color: ${textColor};
            }

            .sellerId {
              font-size: 1.4rem;
              font-weight: 500;
              color: ${textColor};
              margin-bottom: 10px;
            }

            .iconWrapper {
              margin-right: 21px;
            }

            .email {
              margin-top: 0;
            }

            .icon {
              background-size: contain;
              background-position: center;
              background-repeat: no-repeat;
              width: 25px;
              height: 25px;
              outline: none;
            }

            .mailIcon {
              background-image: url('../static/svg/order_mail.svg');
            }

            .email:hover .mailIcon {
              background-image: url('../static/svg/order_mail_hover.svg');
            }
          `}
        </style>
      </div>
    );
  }
}

export default OrderItem;
