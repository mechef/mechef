// @flow

import React from 'react';

import { IMAGE_URL } from '../utils/constants';
import {
  fontWeight,
  kitchenHeaderProfileImageSize,
  kitchenHeaderProfileImageSizeSmall,
  smallBreak,
  textHintColor,
} from '../utils/styleVariables';

type Props = {
  name?: string,
  description?: string,
  profileImage?: string,
};

const KitchenHeader = ({ name, description, profileImage }: Props) => (
  <div className="kitchen-header">
    <div className="kitchen-header__name">
      <span>
        @
        {name}
      </span>
    </div>
    <div className="kitchen-header__description">{description}</div>
    <style jsx>
      {`
        .kitchen-header {
          display: flex;
          justify-content: center;
          flex-direction: column;
          color: #525252;
        }
        .kitchen-header__name {
          font-weight: ${fontWeight};
          margin-top: -22px;
          margin-bottom: 10px;
          line-height: 1;
          font-size: 1.6rem;
          position: relative;
        }
        .kitchen-header__name:before {
          display: block;
          content: '';
          width: ${kitchenHeaderProfileImageSizeSmall};
          height: ${kitchenHeaderProfileImageSizeSmall};
          border-radius: 50%;
          position: relative;
          margin-bottom: 20px;
          left: 6px;
          background-image: url('${
            profileImage
              ? `${IMAGE_URL}/${profileImage}`
              : '/static/img/avatar.jpg'
          }'), url('/static/img/avatar.jpg');
          background-size: cover;
          background-position: center;
        }
        .kitchen-header__description {
          line-height: 1.5;
          color: ${textHintColor};
        }

        @media (min-width: ${smallBreak}) {
          .kitchen-header {
            padding-left: 100px;
          }
          .kitchen-header__name {
            margin-top: 16px;
            margin-bottom: 16px;
            font-size: 1.8rem;
            line-height: 0.9;
          }
          .kitchen-header__name:before {
            width: ${kitchenHeaderProfileImageSize};
            height: ${kitchenHeaderProfileImageSize};
            position: absolute;
            bottom: -10px;
            left: -100px;
          }
        }
      `}
    </style>
  </div>
);

export default KitchenHeader;
