// @flow

import * as React from 'react';

import {
  fontSize,
  placeholderTextColor,
  whiteColor,
  borderRadius,
  primaryColor,
  errorBorderColor,
  transparent,
  textColor,
} from '../utils/styleVariables';

type Props = {
  options: Array<{
    text: any,
    value: string,
  }>,
  selectedValue: string | number,
  defaultText: any,
  onChange: (selectedValue: string | number) => mixed,
  onError: (isError: boolean) => void,
  isRequired: boolean,
};

type State = {
  isOpenOptions: boolean,
  selectedValue: string | number,
  errors: { [string]: string },
};

class SelectBox extends React.Component<Props, State> {
  static defaultProps = {
    selectedValue: '',
    defaultText: '',
    onChange: () => {},
    onError: () => {},
    isRequired: false,
  };

  box: ?HTMLDivElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      isOpenOptions: false,
      selectedValue: props.selectedValue,
      errors: {},
    };
  }

  componentWillReceiveProps(newProps: Props) {
    this.setState({
      selectedValue: newProps.selectedValue,
    });
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  handleChange = (selectedValue: string) => {
    this.props.onChange(selectedValue);
    this.setState({
      isOpenOptions: false,
      selectedValue,
      errors: {},
    });
  };

  handleClick = () => {
    this.setState({ isOpenOptions: !this.state.isOpenOptions });
  };

  handleClickOutside = (e: any) => {
    if (this.state.isOpenOptions && this.box && !this.box.contains(e.target)) {
      this.setState({ isOpenOptions: false });
      if (this.props.isRequired && !this.state.selectedValue) {
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
    }
  };

  render() {
    const { defaultText, options } = this.props;
    const { selectedValue } = this.state;
    const selectedOption = options.find(
      option => option.value === selectedValue,
    );
    return (
      <div>
        <div
          ref={box => {
            this.box = box;
          }}
          className="selectBoxWrapper"
        >
          <button
            type="button"
            onClick={this.handleClick}
            className={`
              buttonWrapper
              ${Object.keys(this.state.errors).length ? 'errorBorder' : ''}
              ${this.state.isOpenOptions ? 'openOption greyBorderBottom' : ''}
            `}
          >
            <span
              className={`placeholder ${selectedOption ? 'selectedStyle' : ''}`}
            >
              {selectedOption ? selectedOption.text : defaultText}
            </span>
            <div className="dropdownIcon" />
          </button>
          <ul
            className={`
            optionWrapper
            ${Object.keys(this.state.errors).length ? 'errorBorder' : ''}
            ${this.state.isOpenOptions ? 'openOption' : 'closeOption'}
          `}
          >
            {this.props.options.map(option => (
              <li
                key={option.value}
                className={`
                    optionStyle
                    ${option.value === selectedValue ? 'selectedStyle' : ''}
                  `}
                value={option.value}
                onClick={() => {
                  this.handleChange(option.value);
                }}
              >
                {option.text}
              </li>
            ))}
          </ul>
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
            .selectBoxWrapper {
              display: flex;
              flex-direction: column;
              width: 100%;
              position: relative;
            }

            .errorWrapper {
              padding-top: 5px;
              color: ${errorBorderColor};
              font-size: 1.2rem;
            }

            .buttonWrapper {
              outline: none;
              padding: 0;
              border: 0;
              height: 50px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              background-color: ${whiteColor};
              border: 1px solid;
              border-color: #ececec;
              border-radius: ${borderRadius};
              cursor: pointer;
              box-sizing: border-box;
            }

            .errorBorder {
              border-color: ${errorBorderColor};
            }

            .openOption {
              border-color: ${primaryColor};
            }

            .closeOption {
              border-color: '#ececec';
            }

            .greyBorderBottom {
              border-bottom-color: #ececec;
              border-bottom-right-radius: 0;
              border-bottom-left-radius: 0;
            }
            .placeholder {
              margin-left: 18px;
              height: 17px;
              font-size: ${fontSize};
              color: ${placeholderTextColor};
              letter-spacing: 0.6px;
            }
            .dropdownIcon {
              width: 14px;
              height: 7px;
              background-image: url('../static/svg/dropdown.svg');
              cursor: pointer;
              margin-right: 20px;
            }

            .buttonWrapper:hover .dropdownIcon {
              background-image: url('../static/svg/dropdown_hover.svg');
            }
            .optionWrapper {
              position: absolute;
              top: 44px;
              width: 100%;
              z-index: 2;
              list-style: none;
              margin: 0;
              border-bottom-left-radius: ${borderRadius};
              border-bottom-right-radius: ${borderRadius};
              border-width: 1px;
              border-style: solid;
              border-top: 0;
              padding: 0;
              max-height: 144px;
              overflow: scroll;
              box-sizing: border-box;
              background-color: ${whiteColor};
            }
            .closeOption {
              display: none;
            }
            .optionStyle {
              display: flex;
              align-items: center;
              height: 42px;
              font-size: ${fontSize};
              color: ${placeholderTextColor};
              letter-spacing: 0.6px;
              cursor: pointer;
              padding-left: 18px;
            }

            .optionStyle:hover {
              color: ${primaryColor};
            }

            .selectedStyle {
              color: ${textColor};
            }
          `}
        </style>
      </div>
    );
  }
}

export default SelectBox;
