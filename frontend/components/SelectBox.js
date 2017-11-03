// @flow

import * as React from 'react';

import {
  fontSize,
  placeholderTextColor,
  whiteColor,
  borderRadius,
  primaryColor,
} from '../utils/styleVariables';

type Props = {
  options: Array<{
    text: string,
    value: string,
  }>,
  selectedValue: string,
  defaultText: string,
};

type State = {
  isOpenOptions: boolean,
}

class SelectBox extends React.Component<Props, State> {

  static defaultProps = {
    selectedValue: '',
    defaultText: '',
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      isOpenOptions: false,
    }
  }

  handleClick = () => {
    this.setState({ isOpenOptions: !this.state.isOpenOptions });
  };

  render() {
    const { selectedValue, defaultText, options } = this.props;
    const selectedOption = options.find(option => option.value === selectedValue);
    return (
      <div className="selectBoxWrapper">
        <button
          type="button"
          onClick={this.handleClick}
          className={`
            buttonWrapper
            ${this.state.isOpenOptions ? 'greyBorderBottom' : ''}
          `}
        >
          <span className="placeholder">{selectedOption ? selectedOption.text : defaultText}</span>
          <div className="dropdownIcon" />
        </button>
        <ul className={`
          optionWrapper
          ${!this.state.isOpenOptions ? 'closeOption' : ''}
        `}>
          {
            this.props.options.map(option => (
              <li className="optionStyle" value={option.value}>{option.text}</li>
            ))
          }
        </ul>
        <style jsx>
          {`
            .selectBoxWrapper {
              display: flex;
              flex-direction: column;
              width: 100%;
            }

            .buttonWrapper {
              outline: none;
              padding: 0;
              border: 0;
              height: 44px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              background-color: ${whiteColor};
              border: solid 1px #979797;
              border-top-left-radius: ${borderRadius};
              border-top-right-radius: ${borderRadius};
            }
            .greyBorderBottom {
              border-bottom-color: #ececec;
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

            .dropdownIcon:hover {
              background-image: url('../static/svg/dropdown_hover.svg');
            }
            .optionWrapper {
              list-style: none;
              margin: 0;
              border-bottom-left-radius: ${borderRadius};
              border-bottom-right-radius: ${borderRadius};
              border: solid 1px #979797;
              border-top: 0;
              padding-left: 18px;
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
            }

            .optionStyle:hover {
              color: ${primaryColor};
            }
          `}
        </style>
      </div >
    );
  }

}

export default SelectBox;
