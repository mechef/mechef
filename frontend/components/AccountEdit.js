// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import Button from './Button';
import TextAreaInput from './TextAreaInput';
import TextInput from './TextInput';
import { IMAGE_URL } from '../utils/constants';
import type { AccountObject } from '../utils/flowTypes';

type Props = {
  t: (key: string) => string,
  account: AccountObject,
  onUpdateCoverPhoto: File => Rx.Observable,
  onUpdateProfileImage: File => Rx.Observable,
  onSubmit: () => Rx.Observable,
  onUpdateField: (account: AccountObject) => Rx.Observable,
  goback: any => Rx.Observable,
};

class AccountEdit extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleCoverPhotoUpload = this.handleCoverPhotoUpload.bind(this);
    this.handleProfileImageUpload = this.handleProfileImageUpload.bind(this);
  }

  handleCoverPhotoUpload: Function;
  handleProfileImageUpload: Function;
  coverPhoto: ?HTMLInputElement;
  profileImage: ?HTMLInputElement;
  coverPhotoImg: ?HTMLImageElement;
  profileImageThumbnail: ?HTMLImageElement;

  handleCoverPhotoUpload(event: any) {
    const file = event.target.files[0];
    const imgSrc = window.URL.createObjectURL(file);
    if (this.coverPhotoImg && imgSrc) {
      this.props.onUpdateCoverPhoto(file);
    }
  }

  handleProfileImageUpload(event: any) {
    const file = event.target.files[0];
    const imgSrc = window.URL.createObjectURL(file);
    if (this.profileImageThumbnail && imgSrc) {
      this.props.onUpdateProfileImage(file);
    }
  }

  render() {
    return (
      <div className="dashboard-content">
        <div className="dashboard-content__form">
          <div
            role="button"
            tabIndex="-1"
            className="update-cover-photo"
            onClick={() => {
              if (this.coverPhoto) {
                this.coverPhoto.click();
              }
            }}
          >
            <input
              ref={input => {
                this.coverPhoto = input;
              }}
              type="file"
              className="hidden"
              onChange={this.handleCoverPhotoUpload}
            />
            <img
              ref={input => {
                this.coverPhotoImg = input;
              }}
              className="coverPhoto"
              src={
                this.props.account.coverPhoto
                  ? `${IMAGE_URL}/${this.props.account.coverPhoto}`
                  : '../static/img/pancake.jpg'
              }
              alt="cover"
            />
            <div className="update-cover-photo__title">
              <i
                className="fa fa-camera update-cover-photo__icon"
                aria-hidden="true"
              />
              <span>{this.props.t('accountedit_update_cover_photo')}</span>
            </div>
          </div>
          <div className="update-profile-image">
            <input
              ref={input => {
                this.profileImage = input;
              }}
              type="file"
              className="hidden"
              onChange={this.handleProfileImageUpload}
            />
            <button
              className="update-profile-image__avatar"
              onClick={() => {
                if (this.profileImage) {
                  this.profileImage.click();
                }
              }}
            >
              <img
                ref={input => {
                  this.profileImageThumbnail = input;
                }}
                className="profileImage"
                src={
                  this.props.account.profileImage
                    ? `${IMAGE_URL}/${this.props.account.profileImage}`
                    : '../static/img/avatar.jpg'
                }
                alt="profile"
              />
              <i
                className="fa fa-camera update-profile-image__avatar-camera-icon"
                aria-hidden="true"
              />
            </button>
            <div className="update-profile-image__description">
              <span className="update-profile-image__description-title">
                Profile Image
              </span>
              <span className="update-profile-image__description-subtitle">
                Add Image Add Image Add Image
              </span>
            </div>
          </div>
          <div className="bank-info">
            <p className="bank-info__title">
              {this.props.t('accountpreview_kitchen_name')}
            </p>
            <p className="bank-info__subtitle">
              Add Images Add Images Add Images
            </p>
            <TextInput
              type="text"
              placeholder="Enter Kitchen Name"
              size="large"
              value={this.props.account.kitchenName}
              onChange={event => {
                if (event && event.currentTarget) {
                  this.props.onUpdateField({
                    kitchenName: event.currentTarget.value,
                  });
                }
              }}
            />
          </div>
          <div className="bank-info">
            <p className="bank-info__title">
              {this.props.t('accountpreview_kitechen_description')}
            </p>
            <p className="bank-info__subtitle">
              Add Images Add Images Add Images
            </p>
            <TextAreaInput
              placeholder="Write some description about your kitchen...."
              value={this.props.account.kitchenDescription}
              onChange={evt => {
                if (evt && evt.currentTarget) {
                  this.props.onUpdateField({
                    kitchenDescription: evt.currentTarget.value,
                  });
                }
              }}
            />
          </div>
          <div className="bank-info">
            <p className="bank-info__title">
              {this.props.t('accountpreview_user_name')}
            </p>
            <p className="bank-info__subtitle">
              Add Images Add Images Add Images
            </p>
            <div className="inputGroup">
              <div className="inputWithPadding">
                <TextInput
                  type="text"
                  placeholder="Enter Kitchen Name"
                  size="small"
                  value={this.props.account.firstName}
                  onChange={event => {
                    if (event && event.currentTarget) {
                      this.props.onUpdateField({
                        firstName: event.currentTarget.value,
                      });
                    }
                  }}
                />
              </div>
              <div className="inputWithPadding">
                <TextInput
                  type="text"
                  placeholder="Enter Kitchen Name"
                  size="small"
                  value={this.props.account.lastName}
                  onChange={event => {
                    if (event && event.currentTarget) {
                      this.props.onUpdateField({
                        lastName: event.currentTarget.value,
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="two-div">
            <div className="left">
              <p className="bank-info__title">
                {this.props.t('accountpreview_mobile_number')}
              </p>
              <p className="bank-info__subtitle">
                Add Images Add Images Add Images
              </p>
              <div className="inputWithPadding">
                <TextInput
                  type="text"
                  placeholder="Enter Kitchen Name"
                  size="small"
                  value={this.props.account.phoneNumber}
                  onChange={event => {
                    if (event && event.currentTarget) {
                      this.props.onUpdateField({
                        phoneNumber: event.currentTarget.value,
                      });
                    }
                  }}
                />
              </div>
            </div>
            <div className="right">
              <p className="bank-info__title">
                {this.props.t('accountpreview_email')}
              </p>
              <p className="bank-info__subtitle">
                Add Images Add Images Add Images
              </p>
              <div className="inputWithPadding">
                <TextInput
                  type="text"
                  placeholder="Enter Kitchen Name"
                  size="small"
                  value={this.props.account.email}
                  onChange={event => {
                    if (event && event.currentTarget) {
                      this.props.onUpdateField({
                        email: event.currentTarget.value,
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="buttonGroup">
          <div>
            <Button
              buttonStyle="greenBorderOnly"
              size="small"
              onClick={this.props.goback}
            >
              {this.props.t('accountedit_button_cancel')}
            </Button>
          </div>
          <div>
            <Button
              buttonStyle="primary"
              size="small"
              onClick={this.props.onSubmit}
            >
              {this.props.t('accountedit_button_save')}
            </Button>
          </div>
        </div>
        <style jsx>
          {`
            .dashboard-content {
              height: 100%;
              padding: 20px;
            }
            .dashboard-content__form {
              max-width: 552px;
              width: 100%;
              border-radius: 4px;
              background-color: #ffffff;
              margin-bottom: 30px;
            }

            .hidden {
              display: none;
            }

            .update-cover-photo {
              height: 230px;
              position: relative;
              display: flex;
              cursor: pointer;
              outline: none;
            }

            .coverPhoto {
              height: 230px;
              width: 100%;
              position: absolute;
              object-fit: cover;
            }

            .update-cover-photo:before {
              content: '';
              height: 230px;
              width: 100%;
              background-color: rgba(0, 0, 0, 0.4);
              position: absolute;
              z-index: 1;
              border-radius: 4px 4px 0 0;
            }

            .update-cover-photo__title {
              font-size: 1.6rem;
              font-weight: 500;
              letter-spacing: 0.7px;
              color: #ffffff;
              position: relative;
              z-index: 2;
              margin: auto;
              display: flex;
              flex-direction: column;
            }

            .update-cover-photo__icon {
              text-align: center;
              padding-bottom: 19px;
            }

            .update-profile-image {
              padding-top: 32px;
              padding-left: 21px;
              margin-bottom: 49px;
              display: flex;
              position: relative;
            }

            .update-profile-image__avatar {
              display: flex;
              position: relative;
              width: 80px;
              height: 80px;
              border-radius: 40px;
              outline: none;
              padding: 0;
              border: 0;
              cursor: pointer;
            }

            .profileImage {
              position: absolute;
              z-index: 1;
              width: 80px;
              height: 80px;
              border-radius: 40px;
              top: 0;
              left: 0;
              object-fit: cover;
            }

            .update-profile-image__avatar:after {
              position: absolute;
              z-index: 2;
              content: '';
              width: 80px;
              height: 80px;
              top: 0;
              left: 0;
              opacity: 0.7;
              background-color: rgba(0, 0, 0, 0.6);
              border-radius: 40px;
            }

            .update-profile-image__avatar-camera-icon {
              position: relative;
              z-index: 3;
              margin: auto;
              color: #ffffff;
            }

            .update-profile-image__description {
              display: flex;
              flex-direction: column;
              padding-left: 30px;
              justify-content: center;
            }

            .update-profile-image__description-title {
              font-size: 1.6rem;
              font-weight: 500;
              letter-spacing: 0.7px;
              color: #4a4a4a;
              padding-bottom: 12px;
            }

            .update-profile-image__description-subtitle {
              font-size: 1.4rem;
              font-weight: 500;
              line-height: 1;
              letter-spacing: 0.6px;
              color: #9b9b9b;
            }

            .bank-info {
              margin-bottom: 30px;
              padding-left: 20px;
              padding-right: 20px;
            }

            .bank-info__title {
              font-size: 1.6rem;
              font-weight: 500;
              line-height: 1;
              letter-spacing: 0.7px;
              text-align: left;
              color: #4a4a4a;
            }

            .bank-info__subtitle {
              font-size: 1.4rem;
              font-weight: 500;
              line-height: 1;
              letter-spacing: 0.6px;
              text-align: left;
              color: #9b9b9b;
            }

            .bank-info__input {
              width: 512px;
              height: 50px;
              border-radius: 4px;
              background-color: #ffffff;
              border: solid 1px #979797;
            }

            .bank-info__text-area {
              height: 100px;
              width: 533px;
              border-radius: 4px;
              border: solid 1px #979797;
            }

            .buttonGroup {
              display: flex;
              justify-content: flex-end;
              max-width: 552px;
              width: 100%:
              margin-bottom: 100px;
              cursor: pointer;
            }

            .buttonGroup div {
              margin-left: 10px;
            }

            .inputGroup {
              display: flex;
              justify-content: space-between;
              max-width: 539px;
              width: 100%;
            }
            .inputWithPadding {
              padding-left: 5px;
              padding-right: 5px;
            }
            .smallSize {
              width: 250px;
              height: 50px;
            }

            .two-div {
              display: flex;
              justify-content: space-between;
              padding: 0 20px 30px;
              max-width: 539px;
              width: 100%;
              box-sizing: border-box;
            }
          `}
        </style>
      </div>
    );
  }
}

export default AccountEdit;
