// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import { successModalColor, warningModalColor, errorModalColor, hintModalColor } from '../utils/styleVariables';

type Props = {
  type: string,
  title: string,
  message: string,
  onCancel: () => Rx.Observable,
}

const modalColor = {
  success: successModalColor,
  warning: warningModalColor,
  error: errorModalColor,
  hint: hintModalColor,
};

const Modal = (props: Props) => (
  <div className="alert-modal-overlay">
    <div className="alert-modal">
      <header className="alert-modal-header">
        <img className="alert-modal-logo" src="../static/svg/mechef_logo_white.svg" alt="logo" />
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
          z-index: 20;
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
          background-color: ${modalColor[props.type]};
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
        .cancelBtnWrapper {
          position: absolute;
          right: 0;
          width: 24px;
          height: 24px;
        }
        .cancel-btn {
          margin: auto;
          font-size: 24px;
          background-color: ${modalColor[props.type]};
          color: #ffffff;
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

Modal.defaultProps = {
  type: 'hint',
  title: '',
  message: '',
  onCancel: () => {},
};

export default Modal;
