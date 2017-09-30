const AccountEdit = props => (
  <div className="dashboard-content">
    <div className="dashboard-content__form">
      <div className="update-cover-photo">
        <div className="update-cover-photo__title">
          <i className="fa fa-camera update-cover-photo__icon" aria-hidden="true" />
          <span>
            Update your cover photo
          </span>
        </div>
      </div>
      <div className="update-profile-image">
        <div className="update-profile-image__avatar">
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
        <input type="text" className="bank-info__input" />
      </div>
      <div className="bank-info">
        <p className="bank-info__title">Kitchen Description*</p>
        <p className="bank-info__subtitle">Add Images Add Images Add Images</p>
        <textarea type="text" className="bank-info__text-area" />
      </div>
      <div className="bank-info">
        <p className="bank-info__title">User Name*</p>
        <p className="bank-info__subtitle">Add Images Add Images Add Images</p>
        <div className="inputGroup">
          <input type="text" className="bank-info__input smallSize" />
          <input type="text" className="bank-info__input smallSize" />
        </div>
      </div>
      <div className="two-div">
        <div className="left">
          <p className="bank-info__title">Phone Number*</p>
          <p className="bank-info__subtitle">Add Images Add Images Add Images</p>
          <input type="text" className="bank-info__input smallSize" />
        </div>
        <div className="right">
          <p className="bank-info__title">Email Address*</p>
          <p className="bank-info__subtitle">Add Images Add Images Add Images</p>
          <input type="text" className="bank-info__input smallSize" />
        </div>
      </div>
    </div>
    <div className="buttonGroup">
      <span className="secondaryBtn">
        CANCLE
      </span>
      <span className="primaryBtn">
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

        .update-cover-photo {
          height: 230px;
          background-image: url('../static/pancake.jpg');
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
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
          width: 80px;
          height: 80px;
          opacity: 0.7;
          background-color: rgba(0, 0, 0, .400);
          border-radius: 40px;
          display: flex;
          background-image: url('../static/avatar.jpg');
          background-size: cover;
          background-position: center;
        }

        .update-profile-image__avatar:before {
          content: '';
          width: 80px;
          height: 80px;
          border-radius: 40px;
          background-color: rgba(0, 0, 0, .800);
          position: absolute;
          z-index: 1;
        }

        .update-profile-image__avatar-camera-icon {
          margin: auto;
          position: relative;
          color: #ffffff;
          z-index: 2;
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

export default AccountEdit;
