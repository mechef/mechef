// @flow

import * as React from "react";

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
  transparent
} from "../utils/styleVariables";

type Props = {
  type: string,
  size: "small" | "medium" | "large",
  placeholder: string,
  value: string | number,
  onChange: () => mixed,
  onKeyPress: () => void,
  hasAddBtn: boolean,
  onAdd: () => mixed,
  maxLength: number
};

const TextInput = (props: Props) => (
  <div className="container">
    <input
      type={props.type}
      className={`
        textInput
        ${props.size}
      `}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      onKeyPress={props.onKeyPress}
      maxLength={props.maxLength}
    />
    {props.hasAddBtn ? (
      <button className="addBtn" onClick={props.onAdd}>
        <div className="plus" />
      </button>
    ) : null}
    <style jsx>
      {`
        .container {
          position: relative;
          display: flex;
          height: ${textInputHeight};
        }

        .textInput {
          outline: none;
          border: solid 1px #979797;
          border-radius: ${borderRadius};
          height: ${textInputHeight};
          background-color: ${textInputBgColor};
          padding-left: 16px;
          font-size: ${placeholderFontSize};
          border: 2px solid transparent;
          box-shadow: 0 0 1px #3d464d;
          box-sizing: border-box;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .textInput:focus {
          border-color: ${primaryColor};
          box-shadow: 0 0 0 transparent;
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

        .addBtn {
          position: absolute;
          margin-top: auto;
          margin-right: auto;
          top: 0;
          bottom: 0;
          left: 209px;
          cursor: pointer;
          background-color: ${transparent};
          border: 0;
          outline: none;
        }

        .plus {
          background-image: url("../static/img/plus.png");
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          width: 15px;
          height: 15px;
          outline: none;
        }

        .addBtn:hover .plus {
          background-image: url("../static/img/plus_hover.png");
        }
      `}
    </style>
  </div>
);

TextInput.defaultProps = {
  size: "small",
  value: "",
  onChange: () => {},
  onKeyPress: () => {},
  placeholder: "",
  hasAddBtn: false,
  onAdd: () => {},
  maxLength: 50
};

export default TextInput;
