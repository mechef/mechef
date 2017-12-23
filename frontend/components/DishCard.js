// @flow
import React from 'react';
import Rx from 'rxjs/Rx';

import AddToCartButton from './AddToCartButton';

type Props = {
  id: string,
  name: string,
  price: number,
  url: string,
  description: string,
  onDishSelected: (id: string) => Rx.Observable,
  onAddToCartClick: (id: string) => Rx.Observable,
};

const DishCard = ({ id, name, price, url, description, onDishSelected, onAddToCartClick }: Props) => (
  <div className="dish-card">
    <div className="dish-card__content">
      <img className="dish-card__image" src={url} alt={name} onClick={() => onDishSelected(id)} />
      <div className="dish-card__name" onClick={() => onDishSelected(id)}>{name}</div>
      <div className="dish-card__description">{description}</div>
      <div className="dish-card__price">{price}</div>
    </div>
    <AddToCartButton dishId={id} onAddToCartClick={onAddToCartClick} />
    <style jsx>
      {`
        .dish-card {
          width: 260px;
          height: 380px;
          border-radius: 4px;
          background-color: #ffffff;
          box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.24);
          display: inline-block;
          margin-right: 7px;
          margin-bottom: 12px;
        }
        .dish-card__content {
          flex: 0 0 277px;
          overflow: hidden;
        }
        .dish-card__image {
          width: 260px;
          height: 173px;
          cursor: pointer;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
        .dish-card__name {
          font-size: 16px;
          line-height: 16px;
          font-weight: 500;
          color: #4a4a4a;
          padding: 28px 16px 0px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
        }
        .dish-card__description {
          font-size: 14px;
          font-weight: 500;
          font-family: AvenirNext:
          line-height: 1.2;
          color: #9b9b9b;
          padding: 10px 16px 0px;
          overflow: hidden;
          max-height: 36px;
        }
        .dish-card__price {
          max-height: 18px;
          line-height: 18px;
          padding: 15px 16px 16px;
          color: #9b9b9b;
          font-size: 14px;
          font-weight: 500;
        }
      `}
    </style>
  </div>
);

export default DishCard;
