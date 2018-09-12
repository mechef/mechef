// @flow

import * as React from 'react';

import * as styles from '../utils/styleVariables';

type Props = {
  type: string,
  pattern: string,
  validationMessage: string,
  size: 'small' | 'medium' | 'large',
  placeholder: string,
  value: string | number,
  onChange: (event: SyntheticEvent<HTMLInputElement>) => mixed,
  onError: (isError: boolean) => void,
  onKeyPress: () => void,
  hasAddBtn: boolean,
  onAdd: () => mixed,
  isRequired: boolean,
  maxLength: number,
  align: 'left' | 'center',
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
    pattern: '.',
    validationMessage: '',
    align: 'left',
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
        <div
          className={`inputWrapper ${this.props.size} ${
            this.props.align === 'center' ? 'center' : ''
          }`}
        >
          <input
            type={this.props.type}
            pattern={this.props.pattern}
            className={`
              textInput

            `}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={event => {
              if (event && event.target && this.props.pattern) {
                let re = new RegExp(this.props.pattern);
                if (!re.test(event.target.value)) {
                  this.setState({
                    errors: {
                      ...this.state.errors,
                      validation: this.props.validationMessage,
                    },
                  });
                  this.props.onError(true);
                } else {
                  this.setState({ errors: {} });
                  this.props.onError(false);
                }
              }
              this.props.onChange(event);
            }}
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
          <div className="errorWrapper">
            <span>
              {Object.keys(this.state.errors)
                .map(key => this.state.errors[key])
                .join(', ')}
            </span>
          </div>
        </div>
        <style jsx>
          {`
            input[type='number']::-webkit-inner-spin-button,
            input[type='number']::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            .container {
              display: flex;
              width: 100%;
              flex-direction: column;
            }
            .inputWrapper {
              position: relative;
              display: flex;
              min-height: ${styles.textInputHeight};
              flex-direction: column;
            }

            .errorWrapper {
              padding-top: 5px;
              color: ${styles.errorBorderColor};
              font-size: 1.2rem;
              width: 100%;
            }

            .textInput {
              width: 100%;
              outline: none;
              border-radius: ${styles.borderRadius};
              height: ${styles.textInputHeight};
              background-color: ${styles.textInputBgColor};
              padding-left: 16px;
              font-size: ${styles.placeholderFontSize};
              border: 2px solid;
              border-color: ${Object.keys(this.state.errors).length
                ? `${styles.errorBorderColor}`
                : `${styles.transparent}`};
              box-shadow: 0 0 1px #3d464d;
              box-sizing: border-box;
              transition: border 0.2s, box-shadow 0.2s;
            }
            .textInput:focus {
              border-color: ${Object.keys(this.state.errors).length
                ? `${styles.errorBorderColor}`
                : `${styles.primaryColor}`};
              box-shadow: 0 0 0 transparent;
            }
            .textInput::placeholder {
              line-height: ${styles.placeholderLineHeight};
              color: ${styles.placeholderTextColor};
            }
            .center {
              margin: auto;
            }
            .small {
              width: ${styles.smallWidth};
            }
            .medium {
              width: ${styles.mediumWidth};
            }
            .large {
              width: ${styles.largeWidth};
            }

            @media screen and (max-width: 768px) {
              .small {
                width: 100%;
              }
              .medium {
                width: 100%;
              }
              .large {
                width: 100%;
              }
            }

            .addBtn {
              position: absolute;
              margin-top: auto;
              margin-right: auto;
              top: 0;
              bottom: 0;
              right: 10px;
              cursor: pointer;
              background-color: ${styles.transparent};
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
