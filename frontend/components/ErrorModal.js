// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

type Props = {
  title: string,
  message: string,
  onCancel: () => Rx.Observable,
}

const ErrorModal = (props: Props) => (
  <div className="alert-modal-overlay">
    <div className="alert-modal">
      <header className="alert-modal-header">
        <img className="alert-modal-logo" src="../static/food.png" alt="logo" />
        <i className="fa fa-times cancel-btn fa-2x" aria-hidden="true" onClick={props.onCancel} />
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
          width: 305px;
          height: 327px;
          border-radius: 8px;
          background-color: #3f9f40;
        }
        .alert-modal-header {
          display: flex;
          justify-content: center;
          height: 77px;
        }
        .alert-modal-logo {
          margin: auto;
          width: 55px;
          height: 40px;
        }
        .cancel-btn {
          padding: 10px;
          color: rgba(255, 255, 255, 0.6);
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
          font-family: AvenirNext;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.7px;
          text-align: left;
          color: #4a4a4a;
        }
        .alert-message {
          padding-top: 23px;
          font-family: AvenirNext;
          font-size: 16px;
          font-weight: 500;
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

ErrorModal.defaultProps = {
  title: '',
  message: '',
  onCancel: () => {},
};

export default ErrorModal;
