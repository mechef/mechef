// @flow

import React from 'react';
import Rx from 'rxjs/Rx';
import moment from 'moment';

import {
  borderRadius,
  whiteColor,
  primaryColor,
  textColor,
  transparent,
  fontSize,
  connectErrorColor,
} from '../utils/styleVariables';
import type { OrderObject, OrderState } from '../utils/flowTypes';
import { ORDER_STATE } from '../utils/constants';

type Props = {
  t: (key: string) => string,
  order: OrderObject,
  onCancel: () => Rx.Observable,
  onUpdateState: (state: OrderState) => Rx.Observable,
};

class OrderModal extends React.Component<Props> {
  defaultProps = {
    onCancel: () => {},
  };
  componentWillMount() {
    // $FlowFixMe
    document.body.style.overflow = 'hidden';
  }
  componentDidMount() {
    // $FlowFixMe
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: this.props.order.deliveryLatitude,
        lng: this.props.order.deliveryLongitude,
      },
      zoom: 15,
      panControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: true,
      fullscreenControl: false,
      gestureHandling: 'cooperative',
    });
    // $FlowFixMe
    const latlng = new google.maps.LatLng(
      this.props.order.deliveryLatitude,
      this.props.order.deliveryLongitude,
    );
    map.setCenter(latlng);
    const marker = new google.maps.Marker({
      position: latlng,
      title: this.props.order.deliveryAddress,
      visible: true,
    });
    marker.setMap(map);
    // const placesService = new google.maps.places.PlacesService(map);
  }

  componentWillUnmount() {
    // $FlowFixMe
    document.body.style.overflow = 'auto';
  }

  render() {
    return (
      <div className="alert-modal-overlay">
        <div className="alert-modal">
          <header className="alert-modal-header">
            <div className="cancelBtnWrapper">
              <button className="cancel-btn" onClick={this.props.onCancel}>
                <img alt="Cancel" src="../static/svg/cancel_white.svg" />
              </button>
            </div>
          </header>
          <section className="modalBody">
            <p className="firstRow">
              <span className="buyerName">{this.props.order.buyerName}</span>
              <div className="iconWrapper">
                <a
                  className="email"
                  href={
                    this.props.order.buyerEmail
                      ? `mailto: ${this.props.order.buyerEmail}`
                      : ''
                  }
                  onClick={event => event.stopPropagation()}
                >
                  <div className="icon mailIcon" />
                </a>
              </div>
            </p>
            <p className="secondRow">
              <span className="dishName">{this.props.order.dishName}</span>
            </p>
            <p className="thirdRow">
              <span className="quantity">{this.props.order.quantity}</span>
              <span className="totalPrice">$ {this.props.order.amount}</span>
            </p>
            <p className="divider" />
            <p className="infoWrapper">
              <p className="infoTitle">
                {this.props.t('orderdetailview_order_time')}
              </p>
              <span className="infoContent">
                {moment(this.props.order.orderTime).format('MMM DD hh:mm')}
              </span>
            </p>
            <p className="infoWrapper">
              <p className="infoTitle">
                {this.props.t('orderdetailview_deli_to')}
              </p>
              <span className="infoContent">
                {this.props.order.deliveryAddress}
              </span>
            </p>
            <p className="infoWrapper">
              <p className="infoTitle">
                {this.props.t('orderdetailview_Deli_time')}
              </p>
              <span className="infoContent">
                {moment(this.props.order.deliveryTime).format('MMM DD hh:mm')}
              </span>
            </p>
            <div className="mapWrapper" id="map" />
            <div className="messageWrapper">
              <p className="messageTitle">
                {this.props.t('orderdetailview_message_from_buyer')}
              </p>
              <span className="messageContent">
                {this.props.order.messageFromBuyer}
              </span>
            </div>
            <p className="divider" />
            <div className="stateWrapper">
              <div
                className={`
                  stateButtonWrapper
                  ${
                    this.props.order.state === ORDER_STATE.cancelled
                      ? 'selected'
                      : ''
                  }
                `}
              >
                <button
                  className="stateBtn"
                  onClick={() => {
                    this.props.onUpdateState(ORDER_STATE.cancelled);
                  }}
                >
                  <div className="icon cancelledIcon" />
                  <p className="stateActionText">
                    {this.props.t('orderdetailview_status_cancel')}
                  </p>
                </button>
              </div>
              <div
                className={`
                  stateButtonWrapper
                  ${
                    this.props.order.state === ORDER_STATE.waiting
                      ? 'selected'
                      : ''
                  }
                `}
              >
                <button
                  className="stateBtn"
                  onClick={() => {
                    this.props.onUpdateState(ORDER_STATE.waiting);
                  }}
                >
                  <div className="icon waitingIcon" />
                  <p className="stateActionText">
                    {this.props.t('orderdetailview_status_waiting')}
                  </p>
                </button>
              </div>
              <div
                className={`
                  stateButtonWrapper
                  ${
                    this.props.order.state === ORDER_STATE.finished
                      ? 'selected'
                      : ''
                  }
                `}
              >
                <button
                  className="stateBtn"
                  onClick={() => {
                    this.props.onUpdateState(ORDER_STATE.finished);
                  }}
                >
                  <div className="icon finishedIcon" />
                  <p className="stateActionText">
                    {this.props.t('orderdetailview_status_finish')}
                  </p>
                </button>
              </div>
            </div>
          </section>
        </div>
        <style jsx>
          {`
            .alert-modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              z-index: 1;
              width: 100vw;
              height: 100vh;
              background-color: rgba(0, 0, 0, 0.6);
            }
            .alert-modal {
              position: fixed;
              z-index: 99;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              max-width: 488px;
              width: calc(100% - 40px);
              margin-right: 20px;
              max-height: 500px;
              border-radius: 4px;
              background-color: ${whiteColor};
              overflow: scroll;
            }
            .alert-modal-header {
              display: flex;
              justify-content: flex-end;
              height: 70px;
              width: 100%;
              background-image: url('../static/img/menu_default.jpg');
              background-size: cover;
              background-position: center;
              position: relative;
            }
            .alert-modal-header:before {
              content: '';
              height: 100%;
              width: 100%;
              background-color: rgba(0, 0, 0, 0.4);
              position: absolute;
              z-index: 1;
            }
            .alert-modal-header:after {
              content: '';
              position: absolute;
              top: 55px;
              left: 12px;
              background-image: url('../static/img/avatar.jpg');
              background-size: cover;
              background-position: center;
              width: 30px;
              height: 30px;
              border-radius: 15px;
              z-index: 2;
            }
            .cancelBtnWrapper {
              width: 24px;
              height: 24px;
              margin-top: 20px;
              margin-right: 20px;
              position: relative;
              z-index: 2;
            }
            .cancel-btn {
              margin: auto;
              font-size: 2.4rem;
              background-color: ${transparent};
              color: ${whiteColor};
              border: 0;
              padding: 0;
              margin: 0;
              outline: none;
              cursor: pointer;
            }
            .cancel-btn:hover {
              opacity: 0.6;
            }

            .modalBody {
              display: flex;
              flex-direction: column;
              padding: 20px;
            }

            .firstRow {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: 0;
              padding-top: 5px;
            }

            .secondRow {
              font-size: ${fontSize};
              margin-top: 0;
            }

            .thirdRow {
              display: flex;
              justify-content: space-between;
              color: ${textColor};
              font-weight: 500;
              margin: 0;
            }

            .divider {
              height: 1px;
              width: 100%;
              background-color: #979797;
              margin-bottom: 12px;
              opacity: 0.3;
            }

            .quantity {
              font-size: ${fontSize};
            }

            .totalPrice {
              font-size: 1.8rem;
            }

            .infoWrapper {
              display: flex;
              align-items: center;
              margin: 0;
            }

            .infoTitle {
              width: 105px;
              font-size: 1.2rem;
              color: ${connectErrorColor};
            }

            .infoContent {
              font-size: 1.2rem;
              color: ${textColor};
              flex: 1;
            }

            .messageTitle {
              font-size: 1.2rem;
              color: ${connectErrorColor};
            }

            .messageContent {
              font-size: 1.2rem;
              color: ${textColor};
            }

            .buyerName {
              font-size: 1.4rem;
              font-weight: 500;
              color: ${textColor};
            }

            .iconWrapper {
              margin-right: 21px;
            }

            .email {
              margin-left: 30px;
            }

            .icon {
              background-size: contain;
              background-position: center;
              background-repeat: no-repeat;
              width: 20px;
              height: 20px;
              outline: none;
              margin-bottom: 13px;
            }

            .mailIcon {
              background-image: url('../static/svg/order_mail.svg');
            }

            .email:hover .mailIcon {
              background-image: url('../static/svg/order_mail_hover.svg');
            }

            .stateWrapper {
              display: flex;
              justify-content: center;
              padding-top: 15px;
            }

            .stateButtonWrapper {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100px;
              padding-top: 13px;
              padding-bottom: 15px;
            }

            .stateButtonWrapper:nth-child(2) {
              margin-left: 30px;
              margin-right: 30px;
            }

            .selected {
              border: solid 1px ${primaryColor};
              border-radius: ${borderRadius};
            }

            .stateBtn {
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
              background-color: ${transparent};
              border: 0;
              padding: 0;
              outline: none;
            }

            .stateActionText {
              font-size: 1.4rem;
              line-height: 1.14;
              color: ${textColor};
              margin: 0;
            }

            .cancelledIcon {
              background-image: url('../static/svg/order_cancel.svg');
            }

            .stateButtonWrapper:hover .cancelledIcon {
              background-image: url('../static/svg/order_cancel_hover.svg');
            }

            .waitingIcon {
              background-image: url('../static/svg/order_waiting.svg');
            }

            .stateButtonWrapper:hover .waitingIcon {
              background-image: url('../static/svg/order_waiting_hover.svg');
            }

            .finishedIcon {
              background-image: url('../static/svg/order_finished.svg');
            }

            .stateButtonWrapper:hover .finishedIcon {
              background-image: url('../static/svg/order_finished_hover.svg');
            }

            .mapWrapper {
              width: 100%;
              height: 161px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default OrderModal;
