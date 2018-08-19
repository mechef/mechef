import React from 'react';

import {
  textColor,
  whiteColor,
  primaryColor,
  placeholderTextColor,
  transparent,
} from '../utils/styleVariables';

const TitleWithNotification = ({ title, isSelected, onClick, count }) => (
  <button className="titleWithNotification" onClick={onClick}>
    <span className="orderTitle">{title}</span>
    <div
      className={`
          notification
          ${isSelected ? 'selected' : ''}
        `}
    >
      {count}
    </div>
    <style jsx>{`
      button {
        outline: none;
        cursor: pointer;
        border: 0;
        background-color: ${transparent};
      }
      .titleWithNotification {
        display: flex;
        align-items: center;
      }

      .orderTitle {
        font-size: 1.4rem;
        line-height: 1.11;
        letter-spacing: 0.2px;
        color: ${textColor};
      }

      .notification {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 20px;
        margin-left: 15px;
        border-radius: 26px;
        color: ${whiteColor};
        background-color: ${placeholderTextColor};
      }

      .notification:hover,
      .notification.selected {
        background-color: ${primaryColor};
      }
    `}</style>
  </button>
);

export default TitleWithNotification;
