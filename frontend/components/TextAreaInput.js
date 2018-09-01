// @flow

import * as React from 'react';

import {
  primaryColor,
  textAreaInputHeight,
  textInputBgColor,
  borderRadius,
  placeholderTextColor,
  placeholderLineHeight,
  placeholderFontWeight,
  placeholderFontSize,
  borderColor,
} from '../utils/styleVariables';

type Props = {
  placeholder: string,
  value: string | number,
  onChange: () => mixed,
  width: string | number,
  height: string | number,
};

const TextAreaInput = (props: Props) => (
  <div className="container">
    <textarea
      className="textAreaInput"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
    <style jsx>
      {`
        .container {
          position: relative;
          display: flex;
          height: ${isNaN(props.height) ? props.height : props.height + 'px'};
          width: ${isNaN(props.width) ? props.width : props.width + 'px'};
        }

        .textAreaInput {
          outline: none;
          border: solid 1px ${borderColor};
          border-radius: ${borderRadius};
          height: ${isNaN(props.height) ? props.height : props.height + 'px'};
          max-width: ${isNaN(props.width) ? props.width : props.width + 'px'};
          width: 100%;
          background-color: ${textInputBgColor};
          padding: 10px;
          font-size: ${placeholderFontSize};
          font-weight: ${placeholderFontWeight};
          border: 2px solid transparent;
          box-shadow: 0 0 1px #3d464d;
          box-sizing: border-box;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .textAreaInput:focus {
          border-color: ${primaryColor};
          box-shadow: 0 0 0 transparent;
        }
        .textAreaInput::placeholder {
          line-height: ${placeholderLineHeight};
          color: ${placeholderTextColor};
        }

        @media (max-width: 540px) {
          .container {
            width: 100%;
          }
        }
      `}
    </style>
  </div>
);

TextAreaInput.defaultProps = {
  value: '',
  onChange: () => {},
  placeholder: '',
  width: '512px',
  height: textAreaInputHeight,
};

export default TextAreaInput;
