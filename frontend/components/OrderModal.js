// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import { borderRadius, whiteColor, primaryColor, lineHeight, titleFontSize, subtitleFontSize, textColor, textHintColor, transparent, fontSize, connectErrorColor } from '../utils/styleVariables';
import { OrderObject } from '../utils/flowTypes';
import { ORDER_STATE } from '../utils/constants';

type Props = {
  order: OrderObject,
  onEmail: () => Rx.Observable,
  onCancel: () => Rx.Observable,
  onUpdateState: (state: string) => Rx.Observable,
}


const OrderModal = (props: Props) => (
  <div className="alert-modal-overlay">
    <div className="alert-modal">
      <header className="alert-modal-header">
        <div className="cancelBtnWrapper">
          <button className="cancel-btn" onClick={props.onCancel}>&times;</button>
        </div>
      </header>
      <section className="modalBody">
        <p className="firstRow">
          <span className="buyerName">{props.order.buyerName}</span>
          <div className="iconWrapper">
            <button className="btn" onClick={props.onEmail}>
              <div className="icon mailIcon" />
            </button>
          </div>
        </p>
        <p className="secondRow">
          <span className="dishName">{props.order.dishName}</span>
        </p>
        <p className="thirdRow">
          <span className="quantity">{props.order.quantity}</span>
          <span className="totalPrice">$ {props.order.amount}</span>
        </p>
        <p className="divider" />
        <p className="infoWrapper">
          <p className="infoTitle">Order Time : </p>
          <span className="infoContent">{props.order.orderTime}</span>
        </p>
        <p className="infoWrapper">
          <p className="infoTitle">Delivery To : </p>
          <span className="infoContent">{props.order.deliveryAddress}</span>
        </p>
        <p className="infoWrapper">
          <p className="infoTitle">Delivery Time : </p>
          <span className="infoContent">{props.order.deliveryTime}</span>
        </p>
        <div className="messageWrapper">
          <p className="messageTitle">Message from buyer : </p>
          <span className="messageContent">{props.order.messageFromBuyer}</span>
        </div>
        <p className="divider" />
        <div className="stateWrapper">
          <div className="stateButtonWrapper">
            <button
              className="stateBtn"
              onClick={() => {
                props.onUpdateState(ORDER_STATE.cancelled);
              }}
            >
              <div className="icon cancelledIcon" />
              <p className="stateActionText">CANCEL</p>
            </button>
          </div>
          <div className="stateButtonWrapper">
            <button
              className="stateBtn"
              onClick={() => {
                props.onUpdateState(ORDER_STATE.waiting);
              }}
            >
              <div className="icon waitingIcon" />
              <p className="stateActionText">WAITING</p>
            </button>
          </div>
          <div className="stateButtonWrapper">
            <button
              className="stateBtn"
              onClick={() => {
                props.onUpdateState(ORDER_STATE.finished);
              }}
            >
              <div className="icon finishedIcon" />
              <p className="stateActionText">FINISHED</p>
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
          width: 488px;
          height: 500px;
          border-radius: 4px;
          background-color: ${whiteColor};
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
          background-color: rgba(0, 0, 0, .400);
          position: absolute;
          z-index: 1;
        }
        .alert-modal-header:after {
          content: '';
          position: absolute;
          top: 55px;
          left: 12px;
          background-image: url('../static/avatar.jpg');
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
          font-size: 24px;
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
          padding: 10px;
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
          font-size: 18px;
        }

        .infoWrapper {
          display: flex;
          align-items: center;
          margin: 0;
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

        .messageTitle {
          font-size: 12px;
          color: ${connectErrorColor};
        }

        .messageContent {
          font-size: 12px;
          color: ${textColor};
        }

        .buyerName {
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

        .stateWrapper {
          display: flex;
          justify-content: center;
          padding-top: 25px;
        }

        .stateButtonWrapper {
          display: flex;
          justify-content: center;
          width: 100px;
        }

        .stateButtonWrapper:nth-child(2) {
          margin-left: 30px;
          margin-right: 30px;
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
          font-size: 14px;
          line-height: 1.14;
          color: ${textColor};
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
      `}
    </style>
  </div>
);

OrderModal.defaultProps = {
  onCancel: () => { },
};

export default OrderModal;
