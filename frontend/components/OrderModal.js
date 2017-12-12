// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import { whiteColor, transparent } from '../utils/styleVariables';

type Props = {
  type: string,
  title: string,
  message: string,
  onCancel: () => Rx.Observable,
}

const OrderModal = (props: Props) => (
  <div className="alert-modal-overlay">
    <div className="alert-modal">
      <header className="alert-modal-header">
        <div className="cancelBtnWrapper">
          <button className="cancel-btn" onClick={props.onCancel}>&times;</button>
        </div>
      </header>
      <section className="alert-modal-body">
        <p className="alert-title">{props.title}</p>
        <p className="alert-message">{props.message}</p>
        <p className="alert-bottom-style" />
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
          height: 685px;
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
        .alert-modal-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 305px;
          height: 231px;
          background-color: #ffffff;
        }
        .alert-title {
          padding-top: 34px;
          font-size: 16px;
          letter-spacing: 0.7px;
          text-align: left;
          color: #4a4a4a;
        }
        .alert-message {
          padding-top: 23px;
          font-size: 16px;
          letter-spacing: 0.7px;
          text-align: center;
          color: #4a4a4a;
        }
        .alert-bottom-style {

        }
      `}
    </style>
  </div>
);

OrderModal.defaultProps = {
  type: 'hint',
  title: '',
  message: '',
  onCancel: () => { },
};

export default OrderModal;
