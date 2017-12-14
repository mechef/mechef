// @flow
import React from 'react';

type Props = {
  name: string,
  description?: string,
  chefProfileImage?: string,
  noDescription?: boolean,
}

const StoreHeader = ({ name, description, chefProfileImage, noDescription }: Props) => (
  <div className="storeHeader">
    <div className="storeDetail">
      <div className="storeName">
        <img className="storeAvatar" src={chefProfileImage} alt={name} />
        <span>@{name}</span>
      </div>
      <div className="storeDescription">
        {description}
      </div>
    </div>
    <style jsx>
      {`
        .storeHeader {
          display: block;
          width: 100%;
        }
        .logoContainer{
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: 90px;
          background-color: #ffffff;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
        }
        .logo {
          height: 70px;
          width: 113px;
          margin: 13px 0px 7px 89px;
        }
        .storeCover {
          width: 100%;
          height: 250px;
          background-repeat: no-repeat;
          background-size: cover;;
          background-position: top -240px center;
        }
        .storeDetail {
          display: flex;
          justify-content: center;
          flex-direction: column;
          padding: 0 270px 0 208px;
          color: #525252;
        }
        .storeName {
          font-weight: 500%;
          margin-top: 16px;
          margin-bottom: 16px;
          line-height: 16px;
          position: relative;
        }
        .storeAvatar {
          width: 80px;
          height: 80px;
          border-radius: 40px;
          position: absolute;
          bottom: 0px;
          left: -100px;
        }
        .storeDescription {
          line-height: 24px;
        }
      `}
    </style>
  </div>
);

export default StoreHeader;
