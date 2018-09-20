// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import {
  successModalColor,
  warningModalColor,
  errorModalColor,
  hintModalColor,
} from '../utils/styleVariables';

type Props = {
  type: 'success' | 'warning' | 'error' | 'hint',
  title: string,
  message: string,
  children?: React.Node,
  onCancel: () => Rx.Observable,
};

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
        <img
          className="alert-modal-logo"
          src="../static/svg/mechef_logo_white.svg"
          alt="logo"
        />
        <div className="cancelBtnWrapper">
          <button className="cancel-btn" onClick={props.onCancel}>
            &times;
          </button>
        </div>
      </header>
      <section className="alert-modal-body">
        <h2 className="alert-title">{props.title}</h2>
        <p className="alert-message">{props.message}</p>
        {props.children ? (
          <p className="alertAction">{props.children}</p>
        ) : null}
        <p className="alert-bottom-style" />
      </section>
    </div>
    <style jsx>
      {`
        p {
          margin: 0;
        }
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
          max-width: 305px;
          width: 100%;
          max-height: 327px;
          border-radius: 8px;
          background-color: ${modalColor[props.type]};
          padding-bottom: 20px;
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
          font-size: 2.4rem;
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
          justify-content: space-between;
        }
        .alert-title {
          font-size: 1.6rem;
          letter-spacing: 0.7px;
          text-align: left;
          color: #4a4a4a;
          margin-bottom: 40px;
        }
        .alert-message {
          font-size: 1.6rem;
          letter-spacing: 0.7px;
          text-align: center;
          color: #4a4a4a;
          margin-bottom: 10px;
        }
        .alertAction {
          display: flex;
          justify-content: center;
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
