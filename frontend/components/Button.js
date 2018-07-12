// @flow

import * as React from 'react';

import {
  primaryColor,
  btnTextColor,
  transparent,
  borderRadius,
  smallBtnWidth,
  mediumBtnWidth,
  btnHeight,
  lineHeight,
  fontWeight,
  fontSize,
  primaryBtnHoverColor,
} from '../utils/styleVariables';

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
      ${props.buttonStyle}
      ${props.size}
    `}
    onClick={props.onClick}
  >
    {props.children}
    <style jsx>
      {`
        .button {
          outline: none;
          border: 0;
          border-radius: ${borderRadius};
          height: ${btnHeight};
          cursor: pointer;
          font-weight: ${fontWeight};
          font-size: ${fontSize};
          line-height: ${lineHeight};
        }
        .primary {
          background-color: ${primaryColor};
          color: ${btnTextColor};
        }
        .primary:hover {
          background-color: ${primaryBtnHoverColor};
        }
        .greenBorderOnly {
          background-color: ${transparent};
          border: solid 1px ${primaryColor};
          color: ${primaryColor};
        }
        .greenBorderOnly:hover {
          background-color: ${primaryColor};
          color: ${btnTextColor};
        }
        .whiteBorderOnly {
          background-color: ${transparent};
          border: solid 1px ${btnTextColor};
          color: ${btnTextColor};
        }
        .whiteBorderOnly:hover {
          background-color: ${btnTextColor};
          color: rgba(0, 0, 0, 0.5);
        }
        .small {
          width: ${smallBtnWidth};
        }
        .medium {
          width: ${mediumBtnWidth};
        }
        .expanded {
          width: 100%;
        }
      `}
    </style>
  </button>
);

Button.defaultProps = {
  buttonStyle: 'primary',
  size: 'small',
  children: '',
};

export default Button;
