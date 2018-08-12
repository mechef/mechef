// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import Button from './Button';
import { IMAGE_URL } from '../utils/constants';
import { pageStatus } from './AccountPage';
import type { AccountObject } from '../utils/flowTypes';

type Props = {
  account: AccountObject,
  onUpdate: (status: string) => Rx.Observable,
  t: (key: string) => string,
};

const AccountDetail = (props: Props) => (
  <div>
    <div className="coverPhoto" />
    <p className="sellerId">{props.account.name}</p>
    <p className="sellerName">{props.account.name}</p>
    <div className="kitchenInfo">
      <div className="name">
        <div className="kitchenName">
          <span className="smallTitle">
            {props.t('accountedit_kitchen_name_placeholder')}
          </span>
          <span className="contentText">{props.account.kitchenName}</span>
        </div>
        <div className="userName">
          <span className="smallTitle">{props.t('accountedit_user_name')}</span>
          <span className="contentText">{props.account.name}</span>
        </div>
      </div>
      <div className="description">
        <span className="smallTitle">
          {props.t('accountedit_kitchen_description')}
        </span>
        <p className="contentText">{props.account.kitchenDescription || ''}</p>
      </div>
      <div className="name">
        <div className="kitchenName">
          <span className="smallTitle">
            {props.t('accountedit_phone_number_placeholder')}
          </span>
          <span className="contentText">{props.account.phoneNumber}</span>
        </div>
        <div className="userName">
          <span className="smallTitle">
            {props.t('accountedit_email_address_placeholder')}
          </span>
          <span className="contentText">{props.account.email}</span>
        </div>
      </div>
      <div className="buttonGroup">
        <Button
          buttonStyle="primary"
          size="small"
          onClick={() => {
            props.onUpdate(pageStatus.UPDATE_ACCOUNT);
          }}
        >
          {props.t('accountpreview_button_update')}
        </Button>
      </div>
    </div>
    <div className="additionalInfo">
      <p className="smallTitle">{props.t('accountpreview_bank_account')}</p>
      <div className="infoContent">
        <div className="left">
          <span className="contentText">000 000 0000</span>
        </div>
        <div className="right">
          <Button
            buttonStyle="primary"
            size="small"
            onClick={() => {
              props.onUpdate(pageStatus.UPDATE_BANK_ACCOUNT);
            }}
          >
            {props.t('accountpreview_button_edit')}
          </Button>
        </div>
      </div>
    </div>
    <div className="additionalInfo">
      <p className="smallTitle">{props.t('accountpreview_password')}</p>
      <div className="infoContent">
        <div className="left">
          <span className="contentText">******</span>
        </div>
        <div className="right">
          <Button
            buttonStyle="primary"
            size="small"
            onClick={() => {
              props.onUpdate(pageStatus.UPDATE_PASSWORD);
            }}
          >
            {props.t('accountpreview_button_update')}
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
          background-image: url('${IMAGE_URL}/${
        props.account.coverPhoto
      }'), url('../static/pancake.jpg');
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .coverPhoto:after {
          content: '';
          position: absolute;
          top: 200px;
          left: 20px;
          background-image: url('${IMAGE_URL}/${
        props.account.profileImage
      }'), url('../static/avatar.jpg');
          background-size: cover;
          background-position: center;
          width: 80px;
          height: 80px;
          border-radius: 40px;
        }

        .sellerId {
          margin-left: 116px;
          margin-bottom: 11px;
          font-size: 2.4rem;
          font-weight: 600;
          line-height: 0.83;
          letter-spacing: 0.6px;
          color: #4a4a4a;
        }

        .sellerName {
          margin: 8px 0 20px 116px;
          font-size: 1.4rem;
          line-height: 1.43;
          letter-spacing: 0.6px;
          color: #4a4a4a;
        }

        .kitchenInfo {
          display: flex;
          flex-direction: column;
          width: 552px;
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
          font-size: 1.4rem;
          font-weight: 500;
          line-height: 1.14;
          letter-spacing: 0.6px;
          color: #9b9b9b;
        }
        .contentText {
          margin-top: 12px;
          font-size: 1.6rem;
          font-weight: 500;
          line-height: 0.88;
          letter-spacing: 0.7px;
          color: #4a4a4a;
        }
        .kitchenName {
          flex: 1;
          display: flex;
          flex-direction: column;
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
          border-bottom: solid 2px #ececec;
        }
      `}
    </style>
  </div>
);

export default AccountDetail;
