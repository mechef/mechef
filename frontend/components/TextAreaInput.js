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
} from '../utils/styleVariables';

type Props = {
  placeholder: string,
  value: string | number,
  onChange: () => mixed,
};

const TextAreaInput = (props: Props) => (
  <div className="container">
    <input
      type="textarea"
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
          height: ${textAreaInputHeight};
          width: 512px;
        }

        .textAreaInput {
          outline: none;
          border: solid 1px #979797;
          border-radius: ${borderRadius};
          height: ${textAreaInputHeight};
          width: 512px;
          background-color: ${textInputBgColor};
          padding-left: 16px;
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
      `}
    </style>
  </div>
);

TextAreaInput.defaultProps = {
  value: '',
  onChange: () => { },
  placeholder: '',
};

export default TextAreaInput;
