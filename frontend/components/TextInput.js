// @flow

import * as React from 'react';

import {
  primaryColor,
  largeWidth,
  mediumWidth,
  smallWidth,
  textInputHeight,
  textInputBgColor,
  borderRadius,
  placeholderTextColor,
  placeholderLineHeight,
  placeholderFontWeight,
  placeholderFontSize,
} from '../utils/styleVariables';

type Props = {
  type: string,
  size: 'small' | 'medium' | 'large',
  placeholder: string,
  value: string | number,
  onChange: () => mixed,
};

const TextInput = (props: Props) => (
  <div>
    <input
      type={props.type}
      className={`
        textInput
        ${props.size}
      `}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
    <style jsx>
      {`
        .textInput {
          outline: none;
          border: solid 1px #979797;
          border-radius: ${borderRadius};
          height: ${textInputHeight};
          background-color: ${textInputBgColor};
          padding-left: 16px;
          font-size: ${placeholderFontSize};
          font-weight: ${placeholderFontWeight};
        }
        .textInput:focus {
          border-color: ${primaryColor};
        }
        .textInput::placeholder {
          line-height: ${placeholderLineHeight};
          color: ${placeholderTextColor};
        }
        .small {
          width: ${smallWidth};
        }
        .medium {
          width: ${mediumWidth};
        }
        .large {
          width: ${largeWidth};
        }
      `}
    </style>
  </div>
);

TextInput.defaultProps = {
  size: 'small',
  value: '',
  onChange: () => {},
  placeholder: '',
};

export default TextInput;
