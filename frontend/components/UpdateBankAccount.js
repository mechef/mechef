// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import Button from './Button';
import type { AccountObject } from '../utils/flowTypes';

type Props = {
  account: AccountObject,
  onSubmit: (account: AccountObject) => Rx.Observable,
  goback: any => Rx.Observable,
  t: (key: string) => string,
};

type State = {
  name: string,
  kitchenName: string,
  kitchenDescription: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  coverPhoto: string,
  profileImage: string,
};
// TODO: Implement the detail of this component
class UpdateBankAccount extends React.Component<Props, State> {
  static defaultProps = {
    account: {
      name: '',
      kitchenName: '',
      kitchenDescription: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      coverPhoto: '',
      profileImage: '',
    },
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      ...props.account,
    };
  }

  render() {
    return (
      <div className="dashboard-content">
        <div className="buttonGroup">
          <div>
            <Button
              buttonStyle="greenBorderOnly"
              size="small"
              onClick={this.props.goback}
            >
              {this.props.t('accountupdatepw_button_cancel')}
            </Button>
          </div>
          <div>
            <Button
              buttonStyle="primary"
              size="small"
              onClick={() => {
                this.props.onSubmit({
                  ...this.state,
                });
              }}
            >
              {this.props.t('accountupdatepw_button_save')}
            </Button>
          </div>
        </div>
        <style jsx>
          {`
            .dashboard-content {
              height: 100%;
              padding-top: 20px;
              padding-left: 21px;
            }
            .dashboard-content__form {
              width: 800px;
              border-radius: 4px;
              background-color: #ffffff;
              margin-bottom: 30px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default UpdateBankAccount;
