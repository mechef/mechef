// @flow

import React from 'react';
import Rx from 'rxjs';

import { connect } from '../state/RxState';
import accountActions from '../actions/accountActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import ErrorModal from './ErrorModal';
import AccountDetail from './AccountDetail';
import AccountEdit from './AccountEdit';

type Props = {
  account: {
    name: string,
    kitchenDescription: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    coverPhoto: string,
    profileImage: string,
  },
  fetchAccountDetail$: any => Rx.Observable,
  updateAccountDetail$: ({
    name?: string,
    kitchenDescription?: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    coverPhoto?: string,
    profileImage?: string,
  }) => Rx.Observable,
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

class AccountPage extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchAccountDetail$();
  }
  render() {
    const {
      account,
      setError$,
      error,
      global: { backArrow },
      fetchAccountDetail$,
      updateAccountDetail$,
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
            <AccountEdit />
            :
            <AccountDetail
              account={account}
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
