// @flow
import React from 'react';
import Rx from 'rxjs/Rx';

import AddToCartButton from './AddToCartButton';

import { IMAGE_URL } from '../utils/constants';
import {
  greyBackgroundColor,
  whiteColor,
  textColor,
  textHintColor,
  fontSize,
  fontWeight,
  borderRadius,
  addToCartButtonHeight,
} from '../utils/styleVariables';

type Props = {
  _id: string,
  dishName: string,
  unitPrice: string,
  images: Array<string>,
  description: string,
  onDishSelected: Function,
  onAddToCartClick: Function,
};

const DishCard = ({
  _id,
  dishName,
  unitPrice,
  images,
  description,
  onDishSelected,
  onAddToCartClick,
}: Props) => (
  <div className="dish-card">
    <div className="dish-card__content">
      <div
        className="dish-card__image-container"
        role="Link"
        onClick={() => onDishSelected(_id)}
      >
        {images && images.length > 0 ? (
          <div className="dish-card__image" />
        ) : (
          ''
        )}
      </div>
      <div
        className="dish-card__name"
        role="Link"
        onClick={() => onDishSelected(_id)}
      >
        {dishName}
      </div>
      <div className="dish-card__description">{description}</div>
      <div className="dish-card__price">{unitPrice}</div>
    </div>
    <AddToCartButton onAddToCartClick={onAddToCartClick} />
    <style jsx>
      {`
        .dish-card {
          width: 260px;
          height: 380px;
          border-radius: ${borderRadius};
          background-color: ${whiteColor};
          box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.24);
          display: inline-block;
          margin-right: 7px;
          margin-bottom: 12px;
        }
        .dish-card__content {
          flex: 0 0 277px;
          overflow: hidden;
          height: calc(100% - ${addToCartButtonHeight});
          max-height: 312px;
        }
        .dish-card__image-container {
          border-top-left-radius: ${borderRadius};
          border-top-right-radius: ${borderRadius};
          width: 260px;
          height: 173px;
          cursor: pointer;
          overflow: hidden;
          background-image: url('/static/svg/mechef_logo_white.svg');
          background-color: ${greyBackgroundColor};
          background-repeat: no-repeat;
          background-position: center;
          background-size: 90px 80px;
        }
        .dish-card__image {
          background-image: url('${
            images.length > 0
              ? `${IMAGE_URL}/${images[0]}`
              : '/static/svg/mechef_logo_white.svg'
          }'), url('/static/svg/mechef_logo_white.svg');
          background-color: ${greyBackgroundColor};
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          width: 100%;
          height: 100%;
        }
        .dish-card__name {
          font-size: 16px;
          line-height: 1;
          letter-spacing: 0.7px;
          font-weight: ${fontWeight};
          color: ${textColor};
          padding: 28px 16px 0px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
        }
        .dish-card__description {
          font-weight: ${fontWeight};
          font-family: AvenirNext;
          line-height: 1.2;
          color: ${textHintColor};
          padding: 10px 16px 0px;
          overflow: hidden;
          max-height: 36px;
        }
        .dish-card__price {
          max-height: 18px;
          line-height: 18px;
          padding: 15px 16px 16px;
          color: ${textHintColor};
          font-size: ${fontSize};
          font-weight: ${fontWeight};
        }
      `}
    </style>
  </div>
);

export default DishCard;
