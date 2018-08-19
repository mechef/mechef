import React from 'react';

const MailButton = ({ buyerEmail }) => (
  <div className="iconWrapper">
    <a
      className="email"
      href={buyerEmail ? `mailto:${buyerEmail}` : ''}
      onClick={event => {
        event.stopPropagation();
      }}
    >
      <div className="icon mailIcon" />
    </a>
    <style jsx>{`
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
    `}</style>
  </div>
);

export default MailButton;
