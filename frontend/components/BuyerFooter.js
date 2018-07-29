// @flow

import React from 'react';

import {
  buyerFooterBackgroundColor,
  buyerFooterFontSize,
  buyerFooterLineHeight,
  smallBreak,
  whiteColor,
} from '../utils/styleVariables';

const BuyerFooter = () => (
  <div className="buyer-footer">
    <div className="buyer-footer__content">
      <div className="buyer-footer__logo-container">
        <img
          className="buyer-footer__logo"
          src="/static/svg/mechef_logo_white.svg"
          alt="mechef"
        />
      </div>
      <div className="buyer-footer__link-container">
        <div className="buyer-footer__link-group">
          <span className="buyer-footer__link" data-link-page="service">
            Service
          </span>
          <span
            className="buyer-footer__link"
            data-link-page="service agreement"
          >
            Service Agreement
          </span>
          <span className="buyer-footer__link" data-link-page="contact us">
            Contact Us
          </span>
          <span className="buyer-footer__link" data-link-page="about us">
            About Us
          </span>
          <span className="buyer-footer__link" data-link-page="privacy policy">
            Privacy Policy
          </span>
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
          box-sizing: border-box;
          background-color: ${buyerFooterBackgroundColor};
          color: ${whiteColor};
          font-size: ${buyerFooterFontSize};
          line-height: ${buyerFooterLineHeight};
          letter-spacing: 0.5px;
          padding: 50px 30px 40px;
        }
        .buyer-footer__content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
        }
        .buyer-footer__logo {
          height: 45px;
          width: 68px;
        }
        .buyer-footer__link-container {
          padding-top: 33px;
          display: flex;
          align-items: left;
          justify-content: flex-start;
        }
        .buyer-footer__link-group {
          display: flex;
          flex-direction: column;
        }
        .buyer-footer__link {
          cursor: pointer;
          letter-spacing: 0.9px;
          text-transform: uppercase;
          margin-bottom: 22px;
        }
        .buyer-footer__link[data-link-page='service agreement'] {
          order: 4;
        }
        .buyer-footer__link[data-link-page='about us'] {
          order: 2;
        }
        .buyer-footer__link[data-link-page='contact us'] {
          order: 3;
        }
        .buyer-footer__link[data-link-page='privacy policy'] {
          order: 5;
        }
        .buyer-footer__horizontal-divider {
          display: none;
          height: 2px;
          opacity: 0.31;
          border: 0;
          margin: 0;
          background-color: #979797;
        }
        .buyer-footer__copyright {
          padding-top: 24px;
        }

        @media (min-width: ${smallBreak}) {
          .buyer-footer {
            padding: 65px 100px;
          }
          .buyer-footer__content {
            padding-bottom: 30px;
            flex-direction: row;
            align-items: center;
          }
          .buyer-footer__logo {
            height: 60px;
            width: 90px;
          }
          .buyer-footer__link-container {
            padding-left: 67px;
            padding-top: 0;
            flex-grow: 1;
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
            margin-right: 30px;
            margin-bottom: 0;
          }
          .buyer-footer__horizontal-divider {
            display: block;
          }
        }
      `}
    </style>
  </div>
);

export default BuyerFooter;
