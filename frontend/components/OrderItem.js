// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import { borderRadius, whiteColor, primaryColor, lineHeight, titleFontSize, subtitleFontSize, textColor, textHintColor, transparent, fontSize, connectErrorColor } from '../utils/styleVariables';

type Props = {
  sellerId: string,
  menuTitle: string,
  quantity: number,
  orderTime: string,
  deliveryTo: string,
  deliveryTime: string,
  totalPrice: string,
  status: string,
  profileImageUrl: string,
  menuImageUrl: string,
  onEmail: () => Rx.Observable,
}

class OrderItem extends React.Component<Props, State> {

  static defaultProps = {
    description: '',
    profileImageUrl: '',
    menuImageUrl: '',
    onEmail: () => {},
  }

  render() {
    return (
      <div className="orderContainer">
        <div className="orderThumbnail" />
        <div className="orderText">
          <div className="firstRow">
            <span className="sellerId">{this.props.sellerId}</span>
            <div className="iconWrapper">
              <button className="btn" onClick={this.props.onEmail}>
                <div className="icon mailIcon" />
              </button>
            </div>
          </div>
          <div className="secondRow">{this.props.menuTitle}</div>
          <div className="thirdRow">
            <span className="quantity">{this.props.quantity}</span>
            <span className="totalPrice">$ {this.props.totalPrice}</span>
          </div>
          <div className="divider" />
          <div className="infoWrapper">
            <div className="infoTitle">Order Time : </div>
            <span className="infoContent">{this.props.orderTime}</span>
          </div>
          <div className="infoWrapper">
            <div className="infoTitle">Delivery To : </div>
            <span className="infoContent">{this.props.deliveryTo}</span>
          </div>
          <div className="infoWrapper">
            <div className="infoTitle">Delivery Time : </div>
            <span className="infoContent">{this.props.deliveryTime}</span>
          </div>
        </div>
        <style jsx>
          {`
            .orderContainer {
              display: flex;
              width: 744px;
              height: 195px;
              border-radius: ${borderRadius};
              background-color: ${whiteColor};
            }

            .orderThumbnail {
              background-image: url('${this.props.menuImageUrl}'), url('../static/pancake.jpg');
              background-size: cover;
              background-position: center;
              width: 195px;
              height: 195px;
              border-top-left-radius: ${borderRadius};
              border-bottom-left-radius: ${borderRadius};
              position: relative;
            }

            .orderThumbnail:after {
              content: '';
              position: absolute;
              left: calc(195px - 26px);
              top: calc(195px / 2 - 26px);
              width: 52px;
              height: 52px;
              border-radius: 26px;
              background-image: url('${this.props.profileImageUrl}'), url('../static/avatar.jpg');
              background-size: cover;
              background-position: center;
            }

            .orderText {
              flex: 1;
              display: flex;
              flex-direction: column;
              margin-left: 42px;
              margin-right: 20px;
              padding-top: 19px;
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
              font-size: 18px;
            }

            .infoWrapper {
              display: flex;
              margin-bottom: 12px;
            }

            .infoTitle {
              width: 105px;
              font-size: 12px;
              color: ${connectErrorColor};
            }

            .infoContent {
              font-size: 12px;
              color: ${textColor};
            }

            .sellerId {
              font-size: 14px;
              font-weight: 500;
              color: ${textColor};
            }

            .iconWrapper {
              margin-right: 21px;
            }

            .btn {
              cursor: pointer;
              background-color: ${transparent};
              border: 0;
              padding: 0;
              outline: none;
              margin-left: 30px;
            }

            .icon {
              background-size: contain;
              background-position: center;
              background-repeat:no-repeat;
              width: 25px;
              height: 25px;
              outline: none;
            }

            .mailIcon {
              background-image: url('../static/svg/order_mail.svg');
            }

            .btn:hover .mailIcon {
              background-image: url('../static/svg/order_mail_hover.svg');
            }
          `}
        </style>
      </div>
    );
  }
}


export default OrderItem;