// @flow

import React from 'react';

import { IMAGE_URL } from '../utils/constants';

type Props = {
  name: string,
  description?: string,
  profileImage?: string,
  noDescription?: boolean,
};

const KitchenHeader = ({ name, description, profileImage, noDescription }: Props) => (
  <div className="kitchen-header">
    <div className="kitchen-header__name">
      <span>@{name}</span>
    </div>
    <div className="kitchen-header__description">
      {description}
    </div>
    <style jsx>
      {`
        .kitchen-header {
          display: flex;
          justify-content: center;
          flex-direction: column;
          color: #525252;
          padding-left: 100px;
        }
        .kitchen-header__name {
          font-weight: 500%;
          margin-top: 16px;
          margin-bottom: 16px;
          line-height: 16px;
          position: relative;
        }
        .kitchen-header__name:before {
          display: block;
          content: '';
          width: 80px;
          height: 80px;
          border-radius: 40px;
          position: absolute;
          bottom: -10px;
          left: -100px;
          background-image: url('${profileImage ? `${IMAGE_URL}/${profileImage}` : "/static/img/avatar.jpg"}'), url('/static/img/avatar.jpg');
          background-size: cover;
          background-position: center;
        }
        .kitchen-header__description {
          line-height: 24px;
        }
      `}
    </style>
  </div>
);

export default KitchenHeader;
