// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import { connect } from '../state/RxState';
import accountActions from '../actions/accountActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import ErrorModal from './ErrorModal';
import AccountDetail from './AccountDetail';
import AccountEdit from './AccountEdit';

type Props = {
  account: {
    name?: string,
    kitchenName?: string,
    kitchenDescription?: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    email?: string,
    coverPhoto?: string,
    profileImage?: string,
    update: {
      name?: string,
      kitchenName?: string,
      kitchenDescription?: string,
      firstName?: string,
      lastName?: string,
      phoneNumber?: string,
      email?: string,
      coverPhoto?: File,
      profileImage?: File,
    },
  },
  fetchAccountDetail$: any => Rx.Observable,
  updateAccountDetail$: ({
    name?: string,
    kitchenName?: string,
    kitchenDescription?: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    email?: string,
    coverPhoto?: File,
    profileImage?: File,
  }) => Rx.Observable,
  setField$: any => Rx.Observable,
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

export class AccountPage extends React.Component<Props> {
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
      setField$,
      toggleBackArrow$,
    } = this.props;
    return (
      <div className="accountContainer">
        {
          error.isShowModal ?
            <ErrorModal
              title={error.title}
              message={error.message}
              onCancel={() => setError$({ isShowModal: false, title: '', message: '' })}
            />
            : null
        }
        {
          backArrow.isShow ?
            <AccountEdit
              account={account}
              onUpdateField={setField$}
              onSubmit={updateAccountDetail$}
              goback={() => toggleBackArrow$('')}
            />
            :
            <AccountDetail
              account={account}
              onUpdateAccount={() => {
                toggleBackArrow$('EDIT ACCOUNT');
              }}
            />
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
