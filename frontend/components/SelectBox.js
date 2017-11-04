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
  onChange: (selectedValue: string) => mixed,
};

type State = {
  isOpenOptions: boolean,
  selectedValue: string,
}

class SelectBox extends React.Component<Props, State> {

  static defaultProps = {
    selectedValue: '',
    defaultText: '',
    onChange: () => {},
  }

  box: ?HTMLDivElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      isOpenOptions: false,
      selectedValue: props.selectedValue,
    }
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
    });
  }

  handleClick = () => {
    this.setState({ isOpenOptions: !this.state.isOpenOptions });
  };

  handleClickOutside = (e: any) => {
    if (this.box && !this.box.contains(e.target)) {
      this.setState({ isOpenOptions: false });
    }
  };

  render() {
    const { defaultText, options } = this.props;
    const { selectedValue } = this.state;
    const selectedOption = options.find(option => option.value === selectedValue);
    return (
      <div
        ref={(box) => { this.box = box; }}
        className="selectBoxWrapper"
      >
        <button
          type="button"
          onClick={this.handleClick}
          className={`
            buttonWrapper
            ${this.state.isOpenOptions ? 'greyBorderBottom' : ''}
          `}
        >
          <span className={`placeholder ${selectedOption ? 'selectedStyle' : ''}`}>
            {selectedOption ? selectedOption.text : defaultText}
          </span>
          <div className="dropdownIcon" />
        </button>
        <ul className={`
          optionWrapper
          ${!this.state.isOpenOptions ? 'closeOption' : ''}
        `}>
          {
            this.props.options.map(option => (
              <li
                key={option.value}
                className={`
                  optionStyle
                  ${option.value === selectedValue ? 'selectedStyle' : ''}
                `}
                value={option.value}
                onClick={() => { this.handleChange(option.value); }}
              >
                {option.text}
              </li>
            ))
          }
        </ul>
        <style jsx>
          {`
            .selectBoxWrapper {
              display: flex;
              flex-direction: column;
              width: 100%;
              position: relative;
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
              border-radius: ${borderRadius};
              cursor: pointer;
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
              border: solid 1px #979797;
              border-top: 0;
              padding: 0;
              height: 144px;
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
              color: ${primaryColor};
            }
          `}
        </style>
      </div >
    );
  }

}

export default SelectBox;
