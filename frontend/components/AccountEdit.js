// @flow

import React from 'react';
import Rx from 'rxjs';

type Props = {
  account: {
    name?: string,
    kitchenName?: string,
    kitchenDescription?: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    coverPhoto?: string,
    profileImage?: string,
    update: {
      name?: string,
      kitchenName?: string,
      kitchenDescription?: string,
      firstName?: string,
      lastName?: string,
      phoneNumber?: string,
      coverPhoto?: File,
      profileImage?: File,
    },
  },
  onUpdateField: ({
    name?: string,
    kitchenName?: string,
    kitchenDescription?: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    coverPhoto?: File,
    profileImage?: File,
  }) => Rx.Observable,
  onSubmit: ({
    name?: string,
    kitchenName?: string,
    kitchenDescription?: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    coverPhoto?: File,
    profileImage?: File,
  }) => Rx.Observable,
  goback: any => Rx.Observable,
}

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
      this.coverPhotoImg.src = imgSrc;
      this.props.onUpdateField({ coverPhoto: file });
    }
  }

  handleProfileImageUpload(event: any) {
    const file = event.target.files[0];
    const imgSrc = window.URL.createObjectURL(file);
    if (this.profileImageThumbnail && imgSrc) {
      this.profileImageThumbnail.src = imgSrc;
      this.props.onUpdateField({ profileImage: file });
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
              ref={(input) => {
                this.coverPhoto = input;
              }}
              type="file"
              className="hidden"
              onChange={this.handleCoverPhotoUpload}
            />
            <img
              ref={(input) => {
                this.coverPhotoImg = input;
              }}
              className="coverPhoto"
              src="../static/pancake.jpg"
              alt="cover"
            />
            <div className="update-cover-photo__title">
              <i className="fa fa-camera update-cover-photo__icon" aria-hidden="true" />
              <span>
                Update your cover photo
              </span>
            </div>
          </div>
          <div className="update-profile-image">
            <input
              ref={(input) => {
                this.profileImage = input;
              }}
              type="file"
              className="hidden"
              onChange={this.handleProfileImageUpload}
            />
            <div
              role="button"
              tabIndex="-1"
              className="update-profile-image__avatar"
              onClick={() => {
                if (this.profileImage) {
                  this.profileImage.click();
                }
              }}
            >
              <img
                ref={(input) => {
                  this.profileImageThumbnail = input;
                }}
                className="profileImage"
                src="../static/avatar.jpg"
                alt="profile"
              />
              <i className="fa fa-camera update-profile-image__avatar-camera-icon" aria-hidden="true" />
            </div>
            <div className="update-profile-image__description">
              <span className="update-profile-image__description-title">Profile Image</span>
              <span className="update-profile-image__description-subtitle">Add Image Add Image Add Image</span>
            </div>
          </div>
          <div className="bank-info">
            <p className="bank-info__title">Kitchen Name*</p>
            <p className="bank-info__subtitle">Add Images Add Images Add Images</p>
            <input
              type="text"
              className="bank-info__input"
              value={this.props.account.kitchenName || ''}
              onChange={(evt) => { this.props.onUpdateField({ kitchenName: evt.target.value }); }}
            />
          </div>
          <div className="bank-info">
            <p className="bank-info__title">Kitchen Description*</p>
            <p className="bank-info__subtitle">Add Images Add Images Add Images</p>
            <textarea
              type="text"
              className="bank-info__text-area"
              value={this.props.account.kitchenDescription || ''}
              onChange={(evt) => {
                this.props.onUpdateField({ kitchenDescription: evt.target.value });
              }}
            />
          </div>
          <div className="bank-info">
            <p className="bank-info__title">User Name*</p>
            <p className="bank-info__subtitle">Add Images Add Images Add Images</p>
            <div className="inputGroup">
              <input
                type="text"
                className="bank-info__input smallSize"
                value={this.props.account.firstName || ''}
                onChange={(evt) => {
                  this.props.onUpdateField({ firstName: evt.target.value });
                }}
              />
              <input
                type="text"
                className="bank-info__input smallSize"
                value={this.props.account.lastName || ''}
                onChange={(evt) => {
                  this.props.onUpdateField({ lastName: evt.target.value });
                }}
              />
            </div>
          </div>
          <div className="two-div">
            <div className="left">
              <p className="bank-info__title">Phone Number*</p>
              <p className="bank-info__subtitle">Add Images Add Images Add Images</p>
              <input
                type="text"
                className="bank-info__input smallSize"
                value={this.props.account.phoneNumber || ''}
                onChange={(evt) => {
                  this.props.onUpdateField({ phoneNumber: evt.target.value });
                }}
              />
            </div>
            <div className="right">
              <p className="bank-info__title">Email Address*</p>
              <p className="bank-info__subtitle">Add Images Add Images Add Images</p>
              <input
                type="text"
                className="bank-info__input smallSize"
                value={this.props.account.email || ''}
                onChange={(evt) => {
                  this.props.onUpdateField({ email: evt.target.value });
                }}
              />
            </div>
          </div>
        </div>
        <div className="buttonGroup">
          <span
            role="button"
            tabIndex="-1"
            className="secondaryBtn"
            onClick={this.props.goback}
          >
            CANCLE
          </span>
          <span
            role="button"
            tabIndex="-1"
            className="primaryBtn"
            onClick={() => {
              this.props.onSubmit(this.props.account.update);
            }}
          >
            SAVE
          </span>
        </div>
        <style jsx>
          {`
            .dashboard-content {
              height: 100%;
              padding-top:20px;
              padding-left: 21px;
            }
            .dashboard-content__form {
              width: 552px;
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
            }

            .coverPhoto {
              height: 230px;
              width: 100%;
              position: absolute;
            }

            .update-cover-photo:before {
              content: '';
              height: 230px;
              width: 100%;
              background-color: rgba(0, 0, 0, .400);
              position: absolute;
              z-index: 1;
            }

            .update-cover-photo__title {
              font-size: 16px;
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
            }

            .profileImage {
              position: absolute;
              z-index: 1;
              width: 80px;
              height: 80px;
              border-radius: 40px;
            }

            .update-profile-image__avatar:after {
              position: absolute;
              z-index: 2;
              content: '';
              width: 80px;
              height: 80px;
              opacity: 0.7;
              background-color: rgba(0, 0, 0, .600);
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
              font-size: 16px;
              font-weight: 500;
              letter-spacing: 0.7px;
              color: #4a4a4a;
              padding-bottom: 12px;
            }

            .update-profile-image__description-subtitle {
              font-size: 14px;
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
              font-size: 16px;
              font-weight: 500;
              line-height: 1;
              letter-spacing: 0.7px;
              text-align: left;
              color: #4a4a4a;
            }

            .bank-info__subtitle {
              font-family: AvenirNext;
              font-size: 14px;
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
              width: 512px;
              border-radius: 4px;
              border: solid 1px #979797;
            }

            .buttonGroup {
              display: flex;
              justify-content: flex-end;
              width: 552px;
              margin-bottom: 100px;
              cursor: pointer;
            }

            .secondaryBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 150px;
              height: 50px;
              border-radius: 4px;
              border: solid 1px #3e9f40;
              margin-left: 12px;
              color: #3e9f40;
            }

            .secondaryBtn:hover, .secondaryBtn:active {
              background-color: #3f9f40;
              color: #ffffff;
            }

            .primaryBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 150px;
              height: 50px;
              border-radius: 4px;
              background-color: #3e9f40;
              margin-left: 12px;
              color: #ffffff;
            }

            .primaryBtn:hover, .primaryBtn:active {
              background-color: #367d36;
            }

            .inputGroup {
              display: flex;
              justify-content: space-between;
            }

            .smallSize {
              width: 250px;
              height: 50px;
            }

            .two-div {
              display: flex;
              justify-content: space-between;
              padding: 0 20px 30px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default AccountEdit;
