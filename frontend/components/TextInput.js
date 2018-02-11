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
  transparent,
  errorBorderColor,
} from '../utils/styleVariables';

type Props = {
  type: string,
  size: 'small' | 'medium' | 'large',
  placeholder: string,
  value: string | number,
  onChange: () => mixed,
  onError: (isError: boolean) => void,
  onKeyPress: () => void,
  hasAddBtn: boolean,
  onAdd: () => mixed,
  isRequired: boolean,
  maxLength: number,
};

type State = {
  errors: { [string]: string },
};

class TextInput extends React.Component<Props, State> {
  static defaultProps = {
    size: 'small',
    value: '',
    onChange: () => {},
    onError: () => {},
    onKeyPress: () => {},
    placeholder: '',
    hasAddBtn: false,
    onAdd: () => {},
    isRequired: false,
    maxLength: 50,
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      errors: {},
    };
  }
  render() {
    return (
      <div className="container">
        <div className="inputWrapper">
          <input
            type={this.props.type}
            className={`
              textInput
              ${this.props.size}
            `}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={this.props.onChange}
            onKeyPress={this.props.onKeyPress}
            onBlur={() => {
              if (this.props.isRequired && !this.props.value) {
                this.setState({
                  errors: {
                    ...this.state.errors,
                    isRequired: 'Required',
                  },
                });
                this.props.onError(true);
              } else {
                this.setState({ errors: {} });
                this.props.onError(false);
              }
            }}
            maxLength={this.props.maxLength}
          />
          {this.props.hasAddBtn ? (
            <button className="addBtn" onClick={this.props.onAdd}>
              <div className="plus" />
            </button>
          ) : null}
        </div>
        <div className="errorWrapper">
          <span>
            {Object.keys(this.state.errors)
              .map(key => this.state.errors[key])
              .join(', ')}
          </span>
        </div>
        <style jsx>
          {`
            .inputWrapper {
              position: relative;
              display: flex;
              height: ${textInputHeight};
            }

            .errorWrapper {
              padding-top: 5px;
              color: ${errorBorderColor};
              font-size: 12px;
            }

            .textInput {
              outline: none;
              border-radius: ${borderRadius};
              height: ${textInputHeight};
              background-color: ${textInputBgColor};
              padding-left: 16px;
              font-size: ${placeholderFontSize};
              border: 2px solid;
              border-color: ${Object.keys(this.state.errors).length
        ? `${errorBorderColor}`
        : `${transparent}`};
              box-shadow: 0 0 1px #3d464d;
              box-sizing: border-box;
              transition: border 0.2s, box-shadow 0.2s;
            }
            .textInput:focus {
              border-color: ${Object.keys(this.state.errors).length
        ? `${errorBorderColor}`
        : `${primaryColor}`};
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
              background-image: url('../static/img/plus.png');
              background-size: contain;
              background-position: center;
              background-repeat: no-repeat;
              width: 15px;
              height: 15px;
              outline: none;
            }

            .addBtn:hover .plus {
              background-image: url('../static/img/plus_hover.png');
            }
          `}
        </style>
      </div>
    );
  }
}

export default TextInput;
