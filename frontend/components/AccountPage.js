// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import { connect } from '../state/RxState';
import accountActions from '../actions/accountActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import Modal from './Modal';
import AccountDetail from './AccountDetail';
import AccountEdit from './AccountEdit';
import UpdateBankAccount from './UpdateBankAccount';
import UpdatePassword from './UpdatePassword';
import { AccountObject } from '../utils/flowTypes';

type Props = {
  account: AccountObject,
  fetchAccountDetail$: any => Rx.Observable,
  updateAccountDetail$: ({ account: AccountObject }) => Rx.Observable,
  setFields$: ({
    name?: string,
    kitchenName?: string,
    kitchenDescription?: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    email?: string,
  }) => Rx.Observable,
  createCoverPhoto$: File => Rx.Observable,
  createProfileImage$: File => Rx.Observable,
  setError$: ({ isShowModal: boolean, title: string, message: string }) => Rx.Observable,
  error: {
    title: string,
    message: string,
    isShowModal: bool,
  },
  global: {
    backArrow: {
      isShow: boolean,
      title: string,
    },
  },
  toggleBackArrow$: string => Rx.Observable,
}

type State = {
  pageStatus: string,
}

export const pageStatus = {
  UPDATE_ACCOUNT: 'EDIT ACCOUNT',
  UPDATE_PASSWORD: 'UPDATE PASSWORD',
  UPDATE_BANK_ACCOUNT: 'UPDATE BANK ACCOUNT',
};

export class AccountPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pageStatus: '',
    };
  }
  componentDidMount() {
    this.props.fetchAccountDetail$();
  }
  render() {
    const {
      account,
      setError$,
      error,
      global: { backArrow },
      updateAccountDetail$,
      setFields$,
      createCoverPhoto$,
      createProfileImage$,
      toggleBackArrow$,
    } = this.props;
    return (
      <div className="accountContainer">
        {
          error.isShowModal ?
            <Modal
              title={error.title}
              message={error.message}
              onCancel={() => setError$({ isShowModal: false, title: '', message: '' })}
            />
            : null
        }
        {
          /* eslint-disable no-nested-ternary */
          backArrow.isShow ?
            this.state.pageStatus === pageStatus.UPDATE_ACCOUNT ?
              <AccountEdit
                account={account}
                onUpdateCoverPhoto={createCoverPhoto$}
                onUpdateProfileImage={createProfileImage$}
                onSubmit={updateAccountDetail$}
                onUpdateField={setFields$}
                goback={() => toggleBackArrow$('')}
              />
              : this.state.pageStatus === pageStatus.UPDATE_BANK_ACCOUNT ?
                <UpdateBankAccount
                  account={account}
                  goback={() => toggleBackArrow$('')}
                  onSubmit={updateAccountDetail$}
                />
                :
                <UpdatePassword
                  account={account}
                  goback={() => toggleBackArrow$('')}
                  onSubmit={updateAccountDetail$}
                />
            : <AccountDetail
              account={account}
              onUpdate={(status) => {
                toggleBackArrow$(pageStatus[status]);
                this.setState({
                  pageStatus: status,
                });
              }}
            />
          /* eslint-enable no-nested-ternary */
        }
        <style jsx>
          {`
            .accountContainer {
              background-color: #f8f7f7;
            }
          `}
        </style>
      </div>
    );
  }
}


const stateSelector = ({ account, error, global }) => ({ account, error, global });

const actionSubjects = {
  ...errorActions,
  ...accountActions,
  ...globalActions,
};

export default connect(stateSelector, actionSubjects)(AccountPage);
