// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import Button from './Button';
import { IMAGE_URL } from '../utils/constants';

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
  onUpdateAccount: () => Rx.Observable,
}

const AccountDetail = (props: Props) => (
  <div>
    <div className="coverPhoto" />
    <p className="sellerId">{props.account.name}</p>
    <p className="sellerName">{props.account.name}</p>
    <div className="kitchenInfo">
      <div className="name">
        <div className="kitchenName">
          <span className="smallTitle">Kitchen Name</span>
          <span className="contentText">{props.account.kitchenName}</span>
        </div>
        <div className="userName">
          <span className="smallTitle">User Name</span>
          <span className="contentText">{props.account.name}</span>
        </div>
      </div>
      <div className="description">
        <span className="smallTitle">Kitchen Description</span>
        <p className="contentText">{props.account.kitchenDescription || ''}</p>
      </div>
      <div className="name">
        <div className="kitchenName">
          <span className="smallTitle">Phone Number</span>
          <span className="contentText">{props.account.phoneNumber}</span>
        </div>
        <div className="userName">
          <span className="smallTitle">Email Address</span>
          <span className="contentText">{props.account.email}</span>
        </div>
      </div>
      <div className="buttonGroup">
        <Button
          buttonStyle="primary"
          size="small"
          onClick={props.onUpdateAccount}
        >
          UPDATE
        </Button>
      </div>
    </div>
    <div className="additionalInfo">
      <p className="smallTitle">Bank Account</p>
      <div className="infoContent">
        <div className="left">
          <span className="contentText">000 000 0000</span>
        </div>
        <div className="right">
          <Button
            buttonStyle="primary"
            size="small"
            onClick={() => {}}
          >
            EDIT
          </Button>
        </div>
      </div>
    </div>
    <div className="additionalInfo">
      <p className="smallTitle">Password</p>
      <div className="infoContent">
        <div className="left">
          <span className="contentText">******</span>
        </div>
        <div className="right">
          <Button
            buttonStyle="primary"
            size="small"
            onClick={() => {}}
          >
            UPDATE
          </Button>
        </div>
      </div>
    </div>
    <style jsx>
      {`
        .coverPhoto {
          margin-bottom: 25px;
          width: 100%;
          height: 240px;
          background-image: url('${IMAGE_URL}/${props.account.coverPhoto || ''}'), url('../static/pancake.jpg');
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .coverPhoto:after {
          content: '';
          position: absolute;
          top: 200px;
          left: 20px;
          background-image: url('${IMAGE_URL}/${props.account.profileImage || ''}'), url('../static/avatar.jpg');
          background-size: cover;
          background-position: center;
          width: 80px;
          height: 80px;
          border-radius: 40px;
        }

        .sellerId {
          margin-left: 98px;
          margin-bottom: 11px;
          font-size: 24px;
          font-weight: 600;
          line-height: 0.83;
          letter-spacing: 0.6px;
          color: #4a4a4a;
        }

        .sellerName {
          margin-left: 101px;
          margin-bottom: 20px;
          font-size: 14px;
          line-height: 1.43;
          letter-spacing: 0.6px;
          color: #4a4a4a;
        }

        .kitchenInfo {
          display: flex;
          flex-direction: column;
          width: 552px;
          height: 524px;
          padding: 25px 20px;
          margin-left: 21px;
          margin-bottom: 16px;
          border-radius: 4px;
          background-color: #ffffff;
        }

        .name {
          display: flex;
          margin-bottom: 21px;
        }

        .smallTitle {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.14;
          letter-spacing: 0.6px;
          color: #9b9b9b;
        }
        .contentText {
          margin-top: 12px;
          font-size: 16px;
          font-weight: 500;
          line-height: 0.88;
          letter-spacing: 0.7px;
          color: #4a4a4a;
        }
        .kitchenName {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 70px;
          border-bottom: solid 2px #ececec;
        }

        .userName {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 70px;
          margin-left: 11px;
          border-bottom: solid 2px #ececec;
        }

        .description {
          display: flex;
          flex-direction: column;
          height: 123px;
          margin-bottom: 20px;
          border-bottom: solid 2px #ececec;
        }

        .buttonGroup {
          display: flex;
          justify-content: flex-end;
          margin-top: auto;
          margin-bottom: auto;
        }

        .additionalInfo {
          display: flex;
          flex-direction: column;
          width: 552px;
          padding: 24px 20px;
          margin-left: 21px;
          margin-bottom: 16px;
          border-radius: 4px;
          background-color: #ffffff;
        }

        .infoContent {
          display: flex;
          justify-content: space-between;
        }

        .left {
          width: 250px;
          height: 70px;
          border-bottom: solid 2px #ececec;
        }
      `}
    </style>
  </div>
);

export default AccountDetail;
