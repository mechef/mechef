// @flow

import React from 'react';
import Rx from 'rxjs/Rx';
import { translate } from 'react-i18next';
import i18n from '../i18n';
import { connect } from '../state/RxState';
import accountActions from '../actions/accountActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import Modal from './Modal';
import AccountDetail from './AccountDetail';
import AccountEdit from './AccountEdit';
import UpdateBankAccount from './UpdateBankAccount';
import UpdatePassword from './UpdatePassword';
import DashboardContentLayout from './DashboardContentLayout';
import type { AccountObject } from '../utils/flowTypes';

type Props = {
  t: (key: string) => string,
  currentAccount: AccountObject,
  updatedFields: AccountObject,
  fetchAccountDetail$: any => Rx.Observable,
  updateAccountDetail$: (account: AccountObject) => Rx.Observable,
  setFields$: (account: AccountObject) => Rx.Observable,
  createCoverPhoto$: File => Rx.Observable,
  createProfileImage$: File => Rx.Observable,
  setError$: ({
    isShowModal: boolean,
    title: string,
    message: string,
  }) => Rx.Observable,
  error: {
    title: string,
    message: string,
    isShowModal: boolean,
  },
  global: {
    backArrow: {
      isShow: boolean,
      title: string,
    },
  },
  toggleBackArrow$: string => Rx.Observable,
};

type State = {
  pageStatus: string,
};

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
      currentAccount,
      updatedFields,
      setError$,
      error,
      global: { backArrow },
      updateAccountDetail$,
      setFields$,
      createCoverPhoto$,
      createProfileImage$,
      toggleBackArrow$,
    } = this.props;
    const account = { ...currentAccount, ...updatedFields };
    return (
      <DashboardContentLayout>
        {error.isShowModal ? (
          <Modal
            title={error.title}
            message={error.message}
            onCancel={() =>
              setError$({ isShowModal: false, title: '', message: '' })
            }
          />
        ) : null}
        {/* eslint-disable no-nested-ternary */
        backArrow.isShow ? (
          this.state.pageStatus === pageStatus.UPDATE_ACCOUNT ? (
            <AccountEdit
              account={account}
              onUpdateCoverPhoto={createCoverPhoto$}
              onUpdateProfileImage={createProfileImage$}
              onSubmit={() => updateAccountDetail$(updatedFields)}
              onUpdateField={setFields$}
              goback={() => toggleBackArrow$('')}
              t={this.props.t}
            />
          ) : this.state.pageStatus === pageStatus.UPDATE_BANK_ACCOUNT ? (
            <UpdateBankAccount
              account={account}
              goback={() => toggleBackArrow$('')}
              onSubmit={updateAccountDetail$}
              t={this.props.t}
            />
          ) : (
            <UpdatePassword
              account={account}
              goback={() => toggleBackArrow$('')}
              onSubmit={updateAccountDetail$}
              t={this.props.t}
            />
          )
        ) : (
          <AccountDetail
            account={account}
            onUpdate={status => {
              toggleBackArrow$(pageStatus[status]);
              this.setState({
                pageStatus: status,
              });
            }}
            t={this.props.t}
          />
        )
        /* eslint-enable no-nested-ternary */
        }
        <style jsx>{``}</style>
      </DashboardContentLayout>
    );
  }
}

const stateSelector = ({ account, error, global }) => ({
  currentAccount: account.currentAccount,
  updatedFields: account.updatedFields,
  error,
  global,
});

const actionSubjects = {
  ...errorActions,
  ...accountActions,
  ...globalActions,
};

const Extended = translate(['common'], {
  i18n,
  wait: typeof window !== 'undefined',
})(AccountPage);

export default connect(
  stateSelector,
  actionSubjects,
)(Extended);
