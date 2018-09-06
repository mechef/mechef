// @flow

import * as React from 'react';

import * as styles from '../utils/styleVariables';

type Props = {
  buttonStyle?: 'primary' | 'greenBorderOnly' | 'whiteBorderOnly',
  size?: 'small' | 'medium' | 'expanded',
  children?: React.Node,
  onClick: () => mixed,
};

const Button = (props: Props) => (
  <button
    type="button"
    className={`
      button
      ${props.buttonStyle ? props.buttonStyle : ''}
      ${props.size ? props.size : ''}
    `}
    onClick={props.onClick}
  >
    {props.children}
    <style jsx>
      {`
        .button {
          outline: none;
          border: 0;
          border-radius: ${styles.borderRadius};
          height: ${styles.btnHeight};
          cursor: pointer;
          font-weight: ${styles.fontWeight};
          font-size: ${styles.fontSize};
          line-height: ${styles.lineHeight};
        }
        .primary {
          background-color: ${styles.primaryColor};
          color: ${styles.btnTextColor};
        }
        .primary:hover {
          background-color: ${styles.primaryBtnHoverColor};
        }
        .greenBorderOnly {
          background-color: ${styles.transparent};
          border: solid 1px ${styles.primaryColor};
          color: ${styles.primaryColor};
        }
        .greenBorderOnly:hover {
          background-color: ${styles.primaryColor};
          color: ${styles.btnTextColor};
        }
        .whiteBorderOnly {
          background-color: ${styles.transparent};
          border: solid 1px ${styles.btnTextColor};
          color: ${styles.btnTextColor};
        }
        .whiteBorderOnly:hover {
          background-color: ${styles.btnTextColor};
          color: rgba(0, 0, 0, 0.5);
        }
        .small {
          width: ${styles.smallBtnWidth};
        }
        .medium {
          width: ${styles.mediumBtnWidth};
        }
        .expanded {
          width: 100%;
        }
        @media screen and (max-width: 768px) {
          .small {
            width: 90%;
          }
          .medium {
            width: 90%;
          }
        }
        @media screen and (max-width: 540px) {
          .small {
            width: 100%;
          }
        }
      `}
    </style>
  </button>
);

Button.defaultProps = {
  buttonStyle: 'primary',
  size: 'small',
  children: '',
  onClick: () => {},
};

export default Button;
