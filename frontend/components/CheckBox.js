// @flow

import * as React from 'react';

import {
  primaryColor
} from '../utils/styleVariables';

type Props = {
  children: React.Node,
  checked: boolean,
  onChange: (isChecked: boolean) => mixed,
};

type State = {
  isChecked: boolean,
}

class CheckBox extends React.Component<Props, State> {

  static defaultProps = {
    children: '',
    checked: false,
    onChange: () => { },
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      isChecked: props.checked,
    }
  }

  componentWillReceiveProps(newProps: Props) {
    this.setState({
      isChecked: newProps.checked,
    })
  }

  handleChange = () => {
    this.props.onChange(!this.state.isChecked);
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }

  render() {
    return (
      <div className="checkboxContainer">
        <button type="button" onClick={this.handleChange} className={this.state.isChecked ? 'checkedIcon' : 'uncheckedIcon'} />
        <div className="checkboxLabel">{this.props.children}</div>
        <style jsx>
          {`
            .checkboxContainer {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 116px;
            }

            button {
              outline: none;
              border: 0;
              border-radius: 4px;
              cursor: pointer;
            }

            .checkboxInput {
              display: none;
              background-color: ${primaryColor};
            }

            .checkedIcon {
              width: 20px;
              height: 20px;
              background-image: url('../static/svg/checkbox.svg');
            }

            .uncheckedIcon {
              width: 20px;
              height: 20px;
              background-image: url('../static/svg/checkbox_grey.svg');
            }

            .checkboxLabel {
              font-weight: 400;
              width: 84px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default CheckBox;
