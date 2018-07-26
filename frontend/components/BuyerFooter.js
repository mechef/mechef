// @flow

import React from 'react';

import {
  buyerFooterBackgroundColor,
  buyerFooterFontSize,
  buyerFooterLineHeight,
  whiteColor,
} from '../utils/styleVariables';

const BuyerFooter = () => (
  <div className="buyer-footer">
    <div className="buyer-footer__content">
      <div className="buyer-footer--left">
        <img
          className="buyer-footer__logo"
          src="/static/svg/mechef_logo_white.svg"
          alt="mechef"
        />
      </div>
      <div className="buyer-footer--right">
        <div className="buyer-footer__link-group">
          <span className="buyer-footer__link">Service</span>
          <span className="buyer-footer__link">Service Agreement</span>
          <span className="buyer-footer__link">Contact Us</span>
          <span className="buyer-footer__link">About Us</span>
          <span className="buyer-footer__link">Privacy Policy</span>
        </div>
      </div>
    </div>
    <hr className="buyer-footer__horizontal-divider" />
    <div className="buyer-footer__copyright">
      copyright 2017 mechef, All Rights Reserved.
    </div>
    <style jsx>
      {`
        .buyer-footer {
          width: 100%;
          background-color: ${buyerFooterBackgroundColor};
          color: ${whiteColor};
          font-size: ${buyerFooterFontSize};
          line-height: ${buyerFooterLineHeight};
          letter-spacing: 0.5px;
          padding: 65px 100px;
        }
        .buyer-footer__content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 30px;
        }
        .buyer-footer__logo {
          height: 60px;
          width: 90px;
        }
        .buyer-footer--right {
          padding-left: 67px;
          display: inline-flex;
          flex-grow: 1;
          align-items: left;
          justify-content: flex-start;
        }
        .buyer-footer__link-group {
          display: grid;
          grid-template-columns: auto auto auto;
          grid-row-gap: 20px;
        }
        .buyer-footer__link-group + .buyer-footer__link-group {
          margin-top: 20px;
        }
        .buyer-footer__link {
          cursor: pointer;
          letter-spacing: 0.9px;
          margin-right: 30px;
          text-transform: uppercase;
        }
        .buyer-footer__horizontal-divider {
          height: 2px;
          opacity: 0.31;
          border: 0;
          margin: 0;
          background-color: #979797;
        }
        .buyer-footer__copyright {
          padding-top: 24px;
        }
      `}
    </style>
  </div>
);

export default BuyerFooter;
